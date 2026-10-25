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

        console.log("Запрос к Gemini API...");

        // Прямой запрос на стабильный эндпоинт v1
        const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userPrompt }] }]
            })
        });

        const textRes = await apiResponse.text();
        let data;
        try {
            data = JSON.parse(textRes);
        } catch (e) {
            console.error("Ответ не в формате JSON:", textRes);
            return res.status(500).json({ answer: "Хатогӣ: Сервери Google посухи нодуруст фиристод." });
        }

        if (!apiResponse.ok) {
            const errorMsg = data.error?.message || JSON.stringify(data);
            return res.status(500).json({ answer: `Хатогӣ аз Google API: ${errorMsg}` });
        }

        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!responseText) {
            return res.status(500).json({ answer: "Хатогӣ: Посух аз модель холӣ аст." });
        }

        return res.json({ answer: responseText });

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
