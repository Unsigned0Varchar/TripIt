import { GoogleGenerativeAI } from '@google/generative-ai';

const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateTravelPlan(finalPrompt, retries = 3, usePro = false) {
  try {
    const model = ai.getGenerativeModel({
      model: usePro ? 'gemini-2.5-pro' : 'gemini-1.5-flash', // ✅ flash first, then fallback
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: finalPrompt }],
        },
      ],
    });

    const text = result.response.text();

    try {
      const parsed = JSON.parse(text);
      return parsed;
    } catch (error) {
      console.error('❌ Failed to parse Gemini JSON response:', error);
      return null;
    }

  } catch (err) {
    if (err.status === 503 && retries > 0) {
      console.warn(`⚠️ Gemini overloaded. Retrying... (${3 - retries + 1})`);
      await new Promise((res) => setTimeout(res, 2000 * (4 - retries))); // exponential backoff
      return generateTravelPlan(finalPrompt, retries - 1, usePro);
    }

    // 🚨 Fallback to pro if flash fails completely
    if (!usePro) {
      console.warn('⚠️ Flash failed. Falling back to Pro model...');
      return generateTravelPlan(finalPrompt, 3, true);
    }

    console.error('❌ Gemini API call failed:', err.message || err);
    return null;
  }
}