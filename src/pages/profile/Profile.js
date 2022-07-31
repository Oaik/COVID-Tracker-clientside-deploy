import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"
import axios from "axios";

import { Button, FloatingLabel, Container, Row, Col, Alert } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from "formik";

import AuthContext from '../../contexts/authContext';
import LogsContainer from "../../components/LogsContainer/LogsContainer";

import formProfileSchema from '../../validations/profile'

function Profile() {
    const navigate = useNavigate()

    const { authState, setAuthState } = useContext(AuthContext);

    const [userLogs, setUserLogs] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [serverState, setServerState] = useState();

    const [showLogs, setShowLogs] = useState(false);

    const handleServerResponse = (ok, msg) => {
        setServerState({ok, msg});
    };

    const toogleUpdateForm = () => {
        setIsUpdating(!isUpdating);
    }

    const toogleLogs = () => {
        setShowLogs(!showLogs);
    }

    const handleOnSubmit = (values, actions) => {
        axios.put(`https://covid19trackeromarnodo.cyclic.app/user/profile/${authState.id}`, {
            ...authState,
            ...values
        }, {            
            headers: {
                'Content-Type': 'application/json',
                'accessToken': localStorage.getItem("accessToken")
            }
        }).then((response) => {
            if(response.data.error) {
                actions.setSubmitting(false);
                handleServerResponse(false, response.data.error);
                return;
            }

            localStorage.setItem("accessToken", response.data.accessToken)
            actions.setSubmitting(false);
            
            setAuthState({
                ...response.data.user,
                status: true
            });
            
            toogleUpdateForm();
        }).catch((error) => {
            actions.setSubmitting(false);
            handleServerResponse(false, error.response.data.error);
            
            console.error("Error while Updating", error);
        })
    }

    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
            navigate('/');
        }

        axios.post("https://covid19trackeromarnodo.cyclic.app/user/profile/", {}, {            
            headers: {
                'Content-Type': 'application/json',
                'accessToken': localStorage.getItem("accessToken")
           }
        }).then((response) => {
            if(response.data.error) {
                console.error("Tried to update another user page", response.data.error);
                navigate('/');
            }

            setUserLogs(response.data.logs);
        })
    })

    return (
        <div>
            <Container fluid>
                <Row className=''>
                    <Col xs={{span: 12}} md={{span: 3}} className="pt-5">
                        <div className="mx-3 px-3">
 
                            <div className="text-center">
                                <img src="https://i.pravatar.cc/150?img=60" className="rounded-circle mb-3"/>
                            </div>

                            {!isUpdating ? 
                                (
                                    <div className="text-center">
                                        <h3 className="mb-3">
                                            Hello, {authState.name}
                                        </h3>

                                        <Button variant="dark" type="submit" onClick={toogleUpdateForm}>
                                            update Profile
                                        </Button>
                                    </div>

                                ) 
                            : 
                                (
                                
                                    <Formik
                                        initialValues={{ name: authState.name }}
                                        onSubmit={handleOnSubmit}
                                        validationSchema={formProfileSchema}
                                        
                                    >
                                        {({ isSubmitting }) => (
                                        <Form noValidate className='pt-5'>
                                            <FloatingLabel controlId="name" label="name" className="mt-3">
                                                <Field id="name" type="name" name="name" className="form-control" />
                                            </FloatingLabel>                                
                                            <ErrorMessage name="name" className="errorMsg text-danger" component="p" />

                                            <Row className="mt-4 mb-2">
                                                <Col >
                                                    <div className='d-grid gap-2' >
                                                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                                                            Update User
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
                                )
                            }

                        </div>
                    </Col>

                    <Col md={{span: 6}} className='pt-5'>
                        <h5>
                            Your Logs
                            
                        </h5>
                        
                        <hr />

                        <h5>
                            You have created {userLogs.length} logs
                        </h5>
                        
                        {
                            userLogs.length > 0
                            && 
                            <Button variant={showLogs ? "dark" : "primary"} type="submit" onClick={toogleLogs} className="my-3">
                                {showLogs ? "hide" : "Show"} logs
                            </Button>
                        }

                        {showLogs && <LogsContainer logs={userLogs} /> }

                        <br />
                        
                        <Link to="/log" className="text-muted">
                           Create new log?
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Profile;
