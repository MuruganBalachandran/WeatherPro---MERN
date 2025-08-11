import express from 'express';

const router = express.Router();

// Simple heuristic fallback if no AI key
function heuristicAnswer(message, weather) {
  const text = (message || '').toLowerCase();
  const city = weather?.city ? ` in ${weather.city}` : '';

  if (!message || message.trim().length === 0) {
    return 'Please enter your question.';
  }

  // Weather-related quick answers
  if (text.includes('temperature')) {
    if (weather?.temperature != null && weather?.feelsLike != null) {
      return `Current temperature${city} is ${weather.temperature}°C (feels like ${weather.feelsLike}°C).`;
    }
  }
  if (text.includes('wind')) {
    if (weather?.windSpeed != null) {
      return `Wind speed${city} is ${weather.windSpeed} m/s.`;
    }
  }
  if (text.includes('humidity')) {
    if (weather?.humidity != null) {
      return `Humidity${city} is ${weather.humidity}%.`;
    }
  }
  if (text.includes('pressure')) {
    if (weather?.pressure != null) {
      return `Pressure${city} is ${weather.pressure} hPa.`;
    }
  }
  if (text.includes('visibility')) {
    if (weather?.visibility != null) {
      return `Visibility${city} is ${weather.visibility} km.`;
    }
  }
  if (text.includes('forecast') || text.includes('tomorrow')) {
    return 'For forecasts, please open the Forecast tab or ask about a specific day. I can also summarize current conditions.';
  }

  // Generic fallback guidance
  let base = 'I may not know everything, but here is a tip based on your current weather';
  if (weather?.description) {
    base += `: ${weather.description}.`;
  } else {
    base += '.';
  }
  base += ' Try asking me specific questions like “Is it good for running?”, “What’s the wind speed?”, or “Suggest indoor activities”.';
  return base;
}

router.post('/chat', async (req, res) => {
  try {
    const { message, weather } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid request', message: 'Message is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      const answer = heuristicAnswer(message, weather);
      return res.json({ answer });
    }

    // Compose weather-aware system prompt
    const weatherContext = weather ? `\nWeather Context: ${JSON.stringify(weather)}` : '';
    const systemPrompt = `You are a helpful assistant for a weather app. Answer any question clearly. If the user asks about local conditions, use the weather context if available. If the question is unrelated to weather, still give a concise, helpful answer.${weatherContext}`;

    // Call OpenAI Chat Completions API via fetch (no SDK dependency)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.4,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenAI error:', err);
      const answer = heuristicAnswer(message, weather);
      return res.json({ answer });
    }

    const json = await response.json();
    const answer = json?.choices?.[0]?.message?.content?.trim() || heuristicAnswer(message, weather);
    return res.json({ answer });
  } catch (error) {
    console.error('AI chat failed:', error);
    return res.status(500).json({ error: 'AI Chat failed', message: 'Please try again later.' });
  }
});

export default router;



