import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import InputForm from './InputContainer'


function FetchGeoCodeData() {
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userInput, setUserInput] = useState("dallas")

  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=b52d1f3cb7d076773f2ee932f2eaf9ff`



useEffect(() => {
    const fetchGeoData = async () => {
        setIsLoading(true)

       const  response = await axios(url);
        const data = await response.data;
        const weatherLocations = data.map((item) => {
            return {lat: item.lat, lon: item.lon}
        }) //okay up to this point.
        console.log("these are locations", weatherLocations)
        const weatherPromises = weatherLocations.map( async (location) =>{
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=b52d1f3cb7d076773f2ee932f2eaf9ff`;
        const response = await axios(url);
        const weatherInfo = await response.data
        return weatherInfo
        
        })
        const updateWeatherData = async () => {
            const weatherDataResolved = await Promise.all(weatherPromises);
            console.log(weatherDataResolved) //this returns the correct data
            setWeatherData(weatherDataResolved); 
            setIsLoading(false)
         };
          
          updateWeatherData();
         
    }

    fetchGeoData()
    console.log(weatherData)//how do I ensure that this console log waits for state to be updated first
}, [url])
return (
    <div className="container">
      {isLoading ? (
        <p>Please be patient, Weather Data is Loading!</p>
      ) : (
        <>
          <div className="top">
            < InputForm userInput = {userInput} setUserInput={setUserInput} />
            <h1>75°F</h1>
            <p></p>
          </div>
          <div className="bottom">
          </div>
        </>
      )}
    </div>
  );
}


export default FetchGeoCodeData