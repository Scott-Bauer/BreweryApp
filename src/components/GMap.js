import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react'
import Marker from './Marker';
import { API_KEY } from '../Global/API';

const GMap = (props) => {
  const [position, setPosition] = useState([])

  useEffect(() => { 
  setPosition({
    lat:
    parseFloat(props.lat),
  long:
    parseFloat(props.lng)
  })
}, [props])

 
    return (
      <GoogleMapReact
        zoom={14}
        center={{
          lat: position.lat, lng: position.long
        }
        }
        bootstrapURLKeys={{ key: API_KEY }}
        style={{
          width: '50%',
          height: '50%',
          maxWidth: '50vw',
          position: 'absolute',

        }}
      >
        <Marker
          lat={position.lat}
          lng={position.long}
        />
      </GoogleMapReact>
    )


  }

  




export default GMap;




