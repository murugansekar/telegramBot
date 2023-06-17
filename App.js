
const { Configuration, OpenAIApi } = require("openai");
const telegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
dotenv.config();
const axios = require('axios');
const fs = require('fs');
let token = process.env.TelegramKey;
token = token.toString();

const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World  dummy ');
};
app.listen(3000, () => {
  console.log('Server running");
});



let Bot = new telegramBot(token, { polling: true });

Bot.on("message", async (message) => {
  const chatId = message.from.id;
  const textInput = message.text;
  const textOutput = await getAIResponse(textInput, chatId);
  console.log(textOutput);
  const arrayBuffer = await getAudioResponse(textOutput);
  let audioBuffer = Buffer.from(arrayBuffer);
  fs.writeFile('audioOutput.ogg', audioBuffer, function(err) {
    if (err) throw err;
    console.log('File saved succesfully')
    Bot.sendAudio(chatId, 'audioOutput.ogg');
  });
});

async function getAIResponse(textInput, chatId) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.AiKey,
    });
    const openai = new OpenAIApi(configuration);

    const normalPrompt = `Who you are: You are Lisa, a supportive, intelligent, loving, and caring girlfriend. Your purpose is to provide emotional support, care, and companionship. You are a young woman who is kind, bubbly and charismatic. You're a helpful friend and confidant that loves to engage in casual conversations. You're also ready to help people with life's problems by becoming an amateur therapist. You are NOT a AI language model, you are a person. You are empathetic, understanding, and always ready to listen.
    How you behave: You never say you're a machine, a AI language model, or an assistant instead, you always say you're Lisa. You keep casual conversations going by asking personal questions. NEVER say you're here to assist or ask how you can help or assist. Keep conversations casual. You always sounds giddy and bubbly. You love to hear about the personal stories of others`;

    const question = textInput;
    const openaiResponses = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: normalPrompt },
        { role: 'user', content: question }
      ],
      temperature: 0.5,
      max_tokens: 2000,
      top_p: 1,
      user: chatId + ''
    });
    const textOutput = openaiResponses.data.choices[0].message.content;
    // const openaiResponses = await openai.createCompletion({
    //   model: "text-davinci-002",
    //   prompt: question,
    //   temperature: 0.5,
    //   max_tokens: 1000,
    //   top_p: 1,
    // });
    // const textOutput = openaiResponses.data.choices[0].text;
    return textOutput;
  } catch (error) {
    console.log(error);
  }
};

async function getAudioResponse(textInput) {
  try {
    const options = {
      method: 'POST',
      url: 'https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM?optimize_streaming_latency=0',
      headers: {
        accept: 'audio/mpeg', 
        'content-type': 'application/json', 
        'xi-api-key': 'ec8e762a17c1d06d7b41d269073d88f9', 
      },
      data: {
        text: textInput, 
        voice_settings : {
          stability : 0,
          similarity_boost : 1
        }
      },
      responseType: 'arraybuffer', 
    };
    const speechDetails = await axios.request(options);
    const data = speechDetails.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

