const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `Ты — официальный интеллектуальный помощник платформы iZamoN. 
Строго соблюдай язык запроса пользователя (таджикский, русский или узбекский). Ни в коем случае не смешивай языки.

ПРАВИЛА МАРШРУТИЗАЦИИ ЗАПРОСОВ:
1. ПРИВЕТСТВИЕ (напр. "салом", "привет"): Отвечай глубоко, красиво, мудро и вовлекающе на таджикском (или языке запроса), поддерживая разговор и предлагая выбрать нужный раздел.
2. ИНФОРМАЦИОННЫЙ МОДУЛЬ ([MODULE: INFO]): Предоставляй чистую, глубокую справочную информацию, аналитику, курсы валют или инструкции без лишней воды. Никаких плашек и вводных фраз.
3. МОДУЛЬ ОБЪЯВЛЕНИЙ И СЕРВИСОВ ([MODULE: SERVICE/AD]): Предоставляй ответ строго в виде премиальной карточки (параметры, характеристики, цена, условия, контакты и шаги для покупки/аренды или подачи объявления).
4. НИКОГДА не выводи служебные плашки вроде "Портали хизматрасонӣ ва эълонҳо". Сразу переходи к сути ответа.`;

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
