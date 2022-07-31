import { useEffect, useState } from "react";
import axios from 'axios'

import { Container, Row, Col, FloatingLabel, Form } from 'react-bootstrap';
import Map from "../../components/map/Map";
import LogsContainer from "../../components/LogsContainer/LogsContainer";

import "./dashboard.css"

function Dashboard() {

    const [countryToDisplayLogs, setCountryToDisplayLogs] = useState(-1);
    const [statistics, setStatistics] = useState([]);
    const [dashboardInfo, setDashboardInfo] = useState({
        diffrentCountries: 0,
        totalPatients: 0
    });

    const updateCountry = (event) => {
        setCountryToDisplayLogs(event.target.value);
    }

    useEffect(() => {
        axios.get("https://covid19trackeromarnodo.cyclic.app//dashboard")
            .then((response) => {
                if(response.data.length == 0)
                    return
                    
                setStatistics(response.data);
                setDashboardInfo({
                    diffrentCountries: response.data.length,
                    totalPatients: response.data.reduce((sum, logsInCountry) => sum + logsInCountry.length, 0),
                    maxDiffrent: Math.max(...response.data.map(current => current.length)),
                    maxCountry: response.data.reduce((prev, current) => (prev.length > current.length) ? prev: current)
                })
            })
            .catch(error => console.error(error));
    });

    return (
        <div className="">
            <div className="dashboard-intro d-flex align-items-center justify-content-center">
                <div className="dashboard-intro-caption text-light">
                    <h2>Live Stats Dashboard </h2>
                </div>
            </div>

            <div>
                <Map data={statistics}/>
            </div>

            <Container className="text-center">
                <div>
                    <Row>
                        <Col xs={12} sm={6} md={3} className="my-4">
                            <div>
                                Total Patients: 

                                <br/>

                                <strong>
                                    {dashboardInfo.totalPatients}
                                </strong>
                                
                            </div>
                        </Col>

                        <Col xs={12} sm={6} md={3} className="my-4">
                            <div>
                                Number of different countries

                                <br/>

                                <strong>
                                    {dashboardInfo.diffrentCountries}
                                </strong>

                            </div>
                        </Col>  
                        {dashboardInfo.maxCountry && 
                        <>
                            <Col xs={12} sm={6} md={3} className="my-4">
                                <div>
                                    The top country is: 

                                    <br/> 

                                    <strong>
                                        <img alt="country flag" src={"https://disease.sh/assets/img/flags/" + dashboardInfo.maxCountry.countryCode.toLowerCase() + ".png"} height="20px" width="25px"/>
                                        {dashboardInfo.maxCountry.countryName}
                                    </strong>

                                </div>
                            </Col>

                            <Col xs={12} sm={6} md={3} className="my-4">
                                <div>
                                    Number of patients in {dashboardInfo.maxCountry.countryName} is: 

                                    <br/> 

                                    <strong>
                                        {dashboardInfo.maxCountry.length}
                                    </strong>
                                </div>
                            </Col>
                        </>
                        }
  
                    </Row>

                </div>
            </Container>
            <Container className="my-5 text-center">
                <h2>
                    Want to know more about each Country ?
                </h2>

            </Container>
            <Container className="my-5">
                <FloatingLabel controlId="floatingSelect" label="Select Country To Display logs">
                    <Form.Select name="gender" aria-label="Floating label select example" onChange={updateCountry}>
                        <option value={-1}>Hide All Logs</option>

                        {
                            statistics.map((current, index) => {
                                return (
                                    
                                    <option key={index} value={index} >
                                        {current.countryName}
                                    </option>

                                )
                            })
                        }

                    </Form.Select>
                </FloatingLabel>
            </Container>

            <Container className="mb-5">
                {
                    countryToDisplayLogs >= 0 && statistics.length > countryToDisplayLogs &&
                    <>
                        <h3>
                            All Logs In 
                            <img className="mx-2" alt="country flag" src={"https://disease.sh/assets/img/flags/" + statistics[countryToDisplayLogs].countryCode.toLowerCase() + ".png"} height="20px" width="25px"/>
                            {statistics[countryToDisplayLogs].countryName}
                        </h3>
                        
                        <LogsContainer logs={statistics[countryToDisplayLogs].data} />
                    </>
                    
                }
            </Container>
        </div>

    )
}

export default Dashboard;
