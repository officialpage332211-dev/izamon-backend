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
            return res.status(400).json({ answer: 'Промпт холӣ аст (Пустой запрос)' });
        }

        if (!apiKey) {
            console.error("ОШИБКА: GEMINI_API_KEY не задан в переменных окружения Render!");
            return res.status(500).json({ answer: "Хатогӣ: Калиди API дар сервер танзим нашудааст." });
        }

        console.log("Отправка запроса в Gemini:", userPrompt);

        // Используем проверенную стабильную модель
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(userPrompt);
        const responseText = result.response.text();

        return res.json({ answer: responseText });
    } catch (error) {
        console.error("КРИТИЧЕСКАЯ ОШИБКА GEMINI НА СЕРВЕРЕ:", error.message || error);
        return res.status(500).json({ 
            answer: `Хатогӣ аз сервер: ${error.message || 'Номаълум'}` 
        });
    }
});

app.post('/api/parse', async (req, res) => {
    res.json({ success: true, title: "Маълумоти сомона", price: "Шартномавӣ" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
