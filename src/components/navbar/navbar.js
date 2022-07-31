import { useContext } from "react";
import { Link } from "react-router-dom";

import { Container, Nav, Navbar as NavbarBootstrap } from 'react-bootstrap';

import AuthContext from '../../contexts/authContext';

const Navbar = () => {
    const { authState } = useContext(AuthContext);

    return (
        <NavbarBootstrap expand="lg" className="shadow-lg bg-body rounded border-bottom">
        <Container>
            <NavbarBootstrap.Brand>
                <Link to="/COVID-Tracker-clientside-deploy/" className="navbar-brand">Covid Tracker</Link>
            </NavbarBootstrap.Brand>

            <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />

            <NavbarBootstrap.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/COVID-Tracker-clientside-deploy/dashboard" className="nav-link"> 
                        Dashboard
                        <i className="bi bi-window ps-1 mx-1 fs-5"></i>
                    </Link>
                    
                    {authState.status && 
                        <>
                        
                            <Link to="/COVID-Tracker-clientside-deploy/profile" className="nav-link">
                                Profile
                                <i className="bi bi-person-lines-fill ps-1 mx-1 fs-5"></i>
                            </Link>

                            <Link to="/COVID-Tracker-clientside-deploy/log" className="nav-link">
                                New Log
                                <i className="bi bi-plus-square ps-1 mx-1 fs-5"></i>
                            </Link>
                        </>
                    }
                </Nav>
                <Nav>
                    {authState.status ?
                        <>
                            <Link to="/COVID-Tracker-clientside-deploy/logout" className="nav-link">
                                Logout
                                <i className="bi bi-box-arrow-in-left ps-1 mx-1 fs-5"></i>
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/COVID-Tracker-clientside-deploy/login" className="nav-link">
                                Login
                                <i className="bi bi-box-arrow-in-right ps-1 mx-1 fs-5"></i>
                            </Link>

                            <Link to="/COVID-Tracker-clientside-deploy/register" className="nav-link">
                                Register
                                <i className="bi bi-person-plus ps-1 mx-1 fs-5"></i>
                            </Link>
                        </>
                    }
                </Nav>
            </NavbarBootstrap.Collapse>
        </Container>
    </NavbarBootstrap>
    )
};

export default Navbar;