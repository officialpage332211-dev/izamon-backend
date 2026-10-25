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

        // Автоматически запрашиваем список моделей, которые разрешены для ТВОЕГО ключа прямо сейчас
        const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const listData = await listRes.json();

        if (!listRes.ok) {
            return res.status(500).json({ answer: `Хатоги калид: ${listData.error?.message || 'Неверный ключ'}` });
        }

        // Выбираем первую рабочую модель из тех, что вернул Google для этого ключа
        const availableModel = listData.models?.find(m => m.supportedGenerationMethods?.includes("generateContent"));
        
        if (!availableModel) {
            return res.status(500).json({ answer: "Хатогӣ: Барои ин калид моделе یافت نشد." });
        }

        // Получаем точное имя модели (например, models/gemini-pro или models/gemini-1.5-flash)
        const targetModelName = availableModel.name; // уже содержит префикс models/...
        console.log("Используем авто-определенную модель:", targetModelName);

        // Отправляем запрос на генерацию
        const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/${targetModelName}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userPrompt }] }]
            })
        });

        const data = await apiResponse.json();

        if (!apiResponse.ok) {
            return res.status(500).json({ answer: `Хатогӣ аз Google: ${data.error?.message || 'Ошибка генерации'}` });
        }

        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return res.json({ answer: responseText || "Посухи холӣ." });

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
