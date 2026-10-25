const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;

app.post('/api/chat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt || req.body.message || req.body.text;
        if (!userPrompt) {
            return res.status(400).json({ answer: 'Промпт холӣ аст (Пустой запрос)' });
        }

        if (!apiKey) {
            console.error("ОШИБКА: GEMINI_API_KEY не задан в Render!");
            return res.status(500).json({ answer: "Хатогӣ: Калиди API дар сервер танзим нашудааст." });
        }

        // 1. Спрашиваем у Google список моделей, доступных для вашего ключа
        const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const listData = await listRes.json();

        if (!listRes.ok) {
            const err = listData.error?.message || JSON.stringify(listData);
            return res.status(500).json({ answer: `Хатогии калид (API Key Error): ${err}` });
        }

        // Находим первую доступную модель, поддерживающую generateContent
        const validModel = listData.models?.find(m => 
            m.supportedGenerationMethods?.includes("generateContent")
        );

        if (!validModel) {
            return res.status(500).json({ answer: "Хатогӣ: Барои ин калид ҳеҷ як модели фаъол ёфт нашуд." });
        }

        // Берем имя модели, которое вернул сам Google (например, models/gemini-1.5-flash или models/gemini-2.0-flash)
        const modelName = validModel.name;
        console.log("Используем доступную модель Google:", modelName);

        // 2. Отправляем запрос к найденной модели
        const apiResponse = await fetch(`https://generativelanguage.googleapis.com/${modelName}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userPrompt }] }]
            })
        });

        const data = await apiResponse.json();

        if (!apiResponse.ok) {
            const errorMsg = data.error?.message || JSON.stringify(data);
            return res.status(500).json({ answer: `Хатогӣ аз Google API: ${errorMsg}` });
        }

        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return res.json({ answer: responseText || "Посухи холӣ." });

    } catch (error) {
        console.error("КРИТИЧЕСКАЯ ОШИБКА СЕРВЕРА:", error.message || error);
        return res.status(500).json({ answer: `Хатогӣ аз сервер: ${error.message}` });
    }
});

app.post('/api/parse', async (req, res) => {
    res.json({ success: true, title: "Маълумоти сомона", price: "Шартномавӣ" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
