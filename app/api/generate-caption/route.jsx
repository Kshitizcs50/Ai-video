// Install the assemblyai package by executing the command "npm install assemblyai"

import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
    const {audioFileUrl}=await req.json()
const client = new AssemblyAI({
  apiKey: process.env.CAPTION_KEY,
});

// const audioFile = "./local_file.mp3";
const audioFile = audioFileUrl

const params = {
  audio: audioFile,
  speech_model: "universal",
};

const run = async () => {
  const transcript = await client.transcripts.transcribe(params);

  console.log(transcript.text);
  return NextResponse.json({'result':transcript.text})
};
    }catch(e){
         return NextResponse.json({'error':e})
    }
}

run();