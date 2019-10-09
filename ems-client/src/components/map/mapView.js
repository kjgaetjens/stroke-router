import React, {useState, useEffect} from 'react'
import Map from './map'
import GoogleApiComponent from '../../utils/GoogleApiComponent'
import GoogleApi from '../../utils/GoogleApiComponent'
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
        axios.get(`${env.serverUrl}/hospital`)
        .then(response => {
            let hospitals = response.data.hospitals

            hospitals = sortHospitals(hospitals)
            if (props.lvo) {
                hospitals = hospitals.filter(hospital => hospital.CSC === "TRUE")
            }
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

                a.lat = a.coords.lat * Math.PI / 180
                a.lng = a.coords.lng * Math.PI / 180

                b.lat = b.coords.lat * Math.PI / 180
                b.lng = b.coords.lng * Math.PI / 180

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
    //         let response = await axios.patch(`${env.serverUrl}/hospital`, {
    //             hospitalId: hospital._id,
    //             lat: location.lat,
    //             lng: location.lng
    //         })
    //         console.log(response)
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
              origin: location,
              destination: destination,
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
            </div>
        )
    }

    const renderActiveHospital = (hospital) => {
        return (
            <div key={hospital._id} className="hospitalDiv active">
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
        )
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
    }, [])

    return (
        <div className="pageComponent maps">
            <button className="submitButton" onClick={props.switchView}>Back to Recommendation</button>
            <div className="mapAndHospitalsDiv">
                {location.lat !== 0 ? renderMap() : null}
                {renderHospitals()}
            </div>
        </div>
    )
}

export default GoogleApiComponent({
    apiKey: env.apiKey,
    libraries: ['places', 'geometry']
})(MapView)