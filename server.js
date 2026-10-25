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
            return res.status(400).json({ answer: 'Промпт холӣ аст' });
        }

        if (!apiKey) {
            return res.status(500).json({ answer: "Хатогӣ: Калиди API дар сервер танзим нашудааст." });
        }

        // Шаг 1: Автоматически запрашиваем у Google список моделей, которые РЕАЛЬНО разрешены для твоего ключа
        const modelsRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const modelsData = await modelsRes.json();

        if (!modelsRes.ok) {
            const errText = modelsData.error?.message || 'Неверный ключ';
            return res.status(500).json({ answer: `Хатогии калид аз Google: ${errText}` });
        }

        // Ищем модель, которая поддерживает генерацию текста
        const validModel = modelsData.models?.find(m => 
            m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")
        );

        if (!validModel || !validModel.name) {
            return res.status(500).json({ answer: "Хатогӣ: Барои ин ключ ягон модели дастрас ёфт нашуд." });
        }

        // validModel.name приходит в формате вроде "models/gemini-1.5-flash" или аналогичном
        const dynamicModelName = validModel.name;
        console.log("Автоматически выбрана рабочая модель:", dynamicModelName);

        // Шаг 2: Стучимся на найденный адрес модели
        const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/${dynamicModelName}:generateContent?key=${apiKey}`, {
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
