import {
  useNavigate,
  useParams
} from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GMap from '../components/GMap'
import { phoneFormatter, dateFormatter } from "../Global/Formatters";
import { endpoint } from "../Global/API";
import Geocode from "../components/Geocode"


function Brewery() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [breweryData, setBreweryData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [location, setLocation] = useState([])
  const mounted = useRef(false)

  const returnHome = () => {
    navigate(-1)
  }
  useEffect(() => {
    endpoint.get('/breweries/' + id).then(response => {
      setBreweryData(response.data)
      setLoading(false);
    }).catch(e => console.log(e))
  }, [id])

  useEffect(() => {
    if (mounted.current) {
      let fullAddress = (breweryData.street + " " + breweryData.city + ", " + breweryData.state + " " + breweryData.postal_code);
      fullAddress = fullAddress.replace("null", "")     
      let loc = {
        lng: breweryData.longitude,
        lat:  breweryData.latitude,
        address: fullAddress
      };
      setLocation(loc)
    }
    else{
      mounted.current = true;
    }
  }, [breweryData])

  if (mounted.current && location.address != null) {
    return (
      <div className="container">
        <button className="btn btn-primary" id="backBtn" onClick={returnHome}></button>
        <div className="card">
          <div className="detailsCard">
            <div className="card-body">
              <h3 className="card-title">{breweryData.name}</h3>
              <div className="card-body"><p className="card-text">{location.address}</p></div>
            </div>
          </div>
        </div>
        <div className="mapHolder">
          {location.lng == null || location.lat == null ? <Geocode {...location} /> : <GMap {...location} />}
          <div className="sideCard">
            <div className="card-body">
                <p className="card-text-sm">Type: {breweryData.brewery_type}</p>
                <p className="card-text-sm">Contact: {breweryData.phone==null ?  "See website for contact information" : phoneFormatter(breweryData.phone)}</p>
                <p className="card-text-sm">Created: {dateFormatter(breweryData.created_at)}</p>
                {breweryData.website_url == null ? '' : <p className="card-text-sm">Website: <a href={breweryData.website_url} target="_blank" rel="noreferrer">{breweryData.website_url}</a></p>
                }
              </div>
            </div>
          </div>
      </div>)
  } else {
    return (<div className="spinner-border" role="status">
      <span className="sr-only"></span>
    </div>)
  }
}
export default Brewery;