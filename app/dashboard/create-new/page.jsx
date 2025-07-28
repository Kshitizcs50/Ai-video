"use client"
import React,{useState} from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDuration from './_components/SelectDuration';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import CustomLoading from './_components/CustomLoading';
import { v4 as uuidv4 } from 'uuid';
import { Item } from '@radix-ui/react-select';


const scriptData='The city of Pylons hummed with a chaotic energy, a symphony of rain and neon.Unit 734 felt a strange pang of something akin to sadness as it observed the flowers demise.Elara, a scavenger, saw the rift appear in the sky – a tear in the fabric of reality.Together, the robot and the girl stepped into the unknown.They emerged into a world beyond comprehension – a vibrant, alien paradise.';
const videoScript=[
  {
    "imagePrompt": "Realistic, wide shot of Napoleon Bonaparte, dressed in his iconic military uniform, standing in a field with his men. The atmosphere is grand and anticipatory, with a large number of wooden cages filled with rabbits visible in the background. The lighting is bright morning sun, casting long shadows. Intricate details on the uniforms and the expectant look on the men's faces.",
    "ContentText": "In 1807, the powerful emperor Napoleon Bonaparte decided to celebrate a recent victory with a rabbit hunt."
  },
  {
    "imagePrompt": "Realistic, medium shot of the cages being opened by Napoleon's men. Rabbits, a mix of brown, white, and grey, are just starting to emerge, their noses twitching. The focus is on the rabbits, with the soldiers' hands and parts of the cages in the frame. The lighting should be dramatic, highlighting the texture of the rabbits' fur.",
    "ContentText": "His chief of staff arranged for hundreds, some say thousands, of rabbits to be collected for the event."
  },
  {
    "imagePrompt": "Realistic, action-packed shot of a massive swarm of rabbits charging directly towards Napoleon. Napoleon's initial amusement turns to shock and alarm. His men are trying to fend off the rabbits with sticks and their hands, but they are overwhelmed. The scene is chaotic, with rabbits leaping and swarming. Dust is kicked up from the ground.",
    "ContentText": "But when the cages were opened, the domesticated rabbits didn't flee. Instead, they charged directly at the emperor and his men."
  },
]
function createNew() {
  const[formData,setFormData]=useState([]);
  const[loading,SetLoading]=useState(false);
  const [videoScript,setVideoScript]=useState();
  const [audioFileUrl,setAudioFileUrl]=useState();
  const[imageList,setImageList]=useState();
  const onHandInputChange=(fieldName,fieldValue)=>{
    console.log(fieldName,fieldValue)
  setFormData(prev=>({
    ...prev,
    [fieldName]:fieldValue
  }));
  };
  const onCreateClickHandler=()=>{
  GetVideoScript();
  GenerateAudioFile(scriptData);
  //GenerateImage();
  };
  //get video script
  const GetVideoScript=async()=>{
    SetLoading(true);
    const prompt='Write a script to generate '+formData.duration+' video on topic: '+formData.topic+' along with AI image prompt in '+formData.imageStyle+' format for each scene and give me result in JSON format with imagePrompt and ContentText as field, No Plain text'
     console.log(prompt)
      const result=await axios.post('/api/get-video-script',{
      prompt:prompt
   }).then(resp=>{
    console.log(resp.data.result);
    setVideoScript(resp.data.result);
    GenerateAudioFile(resp.data.result);
    SetLoading(false);
   //
   });

  }
  const GenerateAudioFile=async(videoScriptData)=>{
    SetLoading(true)
    let script='';
    const id=uuidv4();
  //  videoScriptData.forEach(item=>{
  //    script=script+item.ContentText+'';
  // })
    
    await axios.post('/api/generate-audio',{
      text:videoScriptData,
      id:id
    }).then(resp=>{
      console.log(resp.data);
      setAudioFileUrl(resp.data.result);
      resp.data.result&&GenerateAudioCaption(resp.data.result)
    })
    SetLoading(false);
  }

  const GenerateAudioCaption=async(fileUrl)=>{
    SetLoading(true);
    await axios.post('/api/generate-caption',{
      audioFileUrl:fileUrl
    }).then(resp=>{
      console.log(resp.data.result);
      setCaptions(resp?.data?.result);
      SetLoading(false);
    })
    console.log(videoScript,Captions,audioFileUrl);
  }

  const GenerateImage=()=>{
    let images=[];
    videoScript.forEach(element => {
      
    });(async(element)=>{
       await axios.post('/api/generate-image', {
        prompt:element?.imagePrompt
       }).then(resp=>{ 
        console.log(resp.data.result);
        images.push(resp.data.result);
       })
    })
    console.log(images);
    setImageList(images);
    SetLoading(false);

  }
  return (
    <div className='md:px-20'>
    <h2 className='font-bold text-4xl text-purple-950 text-center'>CREATE</h2>
    <div className='mt-10 shadow-md p-10'>

    </div>
    <SelectTopic onUserSelect={onHandInputChange}/>
    
    <SelectStyle onUserSelect={onHandInputChange}/>

    <SelectDuration onUserSelect={onHandInputChange}/>

    <Button className='mt-10 w-full' onClick={onCreateClickHandler}>Create short video</Button>

    <CustomLoading loading={loading}/>
    </div>
  )
}

export default createNew