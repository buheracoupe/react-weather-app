import React, { useState, useEffect } from 'react';
import axios from 'axios';

const geocodingUrl = "http://api.openweathermap.org/geo/1.0/direct?q=dallas&limit=2&appid=b52d1f3cb7d076773f2ee932f2eaf9ff"; // Replace with your actual API key
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?"; // Base URL for weather API

function FetchGeoCodeData() {
  const [geoCodeData, setGeocodeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Added state for loading
  const [error, setError] = useState(null); // Added state for errors

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Clear any previous errors

      try {
        const response = await axios.get(geocodingUrl);
        const data = await response.data;
        setGeocodeData(data);

        // Fetch weather data for each location concurrently using Promise.all
        const weatherPromises = data.map(async (item) => {
          const weatherUrlWithCoords = `${weatherUrl}lat=${item.lat}&lon=${item.lon}&appid=b52d1f3cb7d076773f2ee932f2eaf9ff`; // Construct weather URL dynamically
          const weatherResponse = await axios.get(weatherUrlWithCoords);
          return weatherResponse.data;
        });

        const weatherData = await Promise.all(weatherPromises); // Wait for all weather requests to finish
        console.log('Weather data:', weatherData); // Log the fetched weather data
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error); // Set error state for handling
      } finally {
        setIsLoading(false); // Set loading state to false after completion
      }
    };

    fetchData();
  }, []);

  return (
    <div className="fetchData">
      {isLoading ? (
        <p>Loading weather data...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <ul>
          {geoCodeData.map((item, index) => (
            <li key={index}>
              {/* Display relevant weather data from each item in weatherData */}
              <h2>Weather in {item.name}</h2>
              <p>{/* ... other weather data */}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FetchGeoCodeData;