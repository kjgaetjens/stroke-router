import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

const Maps = (props) => {
    return (
        <div>MAPS<button className="submitButton" onClick={props.switchView}>Back to Recommendation</button></div>
    )
}

export default Maps