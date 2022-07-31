import {Table} from "react-bootstrap"

import Log from "../Log/Log";

function LogsContainer(props) {
    return(
        <div className="">
            { (props.logs && props.logs.length > 0) ?
                (
                    <div>
                        {
                            <TableLog logs={props.logs}/>
                        }
                    </div>
                ) 
                : 
                (
                <div>
                    No logs until now
                </div>
                )
            }

        </div>
    )
}

const TableLog = (props) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Temperature</th>
                    <th>countryName</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Vaccinated</th>
                </tr>
            </thead>

            <tbody>
                {
                    props.logs.map((log, index) => {
                        return (
                            <Log key={index} index={index} log={log}>
                            </Log>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default LogsContainer;