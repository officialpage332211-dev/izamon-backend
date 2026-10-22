const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

app.post('/api/chat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt || req.body.message || req.body.text;
        if (!userPrompt) {
            return res.status(400).json({ error: 'Промпт холӣ аст' });
        }

        // Используем актуальный алиас модели
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent(userPrompt);
        const responseText = result.response.text();

        res.json({ answer: responseText });
    } catch (error) {
        console.error("Хатогӣ дар сервери AI:", error.message || error);
        res.status(500).json({ answer: "Хатогӣ: Мушкил дар коркарди дархост аз ҷониби ИИ." });
    }
});

app.post('/api/parse', async (req, res) => {
    res.json({ success: true, title: "Маълумоти сомона", price: "Шартномавӣ" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Сервер дар порти ${PORT} кор карда истодааст`);
});
