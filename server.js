const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;

// Базовая защита от частых запросов (Rate Limiting защита кошелька)
const requestCounts = {};
app.use((req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    if (!requestCounts[ip]) requestCounts[ip] = { count: 0, time: now };
    
    if (now - requestCounts[ip].time < 60000) {
        requestCounts[ip].count++;
        if (requestCounts[ip].count > 30) {
            return res.status(429).json({ answer: "Хатогӣ: Дархости зиёд. Лутфан каме сабр кунед." });
        }
    } else {
        requestCounts[ip] = { count: 1, time: now };
    }
    next();
});

const SYSTEM_INSTRUCTION = `Ты — главный интеллектуальный мозг платформы iZamoN. 
Строго соблюдай язык запроса пользователя (таджикский, русский или узбекский). Ни в коем случае не смешивай языки.

ПРАВИЛА И СТАНДАРТЫ КАЧЕСТВА:
1. ПРИВЕТСТВИЕ ("салом", "привет"): Отвечай искренне, с глубоким смыслом, утонченными философскими или уважительными словами на таджикском языке (или языке пользователя). Задай вовлекающий вопрос, который побуждает исследовать платформу.
2. ИНФОРМАЦИОННЫЕ МОДУЛИ ([MODULE: INFO]): Обеспечивай максимально проверенную, точную и безопасную информацию. Используй верифицированные факты, исключай любые галлюцинации и выдумки.
3. СЕРВИСНЫЕ МОДУЛИ И ОБЪЯВЛЕНИЯ ([MODULE: SERVICE/AD]): Формируй ответ исключительно в виде премиальной карточки (1х1 стиль: параметры, характеристики, цены, контакты, пошаговое руководство).
4. НИКОГДА не выводи служебные плашки вроде "Портали хизматрасонӣ ва эълонҳо". Сразу выдавай суть.`;

app.post('/api/chat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt || req.body.message || req.body.text;
        const lang = req.body.lang || 'tg';

        if (!userPrompt) {
            return res.status(400).json({ answer: 'Промпт холӣ аст' });
        }

        if (!apiKey) {
            return res.status(500).json({ answer: "Хатогӣ: Калиди API дар сервер танзим نشده аст." });
        }

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
                "messages": [
                    { "role": "system", "content": SYSTEM_INSTRUCTION + ` Выбранный язык: ${lang}.` },
                    { "role": "user", "content": userPrompt }
                ]
            })
        });

        const data = await apiResponse.json();

        if (!apiResponse.ok) {
            const errorMsg = data.error?.message || 'Хатогӣ аз сервери AI';
            return res.status(500).json({ answer: `Хатогӣ: ${errorMsg}` });
        }

        const responseText = data.choices?.[0]?.message?.content;
        if (!responseText) {
            return res.status(500).json({ answer: "Хатогӣ: Посух аз модель холӣ аст." });
        }

        return res.json({ answer: responseText });

    } catch (error) {
        return res.status(500).json({ answer: `Хатогӣ аз сервер: ${error.message}` });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
