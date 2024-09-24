import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';

const router = express.Router();
const OPENROUTER_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPENROUTER_API_KEY,
  // defaultHeaders: {
  //   "HTTP-Referer": $YOUR_SITE_URL, // Optional, for including your app on openrouter.ai rankings.
  //   "X-Title": $YOUR_SITE_NAME, // Optional. Shows in rankings on openrouter.ai.
  // }
})

/**
 * OpenAI routes.
 * 
 * This route handles requests for interacting with the OpenAI API to generate 
 * responses based on user-provided messages, specifically focusing on cryptocurrency 
 * and blockchain technology.
 * 
 * @module routes/openAIRoutes
 * @requires express
 * @requires openai
 */

/**
 * POST /gpt
 * 
 * Route to send a user message to the OpenAI API and receive a response. 
 * The AI is configured to provide informative responses related to 
 * cryptocurrency and blockchain technology.
 * 
 * @name PostGptResponse
 * @route {POST} /gpt
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {string} req.body.message - The user's input message to the AI.
 * @returns {Object} The response containing the AI's message.
 * @throws {Error} If an error occurs while processing the request.
 */
router.post('/gpt', async (req, res) => {
  try {
    const { message } = req.body;

    const systemPrompt = {
      role: "system",
      content: "You are an AI expert in cryptocurrency and blockchain technology. Provide brief, informative responses to educate users about cryptocurrency in a clear and concise manner."
    };
    
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",//gpt-3.5-turbo
      messages: [
        systemPrompt,
        { role: "user", content: message },
      ],
      max_tokens: 100 
    });

    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error in chat route:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

export default router;