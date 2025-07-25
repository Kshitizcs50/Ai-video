import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
function SelectDuration({ onUserSelect }) {
  return (
    <div><h2 className='font-bold text-2xl text-purple-900'>Content</h2>
            <p className='text-gray-500'>Select Duration of your video</p>
            <Select onValueChange={(value)=>{
             
              value!='Custom Prompt'&&onUserSelect('duration',value)
            }}>
            
      <SelectTrigger className="w-full mt-2 p-6 text-lg" >
        <SelectValue placeholder="Select Duration" />
      </SelectTrigger>
      <SelectContent>
       
            <SelectItem   value='30 Seconds'>30 Seconds</SelectItem>
            <SelectItem   value='60 Seconds'>60 Seconds</SelectItem>
         
      </SelectContent>
    </Select></div>
  )
}

export default SelectDuration