import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';

import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, FloatingLabel, Container, Row, Col, Alert } from 'react-bootstrap';

import formLogSchema from '../../validations/log'

function Log() {
    const navigate = useNavigate()

    const [serverState, setServerState] = useState();
    const [logPositionState, setLogPositionState] = useState({
        latitude: 0,
        longitude: 0
    })

    const handleServerResponse = (ok, msg) => {
        setServerState({ok, msg});
    };

    const setPositionCoordinaties = (coordinaties) => {
        setLogPositionState({
            longitude: coordinaties.longitude,
            latitude: coordinaties.latitude
        })
    }

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate('/login');
        }
        
        navigator.geolocation.getCurrentPosition((position) => {
            setPositionCoordinaties(position.coords);
        });
    }, [])

    const handleOnSubmit = (values, actions) => {
        axios
            .post("https://covid19trackeromarnodo.cyclic.app//api/log", 
                {
                    ...values,
                    ...logPositionState
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'accessToken': localStorage.getItem("accessToken")
                    }
                }
            )
            .then((response) => {
                actions.setSubmitting(false);

                if(response.data.error) {
                    handleServerResponse(false, response.data.error);
                    return
                }

                handleServerResponse(true, "Your Log sucessfuly saved");
            })
            .catch((error) => {
                console.error(error);
                handleServerResponse(false, error.response.data.error);
            })
    }

    return (
        <div className='log-page'>
            <Container>
                <Row className='my-5'>
                    <h3 className='text-center mb-3'>Create Log</h3>

                    <Col sm={12} md={{span: 6, offset: 3}}>

                    <Formik
                            initialValues={{ temperature: "", age: "", gender: "Other", isVaccinated: false }}
                            onSubmit={handleOnSubmit}
                            validationSchema={formLogSchema}
                        >
                            {({ isSubmitting }) => (
                                <Form noValidate>
                                    <FloatingLabel controlId="temperature" label="temperature" className="mt-3">
                                        <Field id="temperature" type="number" name="temperature" className="form-control" />
                                    </FloatingLabel>                                
                                    <ErrorMessage name="temperature" className="errorMsg text-danger" component="p" />

                                    
                                    <FloatingLabel controlId="age" label="age" className="mt-3">
                                        <Field id="age" type="number" name="age" className="form-control" />
                                    </FloatingLabel>                                
                                    <ErrorMessage name="age" className="errorMsg text-danger" component="div" />

                                    <FloatingLabel controlId="floatingSelect" label="Select your gender" className="mt-3">
                                        <Field as="select" name="gender" aria-label="Floating label select example"  className="form-control">
                                            <option disabled value="Other"></option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Field>
                                    </FloatingLabel>
                                    
                                    <ErrorMessage name="gender" className="errorMsg text-danger" component="div" />

                                    <div className='form-check form-switch my-3'>
                                        <Field type="checkbox" id="isVaccinated" name="isVaccinated" label="Are you Vaccinated" className="form-check-input">                                    
                                        </Field>

                                        <label htmlFor="isVaccinated">
                                            Are you Vaccinated
                                        </label>
                                    </div>
                                    <ErrorMessage name="isVaccinated" className="errorMsg text-danger" component="div" />

                                    <Row className="mt-4 mb-2">
                                        <Col >
                                            <div className='d-grid gap-2' >
                                                <Button variant="dark" type="submit" disabled={isSubmitting}>
                                                    Create new log
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>

                                    {serverState && (
                                        <div className={!serverState.ok ? "errorMsg" : ""}>
                                            <Alert key={!serverState.ok ? "danger" : "success"} variant={!serverState.ok ? "danger" : "success"} >
                                                {serverState.msg}
                                            </Alert>
                                        </div>
                                    )}

                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>   
            </Container>
        </div>
    )
}

export default Log;
