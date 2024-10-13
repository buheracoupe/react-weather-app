import React, { useEffect } from 'react'
import { useState } from 'react'

function DateContainer({weatherData}) {
    const [date, setDate] = useState("");

    function getDate(){
        const utcSeconds = parseInt(weatherData[0].dt) + parseInt(weatherData[0].timezone);
        console.log(utcSeconds)
       const  utcMilliseconds = utcSeconds * 1000;
       const dateObject = new Date(utcMilliseconds).toUTCString();
       setDate(dateObject); // this will update the date state with the current date in UTC timezone
       console.log(dateObject);
    }
    useEffect(()=>{
        getDate();
    }, [weatherData])
    // do I need to useEffect here
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
  return (
<div className='date-container' >
 <p className='date'>{date.toLocaleString("en-US", options)}</p>
</div> )
}

export default DateContainer