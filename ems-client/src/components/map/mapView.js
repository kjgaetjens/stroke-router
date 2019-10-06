import React, {useState, useEffect} from 'react'
import Map from './map'
import GoogleApiComponent from '../../utils/GoogleApiComponent'
import GoogleApi from '../../utils/GoogleApiComponent'
import {connect} from 'react-redux'
import * as env from '../../env'
import axios from 'axios'

const MapView = (props) => {

    const [location, setLocation] = useState({
        lat: "",
        lng: "",
    })

    const [hospital, setHospital] = useState({
        lat: "",
        lng: ""
    })

    const [error, setError] = useState("")
    const [directions, setDirections] = useState({
        active: false,
        route: {}
    })



    const hospitals = [
        {
            name: "Ben Taub Hospital",
            address: "1504 Ben Taub Loop, Houston, TX 77030",
            coords: {
                lat: 29.7109781,
                lng: -95.3940865
            }
        },
        {
            name: "Memorial Hermann",
            address: "6411 Fannin Street, Houston, TX",
            coords: {            
                lat: 29.7138126,
                lng: -95.3963819
            }
        },
        {
            name: "West Houston Medical Center",
            address: "12141 Richmond Ave, Houston, TX",
            coords: {
                lat: 29.7294486,
                lng: -95.5947219
            }
        },
        {
            name: "Memorial Hermann Southwest Hospital",
            address: "7600 Beechnut St, Houston, TX 77074",
            coords: {
                lat: 29.6932967,
                lng: -95.5222934
            }
        }
    ]

    const hospitalCoords = (list) => {
        list.forEach(hospital => {
            let addressString = hospital.address.split(' ').join('+')
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressString}&key=${env.apiKey}`)
            .then(res => res.json())
            .then(json => {
            })
        })
    }

    const grabLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(processPosition)
        }
    }

    const processPosition = (position) => {
        setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }

    const getDirections = (destination) => {
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
            <div className="hospitalsContainer">
                {hospitals.map((hospital, i) => 
                    <div key={i} className="hospitalDiv">
                        <span className="hospitalName">{hospital.name}</span>
                        <span className="hospitalAddress">{hospital.address}</span>
                        <div className="specialties"></div>
                    </div>
                )}
            </div>
        )
    }

    useEffect(() => {
        grabLocation()
        hospitalCoords(hospitals)
    }, [])

    return (
        <div className="pageComponent maps">
            <button className="submitButton" onClick={props.switchView}>Back to Recommendation</button>
            <div className="mapAndHospitalsDiv">
                {renderMap()}
                {renderHospitals()}
            </div>
        </div>
    )
}

export default GoogleApiComponent({
    apiKey: env.apiKey,
    libraries: ['places', 'geometry']
})(MapView)