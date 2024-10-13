import React from 'react'

function BottomContainer({weatherData}) {
  return (
    <div className="bottom">
    <div className='feels-like'>
      <p>{(Math.floor((weatherData[0].main.feels_like - 273.15) * 9/5 + 32))}°F</p>
      <p className='bottom-description'>Feels Like</p>
      </div>
      <div className='humidity'>
        <p>{weatherData[0].main.humidity}%</p>
        <p className='bottom-description'>Humidity</p>
        </div>
        <div className='wind'>
          <p>{Math.floor(weatherData[0].wind.speed * 2.237)} mph</p>
          <p className='bottom-description'>Wind Speed</p>
        </div>
    </div>
  )
}

export default BottomContainer