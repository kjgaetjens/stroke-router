import React, {useState, useEffect} from 'react'

export const HospitalCard = (props) => {
    const [hospital, setHospital] = useState({
        ...props.hospital,
        distance: "",
        duration: ""
    })

    const getDistance = () => {

        let directionsService = new props.google.maps.DirectionsService()
    
        directionsService.route({
          origin: props.location,
          destination: {lat: hospital.loc.coordinates[1], lng: hospital.loc.coordinates[0]},
          travelMode: props.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
            if (status === props.google.maps.DirectionsStatus.OK) {
                setHospital({
                    ...hospital,
                    distance: result.routes[0].legs[0].distance.text,
                    duration: result.routes[0].legs[0].duration.text
                })
            } else {
                console.error(status)
            }
        })
    }

    const setAsActive = hospital => {
        props.getDirections(props.location, hospital.loc.coordinates)
        props.setActive({active: true, hospital: hospital})
    }

    const renderAttributes = (hospital) => {
        return (
            <div className="attributesDiv">
                <div className="travelInfoDiv">
                    <span>{hospital.distance}</span>
                    <span>{hospital.duration}</span>
                </div>
                <div className="certificationsDiv">
                    {hospital.CSC === "TRUE" ? <span className="attribute CSC">Comprehensive Stroke Center</    span> : null}
                    {hospital.EVMT === "TRUE" ? <span className="attribute EVMT">Thrombectomy-Capable</span> : null}
                    {hospital.PSC === "TRUE" && hospital.CSC === "FALSE" ? <span className="attribute   PSC">Primary Stroke Center</span> : null}
                    {hospital.TPA === "TRUE" ? <span className="attribute TPA">tPA Available</span> : null}
                </div>
            </div>
        )
    }

    // props.counter < 10 ? getDistance() : console.log("")
    if (hospital.distance === "") {
        getDistance()
     }

    useEffect(() => {
        
    })

    return (
        <div key={hospital._id} className="hospitalDiv" onClick={() => setAsActive(hospital)}>
            <div className="infoDiv">
                <span className="hospitalName">{hospital.name}</span>
                <span className="hospitalAddress">{hospital.address}</span>
            </div>
            {renderAttributes(hospital)}
        </div>

    )
}