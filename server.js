const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// Считываем ключи строго под ваши переменные окружения в Render
const geminiKey = process.env.GEMINI_API_KEY;
const openaiKey = process.env.OPEN_AI_KEY;
const openrouterKey = process.env.OPENROUTER_API_KEY;

// Инициализация клиентов
const genAI = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;
const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;
const openrouter = openrouterKey ? new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: openrouterKey
}) : null;

app.post('/api/chat', async (req, res) => {
    const { prompt, lang } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Промпт не передан" });
    }

    const systemPrompt = "Ты — лаконичный ассистент iZamoN. Отвечай коротко (1-3 предложения), строго по существу, без лишней воды.";

    // ПРИОРИТЕТ 1: OpenAI (GPT-4o-mini)
    if (openai) {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt }
                ],
                max_tokens: 250
            });
            return res.json({ answer: completion.choices[0].message.content, provider: "openai" });
        } catch (err) {
            console.error("Ошибка OpenAI, пробуем Gemini...", err.message);
        }
    }

    // ПРИОРИТЕТ 2: Google Gemini
    if (genAI) {
        try {
            const model = genAI.getGenerativeModel({ 
                model: "gemini-1.5-flash",
                systemInstruction: systemPrompt
            });
            const result = await model.generateContent(prompt);
            return res.json({ answer: result.response.text(), provider: "gemini" });
        } catch (err) {
            console.error("Ошибка Gemini, пробуем OpenRouter...", err.message);
        }
    }

    // ПРИОРИТЕТ 3: OpenRouter
    if (openrouter) {
        try {
            const completion = await openrouter.chat.completions.create({
                model: "google/gemini-flash-1.5",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt }
                ]
            });
            return res.json({ answer: completion.choices[0].message.content, provider: "openrouter" });
        } catch (err) {
            console.error("Ошибка OpenRouter:", err.message);
        }
    }

    // Если все три провайдера вернули ошибку
    const errFallback = {
        tg: "Маълумот дарёфт нашуд. Хатогӣ дар пайвастшавӣ ба нейросетьҳо.",
        ru: "Информация временно недоступна. Проверьте работоспособность ключей.",
        uz: "Ma'lumot topilmadi. Kalitlarni tekshiring."
    };
    return res.json({ answer: errFallback[lang] || errFallback.tg });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Сервер iZamoN запущен на порту ${PORT}`);
});
