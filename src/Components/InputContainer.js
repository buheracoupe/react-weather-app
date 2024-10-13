import React from 'react'
import { useForm } from 'react-hook-form'

function InputForm({userInput, setUserInput}) {
    const {register, handleSubmit, reset} = useForm()

    function onSubmit(data){
        setUserInput(data.city)
        console.log(userInput)
        console.log(data.city)
        reset();
    }

    const validationObject = {
        required: "Please Enter a City Name to Get Weather Data.....",
        validate: (value) => {
          const trimmedValue = value.trim().toLowerCase();
          return trimmedValue !== value || trimmedValue.length === 0 ? 'Invalid city name' : true;
        },
      };
    
  return (
<form onSubmit={handleSubmit(onSubmit)} className='input-container'>
    <input name='city' {...register("city", validationObject)} type="text" placeholder='Type City to Get Weather Here...'/>
</form> )
}

export default InputForm