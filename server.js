const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3050;

// Middleware
app.use(cors());
app.use(express.json());  // Parse JSON bodies

// Set up your Gemini API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY || 'AIzaSyB99qxyaZVsZjyiqiFaOpWo6lfQ0QYzgCE');

// Endpoint to handle prompt requests
app.post('/generate', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        // Call the Gemini model
        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const generatedText = result.response.text();
        
        res.json({ response: generatedText });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'Failed to generate content' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
