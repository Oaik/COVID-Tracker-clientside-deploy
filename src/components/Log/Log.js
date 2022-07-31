

function Log(props) {
    return(
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.log.temperature}</td>
            <td>{props.log.countryName}</td>
            <td>{props.log.age}</td>
            <td>{props.log.gender}</td>
            <td>{props.log.isVaccinated ? "Yes" : "No"}</td>
        </tr>
    )
}

export default Log;