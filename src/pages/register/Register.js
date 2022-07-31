import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios';

import { Button, FloatingLabel, Container, Row, Col, Alert } from 'react-bootstrap';

import { Formik, Form, Field, ErrorMessage } from "formik";

import AuthContext from '../../contexts/authContext';

import formRegisterSchema from '../../validations/register'

import "./register.css"

function Register() {
    const navigate = useNavigate()

    const { authState } = useContext(AuthContext);

    const [serverState, setServerState] = useState();
    const handleServerResponse = (ok, msg) => {
      setServerState({ok, msg});
    };

    const handleOnSubmit = (values, actions) => {

        axios
            .post("https://covid19trackeromarnodo.cyclic.app/auth/register",
                {
                    ...values
                }, 
                {            
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then((response) => {
                if(response.data.error) {
                    actions.setSubmitting(false);
                    handleServerResponse(false, response.data.error);
                    return;
                }

                actions.setSubmitting(false);
                actions.resetForm();

                navigate('/login');
            })
            .catch((error) => {
                actions.setSubmitting(false);
                handleServerResponse(false, error.response.data.error);
            })
    }

    useEffect(() => {
        // Already there is log in user
        if(authState.status) {
            navigate('/');
        }
    }, [authState])

    return (
        <div className=''>
            <Container fluid>
                <Row className=''>
                    <Col xs={{span: 12}} md={{span: 4, offset: 1}} className="pt-5 me-5">
                        <h3>Create your new account in easy steps</h3>

                        <Formik
                            initialValues={{ email: "", name: "", password: "" }}
                            onSubmit={handleOnSubmit}
                            validationSchema={formRegisterSchema}
                        >
                            {({ isSubmitting }) => (
                                <Form noValidate>
                                    <FloatingLabel controlId="email" label="Email" className="mt-3">
                                        <Field id="email" type="email" name="email" className="form-control" />
                                    </FloatingLabel>                                
                                    <ErrorMessage name="email" className="errorMsg text-danger" component="p" />

                                    <FloatingLabel controlId="name" label="name" className="mt-3">
                                        <Field id="name" name="name" type="name" className="form-control" />
                                    </FloatingLabel>
                                    <ErrorMessage name="name" className="errorMsg text-danger" component="p" />
                                    
                                    <FloatingLabel controlId="password" label="Password" className="mt-3">
                                        <Field id="password" name="password" type="password" className="form-control" />
                                    </FloatingLabel>
                                    <ErrorMessage name="password" className="errorMsg text-danger" component="p" />

                                    <Row className="mt-4 mb-2">
                                        <Col >
                                            <div className='d-grid gap-2' >
                                                <Button variant="dark" type="submit" disabled={isSubmitting} size="lg">
                                                    Register
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

                                    <div className='my-3'>
                                        <span>Already have an account? </span>

                                        <Link to="/login" className=''>
                                            log in
                                        </Link>
                                    </div>

                                </Form>
                            )}
                        </Formik>
                    </Col>

                    <Col md={{}} className='pt-5 register-container'>
                        
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register;
