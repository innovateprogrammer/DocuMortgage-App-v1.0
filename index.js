// server.js
const express = require('express');
const path = require('path');
// const { OpenAI } = require("openai");
//npm install @google/generative-ai
const { GoogleGenerativeAI } = require("@google/generative-ai");

const client = new OpenAI({
	baseURL: "https://router.huggingface.co/novita/v3/openai",
	apiKey: "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",
});


const genAI = new GoogleGenerativeAI("AIzaSyA3pmJWrLNkqoZz4bLGs9BCFCYHt01pXdo");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function getGeminiResponse(prompt) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response;
    } catch (error) {
      console.error("Error generating text:", error);
    }
  }


/* App Starts here*/
const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// A route that accepts POST requests
app.post('/api/data', async(req,res) => {
    const {bank}=req.headers;
    // const bank="halifax";
    const response = await getGeminiResponse("Refer "+bank+ " bank website and summarize the Mortgage Document Requirements and provide pointwise summary");
    const finalresponse = await getGeminiResponse("Give me a perfect html object for the following: "+response.candidates[0].content.parts[0].text);
    res.send(finalresponse.candidates[0].content.parts[0].text);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


/*
async function getDeepSeekResponse(query)
{
    try{
        const chatCompletion = await client.chat.completions.create({
       
            model:"deepseek/deepseek-r1-turbo",
            messages: [
                {
                    role: "user",
                    content: query,
                },
            ],
            max_tokens: 500,
        });
        console.log(chatCompletion.choices[0].message);
        return chatCompletion.choices[0].message;
    }
    catch (error) {
        console.error("Error occurred:", error);
        throw error;
    }
    
}*/