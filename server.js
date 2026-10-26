const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `Ты — быстрый, умный помощник платформы iZamoN. 
Строго соблюдай язык запроса (таджикский, русский, узбекский) и никогда не смешивай их.

ПРАВИЛА:
1. ПРИВЕТСТВИЕ ("салом", "привет"): Отвечай мягко, тепло и коротко (1-2 предложения), чтобы ответ шел мгновенно.
2. ИНФО-МОДУЛЬ ([MODULE: INFO]): Выдавай чистую, проверенную справку и аналитику.
3. СЕРВИСНЫЙ МОДУЛЬ ([MODULE: SERVICE/AD]): Выдавай контент в виде аккуратной карточки 1х1 (параметры, цена, шаги).
4. НИКАКИХ лишних плашек и «воды».`;

app.post('/api/chat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt || req.body.message || req.body.text;
        const lang = req.body.lang || 'tg';

        if (!userPrompt) return res.status(400).json({ answer: 'Промпт холӣ аст' });
        if (!apiKey) return res.status(500).json({ answer: "Хатогӣ: API ключ танзим нашудааст." });

        const apiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://render.com",
                "X-Title": "iZamoN AI"
            },
            body: JSON.stringify({
                "model": "openrouter/auto",
                "max_tokens": 400,
                "messages": [
                    { "role": "system", "content": SYSTEM_INSTRUCTION + ` Язык: ${lang}.` },
                    { "role": "user", "content": userPrompt }
                ]
            })
        });

        const data = await apiResponse.json();
        if (!apiResponse.ok) return res.status(500).json({ answer: `Хатогӣ: ${data.error?.message || 'AI error'}` });

        const responseText = data.choices?.[0]?.message?.content;
        return res.json({ answer: responseText || "Посух холӣ аст." });

    } catch (error) {
        return res.status(500).json({ answer: `Хатогӣ аз сервер: ${error.message}` });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
