
const { Configuration, OpenAIApi } = require("openai");
const telegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
dotenv.config();
const axios = require('axios');

let token = process.env.TelegramKey;
token = token.toString();
let Bot = new telegramBot(token, { polling: true });

Bot.on("message", async (message) => {
  const chatId = message.from.id;
  const textInput = message.text;
  const textOutput = await getAIResponse(textInput);
  Bot.sendMessage(chatId, textOutput);  
  //await getAudioResponse(textOutput);
  //Bot.sendAudio(chatId, 'output.mp3');
});

async function getAIResponse(textInput) {
  try {
    const configuration = new Configuration({
      apiKey: process.env.AiKey,
    });
    const openai = new OpenAIApi(configuration);
    const question = 'Provide a flirty reply for' + textInput;
    const openaiResponses = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: question,
      temperature: 0.5,
      max_tokens: 1000,
      top_p: 1,
    });
    const textOutput = openaiResponses.data.choices[0].text;
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
        'xi-api-key': '0842af91b8fb0fce61a7f8781b26e9eb', 
      },
      data: {
        text: textInput, 
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

