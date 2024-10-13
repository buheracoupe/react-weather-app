import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import InputForm from './InputContainer'
import BottomContainer from './BottomContainer'
import Spinner from '../Assets/spinner.gif'
import ToggleButton from './ToggleButton'


function FetchGeoCodeData() {
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userInput, setUserInput] = useState("dallas")
  const [isCelsius, setIsCelsius] = useState(false)



  function toggleTemp(){
    setIsCelsius(!isCelsius)
    console.log(isCelsius)
  }
   const style=isCelsius? {justifyContent: "flex-end"}: {justifyContent: "flex-start"}

  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=1&appid=b52d1f3cb7d076773f2ee932f2eaf9ff`



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
        <div className='loading'>
        <p className='data-loading'>Please be patient, Weather Data is Loading!</p>
        <img src={Spinner} alt="loading spinner" />
        </div>
        
      ) : (
        <>
          <div className="top">
            < InputForm userInput = {userInput} setUserInput={setUserInput} />
            <ToggleButton style={style} toggleTemp={toggleTemp} celsius={isCelsius} setIsCelsius={setIsCelsius}/>
            <div className='date'>
            </div>
            <div className='description'>
                <div className='temp'>
                  <img className='icon' src={`https://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}@2x.png`} alt='weather icon'/>
                <h1>{(Math.floor((weatherData[0].main.temp - 273.15) * 9/5 + 32))}°F</h1>
                </div>
                <div className='max-min'>
                <p>{(Math.floor((weatherData[0].main.temp_min - 273.15) * 9/5 + 32))}</p>
                <div className='divider'></div>
                <p>{(Math.floor((weatherData[0].main.temp_max - 273.15) * 9/5 + 32))}</p>
                </div>
            <p className='name'>{weatherData[0].name}, {weatherData[0].sys.country}</p>
            <p>{weatherData[0].weather[0].description}</p>
            </div>
          </div>
         <BottomContainer weatherData={weatherData}/>
        </>
      )}
    </div>
  );
}


export default FetchGeoCodeData