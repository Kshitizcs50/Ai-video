// To run this code, install the dependencies:
// npm install @google/genai mime

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
export const chatSession = await model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: `Write a script to generate 30 seconds video on topic: interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and contentText as field, No Plain text.`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `\`\`\`json
[
  {
    "imagePrompt": "A bustling medieval marketplace filled with people and merchant stalls, cobblestone streets and warm morning light",
    "contentText": "In the heart of 14th-century Florence, merchants, nobles, and travelers gather to trade goods and news under the Tuscan sun."
  },
  {
    "imagePrompt": "Leonardo da Vinci in his workshop, surrounded by sketches, inventions, and paintings, bathed in candlelight",
    "contentText": "A young Leonardo da Vinci experiments with sketches of flying machines, driven by curiosity and genius."
  }
]
\`\`\``,
          },
        ],
      },
    ],
  });

  