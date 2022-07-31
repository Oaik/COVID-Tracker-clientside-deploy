import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet';

import './Map.css';

function Map(props) {
    return(
        <MapContainer className="map" center={[35.5, 72.5]} zoom={3} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                opacity={20}
            />
            {props.data.map((statistic, index) => {
                return (
                    <Marker key={index} position={[statistic.latitude, statistic.longitude]}>
                        <Popup>
                            <h2>
                                <img alt="country flag" src={"https://disease.sh/assets/img/flags/" + statistic.countryCode.toLowerCase() + ".png"} height="20px" width="25px"/>
                                {statistic.countryName}
                            </h2>

                            <strong>length:</strong> {statistic.length}<br/>
                        </Popup>
                    </Marker>
                )
            })}
        </MapContainer>
    )
}

export default Map;