import React, {useState, useEffect} from 'react'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer} from 'react-google-maps'



import * as env from '../../env'

const Map = withScriptjs(withGoogleMap((props) => 
    <GoogleMap
      defaultZoom={11}
      defaultCenter={props.center}
    >
      <Marker position={props.center} color='blue' />
      {props.hospitals.map((hospital, i) => <Marker key={i} position={hospital.coords} onClick={() => props.getDirections(hospital.coords)} />)}
      {props.directionsOn ? <DirectionsRenderer directions={props.directions} /> : null}
    </GoogleMap>
))

export default Map
