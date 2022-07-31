import { Link } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap";

import "./home.css"

function Login() {
    return (
        <div className="home-container">
            <header className="d-flex flex-column align-items-center justify-content-end">
                    <div className="pb-5 mb-5">
                        <div className="dashboard-intro-caption text-light">
                            <h2>Discover our new COVID-19 tracker </h2>
                            
                            <a href="#section-info" className="text-white">
                                <i className="bi bi-chevron-double-down fs-1"></i>
                            </a>
                        </div>
                    </div>
            </header>
            
            <section className='bg-ligh-white' id="section-info">
                <Container fluid>
                    <Row className='align-items-center justify-content-center'>
                        <Col xs={{span: 12}} md={{span: 4, offset: 1}}>
                            <div className=''>
                                <h3>Easy way to create log</h3>

                                <p className="text-muted">
                                    You can easily create logs for your COVID-19 status
                                </p>

                                <p>
                                    By using our simple website you will find a lot of features
                                </p>
                            </div>
                        </Col>

                        <Col md={{}} className='pt-5 home-section-corona'>

                        </Col>
                        
                    </Row>
                </Container>
            </section>

            <section className='mb-5 bg-ligh-white'>
                <Container fluid>
                    <Row className='align-items-center justify-content-center'>
                        <Col xs={12} md={{span: 7}} className='pt-5 home-landing-container'>

                        </Col>

                        <Col xs={{span: 12}} md={{span: 4, offset: 1}}>
                            <div className='' >
                                <div>
                                    <h3>
                                        Simple Map Dashboard
                                    </h3>

                                    <p className="text-muted">
                                        You can check it anytime
                                    </p>

                                    <p>
                                        A simple dashboard that will keep updating to keep your with the lateast logs in all country across the world
                                    </p>
                                </div>
                            </div>
                        </Col> 
                    </Row>
                </Container>
            </section>

            <Container>
                <hr />
            </Container>

            <section className="text-center my-5">
                <Container>
                    <h3 className="my-5">
                        Our Features are amazing
                    </h3>

                    <Row className="py-5">
                        <Col sm={3} xs={6}>
                            <div className="feature-card py-5">
                                <i className="bi bi-journal fs-1"></i>

                                <h4>
                                    Logs
                                </h4>

                                <p>
                                    We keep all your logs in our database
                                </p>
                            </div>

                        </Col>

                        <Col sm={3} xs={6}>
                            <div className="feature-card py-5">
                                <i className="bi bi-map fs-1"></i>

                                <h4>
                                    Live Dashboard
                                </h4>

                                <p>
                                    We keep you updated each second
                                </p>
                            </div>
                        </Col>

                        <Col sm={3} xs={6}>
                            <div className="feature-card py-5">
                                <i className="bi bi-cash-coin fs-1"></i>

                                <h4>
                                    Fees
                                </h4>

                                <p>
                                    We have no fees complelety free
                                </p>
                            </div>
                        </Col>

                        <Col sm={3} xs={6}>
                            <div className="feature-card bg-gray py-5">
                                <i className="bi bi-shield fs-1"></i>

                                <h4>
                                    Security
                                </h4>

                                <p>
                                    Dont worry about security
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            
            <section className="home-section-container d-flex flex-column align-items-center justify-content-center text-center">
                    <div className="dashboard-intro-caption text-light">
                        <h2>Join us now and start writing your logs</h2>
                        
                        <Link to="/register" className="text-light btn btn-primary mt-3 px-5 py-3">
                            Create an account
                        </Link>
                    </div>
            </section>
        </div>
    )
}

export default Login;
