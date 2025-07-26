import fs from "fs";
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
}
