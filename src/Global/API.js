import axios from "axios";
 

export const endpoint = axios.create({
        baseURL : "https://api.openbrewerydb.org"
      });

      export const geocode = axios.create({
        baseURL : "https://maps.google.com/maps/api/geocode/json?address="
      });


      export const API_KEY='AIzaSyCM329xqD7AB_Wx4cH45G3NYxTL9SheHRo';



