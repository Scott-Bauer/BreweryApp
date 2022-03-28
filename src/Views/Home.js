import React, {useState} from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import '../Styles/container.scss'
import  {DropdownStyles } from '../components/Dropdown';
import{ endpoint } from '../Global/API';

  var list = [];
function Home(){
   const [breweries, setBreweries] = useState([])
   const [loading, setLoading] = useState(true)


   const cities = [

    { label: "Abington", value: "Abington" },
    { label: "Bend", value: "Bend" },
    { label: "Boise", value: "Boise" },
    { label: "Castle Rock", value: "Castle Rock" },
    { label: "Denver", value: "Denver" },
    { label: "Gilbert", value: "Gilbert" },
    { label: "Houston", value: "Houston" },
    { label: "John Day", value: "John Day" },
    { label: "Killeshin", value : "Killeshin"},
    { label: "Knox", value: "Knox" },
    { label: "Mesa", value: "Mesa" },
    { label: "Petaluma", value: "Petaluma" },
    { label: "Portland", value: "Portland" },
    { label: "Quilcene", value: "Quilcene" },
    { label: "San Diego", value: "San Diego"},
    { label: "Williamsville", value: "Williamsville" }
  ];
  let navigate = useNavigate(); 
   const detailsPage = (e) =>{ 
     let path = `/detail/`+e.target.value; 
     navigate(path);
   }
  
  
    function handleChange(e) {
        getData(e.value)
        sessionStorage.setItem("value", (e.value));

    }

    function getData(value){
      setLoading(true)
      endpoint.get('/breweries?by_city='+value).then(response => {
          setBreweries(response.data); 
          setLoading(false)
      })  

    }
    function getPrevOrDefault(defaultValue) {
      const stored = sessionStorage.getItem('value');
      if (!stored) {
        return '';
      }
      getData(stored);
      return stored;
    }
    function generateKey(id){
      let today = new Date(Date.now())
      return String(id+today.getTime().toString()+Math.random(100));
    }

   
    function getList(){
      list = Object.values(breweries);
  

        return (
            <div className = "cards">
                    {list.map((brewery) => 
            <div className="card" key = {generateKey(brewery.id)}>
                    <div className="card-body" key = {generateKey(brewery.id)}>
                        <h5 className="card-title" key = {generateKey(brewery.id)}>{brewery.name}</h5>
                        <p className="card-subtile mb-2" key = {generateKey(brewery.id)}>Type: {brewery.brewery_type}</p>
                        <div className="card-text" key = {generateKey(brewery.id)}>
                        <button className="btn btn-primary" key = {generateKey(brewery.id)} value ={brewery.id} onClick={detailsPage}>See Details</button>
                        {brewery.website_url == null ? <div className = "nourl">No Website Provided</div> : <a key = {generateKey(brewery.id)} href={brewery.website_url} rel ="noreferrer" target="_blank" className="card-link">Navigate to Website</a>}
                        </div>
                        </div>
                        </div>
                )}           
                </div>)}
    return (
        <div className = "container">
            <div className = "header">
              <h1>Welcome to My Brewery Application</h1>
              <h4> Please Select a City to See the List of Breweries</h4>
              <div className="row">
                <div className="col-md-4"></div>
                  <div className="col-md-4">
              <Select styles={DropdownStyles}  options={ cities } defaultInputValue={getPrevOrDefault} onChange = { handleChange }  />
                  </div>
              <div className="col-md-4"></div>
              </div>
              </div>
                 {
                  !loading ? 
                   getList() : ''
                }
               </div>)}

export default Home;
