import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

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

router.post('/gpt', async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",//gpt-3.5-turbo
      messages: [{ role: "user", content: message }]
    });

    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error in chat route:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});


// router.get('/limits', async(req, res) => {
//   try {
//     const response = await axios.get('https://openrouter.ai/api/v1/models', {
//       headers: {
//         Authorization: `Bearer ${OP}`,  // Use your API key here
//       },
//     });

//     // Send the response data back to the client
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error in limits route:', error);
//     res.status(500).json({ error: 'An error occurred while processing your request.' });
//   }
// })

export default router;