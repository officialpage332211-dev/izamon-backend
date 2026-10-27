const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Инициализация Gemini API
const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

app.post('/api/chat', async (req, res) => {
    const { prompt, lang } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Промпт не передан" });
    }

    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: "Ты — краткий и точный ассистент маркетплейса iZamoN. Отвечай строго по делу, без приветствий и лишних вводных слов, сразу суть на языке запроса."
        });

        // Таймаут на 10 секунд, чтобы сервер никогда не зависал
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Timeout")), 10000)
        );

        const aiPromise = model.generateContent(prompt);
        const result = await Promise.race([aiPromise, timeoutPromise]);
        const responseText = result.response.text();

        return res.json({ answer: responseText });

    } catch (error) {
        console.error("Ошибка API:", error.message);
        return res.json({ 
            answer: lang === 'ru' 
                ? "Запрос обрабатывается, повторите попытку." 
                : "Дархост коркард шуда истодааст, дубора кӯшиш кунед." 
        });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
