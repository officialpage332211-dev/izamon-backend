const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;

async function fetchWithRetry(url, options, retries = 3, delay = 1500) {
    for (let i = 0; i < retries; i++) {
        const response = await fetch(url, options);
        if (response.ok || response.status !== 503) {
            return response;
        }
        await new Promise(res => setTimeout(res, delay));
        delay *= 2;
    }
    return fetch(url, options);
}

app.post('/api/chat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt || req.body.message || req.body.text;
        if (!userPrompt) {
            return res.status(400).json({ answer: 'Промпт холӣ аст' });
        }

        if (!apiKey) {
            return res.status(500).json({ answer: "Хатогӣ: Калиди API дар сервер танзим нашудааст." });
        }

        // Переходим на актуальный стабильный идентификатор
        const apiResponse = await fetchWithRetry(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: userPrompt }] }]
                })
            }
        );

        const data = await apiResponse.json();

        if (!apiResponse.ok) {
            const errorMsg = data.error?.message || 'Хатогии номаълум';
            return res.status(500).json({ answer: `Хатогӣ аз Google: ${errorMsg}` });
        }

        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!responseText) {
            return res.status(500).json({ answer: "Хатогӣ: Посух аз модель холӣ аст." });
        }

        return res.json({ answer: responseText });

    } catch (error) {
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
