const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Считываем переменные строго так, как они названы на твоём скриншоте
const geminiKey = process.env.GEMINI_API_KEY;
const openaiKey = process.env.OPEN_AI_KEY;
const openrouterKey = process.env.OPENROUTER_API_KEY;

// 2. Инициализируем клиенты
const genAI = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;

// Прямой клиент OpenAI (если используешь ключ OpenAI)
const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;

// Клиент для OpenRouter (работает через структуру OpenAI)
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

    // ПРИОРИТЕТ 1: Запрос через OpenAI
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
            const answer = completion.choices[0].message.content;
            return res.json({ answer, provider: "openai" });
        } catch (err) {
            console.error("Ошибка OpenAI, пробуем Gemini...", err.message);
        }
    }

    // ПРИОРИТЕТ 2: Запрос через Google Gemini
    if (genAI) {
        try {
            const model = genAI.getGenerativeModel({ 
                model: "gemini-1.5-flash",
                systemInstruction: systemPrompt
            });
            const result = await model.generateContent(prompt);
            const answer = result.response.text();
            return res.json({ answer, provider: "gemini" });
        } catch (err) {
            console.error("Ошибка Gemini, пробуем OpenRouter...", err.message);
        }
    }

    // ПРИОРИТЕТ 3: Запрос через OpenRouter
    if (openrouter) {
        try {
            const completion = await openrouter.chat.completions.create({
                model: "google/gemini-flash-1.5", // Или "openai/gpt-3.5-turbo"
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt }
                ]
            });
            const answer = completion.choices[0].message.content;
            return res.json({ answer, provider: "openrouter" });
        } catch (err) {
            console.error("Ошибка OpenRouter:", err.message);
        }
    }

    // Запасное сообщение, если ни один провайдер не ответил
    const errFallback = {
        tg: "Маълумот дарёфт наушд. Калитҳоро дар Render санҷед.",
        ru: "Информация временно недоступна. Проверьте ключи в Render.",
        uz: "Ma'lumot topilmadi. Kalitlarni tekshiring."
    };
    return res.json({ answer: errFallback[lang] || errFallback.tg });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Сервер iZamoN с поддержкой 3-х провайдеров запущен на порту ${PORT}`);
});
