// To run this code, install the dependencies:
// npm install @google/genai mime

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
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
  {
    "imagePrompt": "Realistic, close-up on Napoleon's face, a mix of disbelief and comical terror as a fluffy rabbit leaps towards him. His iconic bicorne hat is slightly askew. The background is a blur of motion and fur. The lighting catches the glint in Napoleon's wide eyes.",
    "ContentText": "The horde of fluffy bunnies, mistaking the emperor for the one who fed them, relentlessly pursued him."
  },
  {
    "imagePrompt": "Realistic, wide shot of Napoleon hastily retreating towards his carriage, swatting at rabbits with his riding crop. His men are in disarray, some laughing, others still trying to fight off the fluffy onslaught. The carriage is in the near distance, representing a desperate escape.",
    "ContentText": "The great military strategist was forced into a comical and undignified retreat, chased from the field by an army of rabbits."
  }
]
\`\`\``,
        },
      ],
    },
    ],
  });

  