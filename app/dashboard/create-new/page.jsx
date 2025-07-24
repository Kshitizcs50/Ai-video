"use client"
import React,{useState} from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';

function createNew() {
  const[formData,setFormData]=useState([]);
  const onHandInputChange=(fieldName,fieldValue)=>{
    console.log(fieldName,fieldValue)

  }
  return (
    <div className='md:px-20'>
    <h2 className='font-bold text-4xl text-purple-950 text-center'>CREATE</h2>
    <div className='mt-10 shadow-md p-10'>

    </div>
    <SelectTopic onUserSelect={onHandInputChange}/>
    
    <SelectStyle onUserSelect={onHandInputChange}/>
    </div>
  )
}

export default createNew