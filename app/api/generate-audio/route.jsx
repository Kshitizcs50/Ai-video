/* import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { text } = await req.json();

    // Call OpenAI TTS API
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-tts",
        voice: "alloy",
        input: text
      })
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    

    // Save file in /public/audio
    const dir = path.join(process.cwd(), "public/audio");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const fileName = `voice-${Date.now()}.mp3`;
    const filePath = path.join(dir, fileName);
    fs.writeFileSync(filePath, buffer);

    // Return the public URL
    return NextResponse.json({ url: `/audio/${fileName}` });
  } catch (error) {
    console.error("TTS Error:", error);
    return NextResponse.json({ error: "Failed to generate voice" }, { status: 500 });
  }
} */
import { storage } from "@/configs/FirebaseConfig";
import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
const fs=require('fs');
const util=require('util');
const client =new textToSpeech.TextToSpeechClient({
  apiKey:process.env.GOOGLE_API_KEY
})
export async function POST(req){
  const{text,id}=await req.json();
  const storageRef=ref(storage,'ai-short-video-files/'+id+'.mp3')

  const request={
    input:{text:text},

    voice: {languageCode:'en-US',ssmlGender:'FEMALE'},

    audioConfig:{audioEncoding:"MP3"},
  }

  const {response}=await client.synthesizeSpeech(request);
  //const writeFile=util.promisify(fs.writeFile);
  //await writeFile('output.mp3',response.audioContent,'binary');
  const audioBuffer=Buffer.from(response.audioContent,'binary');
  await uploadBytes(storageRef,audioBuffer,{contentType:'audio/mp3'})
  const downloadUrl=await getDownloadURL(storageRef);
  console.log(downloadUrl);

  console.log('Audio content written to file:output.mp3')
  return NextResponse.json({Result:'Success'});
}