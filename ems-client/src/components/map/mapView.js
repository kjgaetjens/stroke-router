import React, {useState, useEffect} from 'react'
import Map from './map'
import GoogleApiComponent from '../../utils/GoogleApiComponent'
import GoogleApi from '../../utils/GoogleApiComponent'
import Scrollable from 'hide-scrollbar-react'
import {HospitalCard} from './hospitalCard'
import * as env from '../../env'
import axios from 'axios'

const MapView = (props) => {

    const [location, setLocation] = useState({
        lat: 0,
        lng: 0,
        ready: false,
        hospitalsFetched: false
    })

    const [error, setError] = useState("")
    const [directions, setDirections] = useState({
        active: false,
        route: {}
    })

    const [activeHospital, setActiveHospital] = useState({
        active: false,
        hospital: {}
    })

    const [hospitals, setHospitals] = useState([])

    const fetchHospitals = () => {
        // something is fucked up between the query and the response
        axios.get(`${env.serverUrl}/hospital?lat=${location.lat}&lng=${location.lng}`)
        .then(response => {
            let hospitals = response.data.hospitals

            hospitals = sortHospitals(hospitals)
            if (props.lvo) {
                hospitals = hospitals.filter(hospital => hospital.CSC === "TRUE")
            }
            // hospitalCoords(hospitals)
            setHospitals(hospitals)
            setLocation({...location, hospitalsFetched: true})
        })
    }

    const sortHospitals = (hospitals) => {
        hospitals.sort((a, b) => {
            let u = {
                lat: location.lat * Math.PI / 180,
                lng: location.lng * Math.PI / 180
            }

                a.lat = a.loc.coordinates[1] * Math.PI / 180
                a.lng = a.loc.coordinates[0] * Math.PI / 180

                b.lat = b.loc.coordinates[1] * Math.PI / 180
                b.lng = b.loc.coordinates[0] * Math.PI / 180

                let distA = Math.acos(Math.sin(u.lat) * Math.sin(a.lat) + Math.cos(u.lat) * Math.cos(a.lat) * Math.cos(a.lng - u.lng)) * 3958.76

                let distB = Math.acos(Math.sin(u.lat) * Math.sin(b.lat) + Math.cos(u.lat) * Math.cos(b.lat) * Math.cos(b.lng - u.lng)) * 3958.76

                return distA - distB
        })

        return hospitals
    }
    

    // in case we add more hospitals to DB, takes array of hospitals with address field and patches entries in Mongo with lat/lng
    // const hospitalCoords = async (list) => {
    //     await asyncForEach(list, async (hospital) => {
    //         let location = await fetchCoords(hospital.address)
    //         let result = await axios.patch(`${env.serverUrl}/hospital`, {
    //             hospitalId: hospital._id,
    //             lat: location.lat,
    //             lng: location.lng
    //         })
    //     })
    // }

    // const asyncForEach = async (array, callback) => {
    //     for (let index = 0; index < array.length; index++) {
    //       await callback(array[index], index, array);
    //     }
    //   }

    // const fetchCoords = async (address) => {
    //     let addressString = address.split(' ').join('+')
    //     let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressString}&key=${env.apiKey}`)
    //     let json = await response.json()
    //     return json.results[0].geometry.location
    // }

    const grabLocation = () => {
        if (navigator.geolocation) {
            return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
        }
    }

    const processPosition = (position) => {
        setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            ready: true,
            hospitalsFetched: false
        })
    }

    const getDirections = (origin, destination) => {
        //destination object w/ lat: lng:
            let directionsService = new props.google.maps.DirectionsService()
    
            directionsService.route({
              origin: origin,
              destination: {lat: destination[1], lng: destination[0]},
              travelMode: props.google.maps.TravelMode.DRIVING
            },
            (result, status) => {
              status === props.google.maps.DirectionsStatus.OK ? setDirections({active: true, route: result}) : setError("Error fetching directions")
            })
    }


    const renderMap = () => {
        if (location.lat !== "" && location.lng !== "") {
            return (
                <div className="mapDiv">
                    <Map
                        center={location}
                        google={props.google}
                        googleMapURL={toString(GoogleApi({}))}
                        hospitals={hospitals}
                        directionsOn={directions.active}
                        directions={directions.route}
                        getDirections={getDirections}
                        setActive={setActiveHospital}
                        loadingElement={<div className='loadingElement'style={{ height: `100%` }}>Map is Loading....</div>}
                        containerElement={<div className='containerElement' />}
                        mapElement={<div className='mapElement' />}
                    />
                </div>)
        } else {
            return <div className="mapDiv">Loading.....</div>
        }
    }

    const renderHospitals = () => {
        // hospital list based on proximity and matched with lvo +/-
        return (
            <div className="outerHospitalsContainer">
                {activeHospital.active ? renderActiveHospital(activeHospital.hospital) : null}
                <Scrollable>
                <div className="hospitalsContainer">
                    {hospitals.map((hospital, i) => {
                        return (
                            <HospitalCard
                                counter={i}
                                google={props.google}
                                hospital={hospital}
                                key={hospital._id}
                                location={location}
                                getDirections={getDirections}
                                setActive={setActiveHospital}
                            />
                        )
                    })}
                </div>
                </Scrollable>
            </div>
        )
    }

    const openGoogle = (hospital) => {
        let lat = hospital.loc.coordinates[1]
        let lng = hospital.loc.coordinates[0]
        window.open(`http://maps.google.com/maps?saddr=${location.lat},${location.lng}&daddr=${lat},${lng}`)
    }

    const renderActiveHospital = (hospital) => {
        return (
            <div key={hospital._id} className="hospitalDiv active">
                <div className="infoContainer">
                <div className="infoDiv">
                    <span className="hospitalName">{hospital.name}</span>
                    <span className="hospitalAddress">{hospital.address}</span>
                </div>
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
                </div>
                <button className="submitButton" onClick={() => openGoogle(hospital)}><i className="fas fa-location-arrow"></i></button>
            </div>
        )
    }


    const renderSendToHospital = () => {
        if (activeHospital.active) {
            if (props.patient.sent) {
                return <a>Patient Info Sent <i className="fas fa-check"></i></a>
            }
            return <a onClick={() => props.sendToHospital(activeHospital.hospital._id, hospitals, location)}>Send to Hospital <i className="fas fa-arrow-right"></i></a>
        }
    }


    if (location.ready && !location.hospitalsFetched) {
        fetchHospitals()
    }

    useEffect(() => {

        const locateUser = async () => {
            let position = await grabLocation()
            processPosition(position)
        }
        
        locateUser()
        // fetchHospitals()
    }, [])

    return (
        <div className="pageComponent maps">
            <div className="recommendation-header">
                <a onClick={props.switchView}><i className="fas fa-arrow-left"></i> Back to Recommendation</a>
                {renderSendToHospital()}
            </div>
            <div className="mapAndHospitalsDiv">
                {location.lat !== 0 && props.google ? renderMap() : null}
                {renderHospitals()}
            </div>
        </div>
    )
}

export default GoogleApiComponent({
    apiKey: env.apiKey,
    libraries: ['places', 'geometry']
})(MapView)