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

    const [error, setError] = useState("")
    const [directions, setDirections] = useState({
        active: false,
        route: {}
    })


    const [hospitals, setHospitals] = useState([])

    const fetchHospitals = async () => {
        let response = await axios.get(`${env.serverUrl}/hospital`)
        let hospitals = response.data.hospitals
        // hospitalCoords(hospitals)
        setHospitals(hospitals)
    }
    

    // in case we add more hospitals to DB, takes array of hospitals with address field and patches entries in Mongo with lat/lng
    const hospitalCoords = async (list) => {
        await asyncForEach(list, async (hospital) => {
            let location = await fetchCoords(hospital.address)
            let response = await axios.patch(`${env.serverUrl}/hospital`, {
                hospitalId: hospital._id,
                lat: location.lat,
                lng: location.lng
            })
            console.log(response)
        })
    }

    const asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }

    const fetchCoords = async (address) => {
        let addressString = address.split(' ').join('+')
        let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressString}&key=${env.apiKey}`)
        let json = await response.json()
        return json.results[0].geometry.location
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
        fetchHospitals()
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