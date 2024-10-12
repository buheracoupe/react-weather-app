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
  return (
<form onSubmit={handleSubmit(onSubmit)} className='input-container'>
    <input name='city' {...register("city",  {required: true})} type="text" placeholder='Type City to Get Weather Here'/>
    <button>Get Weather</button>
</form> )
}

export default InputForm