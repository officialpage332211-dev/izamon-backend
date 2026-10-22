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
        if (!userPrompt) return res.status(400).json({ error: 'Промпт пустой' });

        // Пробуем несколько стандартных названий
        const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
        let lastError = null;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Попытка вызвать модель: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent(userPrompt);
                const responseText = result.response.text();
                
                console.log(`Успешно сработало с моделью: ${modelName}`);
                return res.json({ answer: responseText });
            } catch (err) {
                console.log(`Модель ${modelName} не ответила: ${err.message}`);
                lastError = err;
            }
        }

        // Если ни одна не сработала — пробрасываем ошибку в ответ
        throw lastError;

    } catch (error) {
        console.error("КРИТИЧЕСКАЯ ОШИБКА GEMINI:", error.message || error);
        res.status(500).json({ 
            answer: `Ошибка сервера: ${error.message || 'Неизвестная ошибка'}` 
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
