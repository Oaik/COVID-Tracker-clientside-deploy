import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

import { Button, FloatingLabel, Container, Row, Col, Alert } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from "formik";

import AuthContext from '../../contexts/authContext';

import formLoginSchema from '../../validations/login'

import "./login.css"

function Login() {
    const navigate = useNavigate()

    const { authState, setAuthState } = useContext(AuthContext);

    const [serverState, setServerState] = useState();
    const handleServerResponse = (ok, msg) => {
      setServerState({ok, msg});
    };

    const handleOnSubmit = (values, actions) => {
        axios
            .post("https://covid19trackeromarnodo.cyclic.app/auth/login",
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

                localStorage.setItem("accessToken", response.data.accessToken);
    
                setAuthState({
                    name: response.data.name,
                    id: response.data.id,
                    status: true,
                });

                navigate('/dashboard');
            })
            .catch((error) => {
                actions.setSubmitting(false);
                handleServerResponse(false, error.response.data.error);
                
                console.error("Error while logging", error);
        })
    }

    useEffect(() => {
        // Already there is log in user
        if(authState.status) {
            navigate('/');
        }
    }, [authState])

    return (
        <div className='input-container'>
            <Container>
                <Row className='pt-5'>
                    <Col md={{span: 4, offset: 2}} className='pt-5'>
                        <h3>
                            COVID Tracker
                        </h3>

                        <p className='text-white'>
                            Join the COVID Tracker now and start to track your logs
                        </p>
                    </Col>

                    <Col md={{span: 4, offset: 1}} className='pt-5'>
                        <h4 className='mb-4 text-welcome'>
                            Login into your account
                        </h4>

                        <Formik
                            initialValues={{ email: "", password: "" }}
                            onSubmit={handleOnSubmit}
                            validationSchema={formLoginSchema}
                        >
                            {({ isSubmitting }) => (
                                <Form noValidate>
                                    <FloatingLabel controlId="email" label="Email" className="mt-3">
                                        <Field id="email" type="email" name="email" className="form-control" />
                                    </FloatingLabel>                                
                                    <ErrorMessage name="email" className="errorMsg text-danger" component="p" />

                                    
                                    <FloatingLabel controlId="password" label="Password" className="mt-3">
                                        <Field id="password" name="password" type="password" className="form-control" />
                                    </FloatingLabel>

                                    <ErrorMessage name="password" className="errorMsg text-danger" component="p" />

                                    <Row className="mt-4 mb-2">
                                        <Col >
                                            <div className='d-grid gap-2' >
                                                <Button variant="dark" type="submit" disabled={isSubmitting} size="lg">
                                                    Log in
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

                                    <div className='text-center text-welcome'>
                                        <span>Dont have an account? </span>

                                        <Link to="/register" className='text-light'>
                                            Create
                                        </Link>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;
