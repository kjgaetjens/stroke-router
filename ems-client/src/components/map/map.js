import React, {useState, useEffect} from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer} from 'react-google-maps'



import * as env from '../../env'

const Map = withScriptjs(withGoogleMap((props) => 
    <GoogleMap
      defaultZoom={10}
      defaultCenter={props.center}
    >
      <Marker position={props.center} />
      {props.hospitals.map((hospital) => <Marker key={hospital._id} icon={{url: `http://maps.google.com/mapfiles/ms/icons/hospitals.png`}} position={{lat: hospital.loc.coordinates.lat, lng: hospital.loc.coordinates.lng}} onClick={() => props.getDirections(props.center, hospital.loc.coordinates)} />)}
      {props.directionsOn ? <DirectionsRenderer directions={props.directions} /> : null}
    </GoogleMap>
))

export default Map
