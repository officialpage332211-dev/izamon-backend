const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;

// Строгая инструкция для мгновенных и мягких ответов без длинных текстов
const SYSTEM_INSTRUCTION = `Ты — быстрый и вежливый помощник платформы iZamoN. 
Строго соблюдай язык запроса (таджикский, русский, узбекский) и НИКОГДА не смешивай их.

ПРАВИЛА ОТВЕТА:
1. НА ПРИВЕТСТВИЕ ("салом", "привет", "salom"): Отвечай МЯГКО, ТЕПЛО, КОРОТКО И ПОНЯТНО (не пиши длинных текстов, укладывайся в 1-2 предложения), чтобы ответ генерировался мгновенно (меньше 0.5 сек). Пример на таджикском: "Салом! Хатто дар ин сонияҳо ман омодаам, ки ба шумо беҳтарин роҳҳоро нишон диҳам. Чӣ меҷӯед?".
2. НА ИНФО-ЗАПРОСЫ: Давай только проверенную и точную суть без лишней воды.
3. НА СЕРВИСЫ И ОБЪЯВЛЕНИЯ: Выдавай карточку 1х1 с параметрами.
4. НИКАКИХ служебных плашек вроде "Портали хизматрасонӣ".`;

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
                "max_tokens": 400, // Ограничение токенов для мгновенной скорости загрузки (< 0.9с)
                "messages": [
                    { "role": "system", "content": SYSTEM_INSTRUCTION + ` Язык ответа: ${lang}.` },
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
