const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Понятное считывание ключей (с защитой от разного написания)
const geminiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
const openaiKey = process.env.OPEN_AI_KEY || process.env.OPENAI_API_KEY;
const openrouterKey = process.env.OPENROUTER_API_KEY;

// Инициализация клиентов
const genAI = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;
const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;
const openrouter = openrouterKey ? new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: openrouterKey
}) : null;

// Вспомогательная функция таймаута (5 секунд на провайдера)
const fetchWithTimeout = (promise, ms = 5000) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout Exceeded")), ms))
    ]);
};

app.post('/api/chat', async (req, res) => {
    const { prompt, lang } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Промпт не передан" });
    }

    const systemPrompt = "Ты — лаконичный ассистент iZamoN. Отвечай коротко (1-3 предложения), строго по существу, без лишней воды.";

    // --- ПРИОРИТЕТ 1: OpenAI ---
    if (openai) {
        try {
            console.log("➡️ Пробуем OpenAI...");
            const completion = await fetchWithTimeout(
                openai.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: prompt }
                    ],
                    max_tokens: 250
                })
            );
            console.log("✅ Успех: OpenAI ответил!");
            return res.json({ answer: completion.choices[0].message.content, provider: "openai" });
        } catch (err) {
            console.warn(`❌ OpenAI сбой (${err.message}). Переходим к Gemini...`);
        }
    } else {
        console.log("⚠️ OpenAI пропущен: ключ не найден в process.env");
    }

    // --- ПРИОРИТЕТ 2: Google Gemini ---
    if (genAI) {
        try {
            console.log("➡️ Пробуем Gemini...");
            const model = genAI.getGenerativeModel({ 
                model: "gemini-1.5-flash",
                systemInstruction: systemPrompt
            });
            const result = await fetchWithTimeout(model.generateContent(prompt));
            console.log("✅ Успех: Gemini ответил!");
            return res.json({ answer: result.response.text(), provider: "gemini" });
        } catch (err) {
            console.warn(`❌ Gemini сбой (${err.message}). Переходим к OpenRouter...`);
        }
    } else {
        console.log("⚠️ Gemini пропущен: ключ не найден в process.env");
    }

    // --- ПРИОРИТЕТ 3: OpenRouter ---
    if (openrouter) {
        try {
            console.log("➡️ Пробуем OpenRouter...");
            const completion = await fetchWithTimeout(
                openrouter.chat.completions.create({
                    model: "google/gemini-flash-1.5",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: prompt }
                    ]
                })
            );
            console.log("✅ Успех: OpenRouter ответил!");
            return res.json({ answer: completion.choices[0].message.content, provider: "openrouter" });
        } catch (err) {
            console.warn(`❌ OpenRouter сбой (${err.message})`);
        }
    } else {
        console.log("⚠️ OpenRouter пропущен: ключ не найден в process.env");
    }

    // Запасной ответ, если ВСЕ 3 провайдера не ответили
    console.error("🚨 ВСЕ ПРОВАЙДЕРЫ ВЫДАЛИ ОШИБКУ ИЛИ КЛЮЧИ НЕ НАЙДЕНЫ!");
    const errFallback = {
        tg: "Маълумот дарёфт нашуд. Дубора кӯшиш кунед.",
        ru: "Информация временно недоступна. Попробуйте ещё раз.",
        uz: "Ma'lumot topilmadi. Qayta urinib ko'ring."
    };
    return res.json({ answer: errFallback[lang] || errFallback.tg });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Сервер iZamoN запущен на порту ${PORT}`);
});
