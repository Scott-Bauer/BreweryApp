import React, { useState, useEffect } from 'react';
import GMap from './GMap.js'

import { API_KEY, geocode } from '../Global/API';


const Geocode = (props) => {
    const [position, setPosition] = useState([])

    useEffect(() => {
        getCoords()
    }, [])

    const getCoords = () => {
        geocode.get(props.address, { params: { key: API_KEY } }).then(response => {
            setPosition(response.data)
        }).catch(e => console.log(e))
    }

    if (!(position.length <= 0)) {
        return <GMap  {...position.results[0].geometry.location} />

    }
    else {
        return <div className="spinner-border" role="status">
            <span className="sr-only"></span>
        </div>
    }
}

export default Geocode;