const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const app = express();
app.use(cors({ origin: process.env.DEPLOYED_LINK,
optionsSuccessStatus: 200 }));
app.use(express.json());

app.get("/", ()=>{
  res.send({msg: 'welcome to app', issue: false});
})


app.post("/textgenerate", async (req, res)=>{
    const {query} = req.body;
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                "role": "system",
                "content": "act as human, generates creative and contextually relevant text. Your task is to produce(output) human-like text in response of user input without adding extra information. \nThe conversation should look like two humans are talking.\nfor example: `user: what do you think about react? output: To be honest I didn't work on react but i know about react little bit like it is javascript library. built by the facebook and come with lots of feature like hooks, performance optimization concepts, virtual dom and so on.`",
              },
              {
                "role": "user",
                "content": query
              }
            ],
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            max_tokens: 100,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
          res.send({"msg":  response.choices[0].message.content, 'issue': false})
    } catch (error) {   
        res.send({"msg": error.message, "issue": true});
    }
})


app.post("/textsummariz", async (req, res)=>{
    const {query} = req.body;
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                "role": "system",
                "content": "act as summarization tool that allows users to input lengthy documents, articles, or texts and deliver concise summaries. The tool should be capable of summarizing text from various domains. \nYour task is to summarize the user input in very short form and it contain all the important points without adding extra information..",
              },
              {
                "role": "user",
                "content": query
              }
            ],
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            max_tokens: 100,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
          res.send({"msg":  response.choices[0].message.content, 'issue': false})
    } catch (error) {   
        res.send({"msg": error.message, "issue": true});
    }
})


app.post("/languagetranslation", async (req, res)=>{
    const {query} = req.body;
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                "role": "system",
                "content": "act as language translate expert, your task is convert user inputed text into user define language without adding extra information.",
              },
              {
                "role": "user",
                "content": query
              }
            ],
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            max_tokens: 100,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
          res.send({"msg":  response.choices[0].message.content, 'issue': false})
    } catch (error) {   
        res.send({"msg": error.message, "issue": true});
    }
})
app.listen(8080, ()=>{
    console.log("server is running....")
})