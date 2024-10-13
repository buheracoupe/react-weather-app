import React from 'react'

function ToggleButton({isCelsius, toggleTemp, style}) {




  return (
    <div onClick={toggleTemp} className="toggle">
<p className='farenheit option'>°F</p>
     <div style={style}  className='button-container'>
            <div  className='button'></div>
        </div>
        <p className='celcius option'>°C</p>
    </div>
  )
}

export default ToggleButton