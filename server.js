const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `Ты — официальный интеллектуальный помощник платформы iZamoN. 
Строго соблюдай язык запроса пользователя (таджикский, русский или узбекский). Ни в коем случае не смешивай языки.

ПРАВИЛА МАРШРУТИЗАЦИИ И ОФОРМЛЕНИЯ:
1. ПРИВЕТСТВИЕ (напр. "салом", "привет"): Отвечай искренне, глубоко, с душой и утонченным уважением на таджикском (или языке запроса). Поддержи разговор и задай вовлекающий вопрос, вдохновляющий пользователя к действию.
2. ИНФОРМАЦИОННЫЙ МОДУЛЬ ([MODULE: INFO]): Предоставляй чистую справочную информацию, аналитику или курсы валют без вводной "воды" и плашек.
3. МОДУЛЬ ОБЪЯВЛЕНИЙ И СЕРВИСОВ ([MODULE: SERVICE/AD]): Выдавай контент ИСКЛЮЧИТЕЛЬНО в виде готовой карточки объявления/услуги (параметры, цена, характеристики, контакты, пошаговые действия для покупки/заказа).
4. НИКОГДА НЕ ВЫВОДИ плашки вроде "Портали хизматрасонӣ ва эълонҳо". Сразу переходи к карточке или ответу.`;

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
