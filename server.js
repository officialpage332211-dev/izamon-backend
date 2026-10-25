const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Настройка CORS для Vercel и локальной разработки
app.use(cors());
app.use(express.json());

// Берем ключ из переменных окружения Render
const apiKey = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;

// Фирменная системная инструкция iZamoN
const SYSTEM_INSTRUCTION = `Ты — официальный виртуальный помощник платформы iZamoN (iZamoN AI). 
Твоя главная задача — помогать пользователям по сервисам и разделам портала iZamoN:
1. Недвижимость (Хона, фурӯш, иҷора ва замин)
2. Транспорт (Мошинҳо, сафарҳо ва эҳтиётӣ)
3. Торговля и рынок (Савдо ва бозор: мебел, либос, техника)
4. Финансы и бизнес (Молия ва тиҷорат: қурби асъор ва маслиҳатҳо)
5. Образование и наука (Маориф ва илм: забонҳо, ММТ, донишномаҳо)
6. Сельское хозяйство (Кишоварзӣ: замин, кишт, чорводорӣ)

Отвечай вежливо, кратко и по делу, в основном на таджикском языке (или на языке обращения пользователя). Предоставляй конкретную информацию о функционале портала, разделах и возможностях разместить или найти объявление.`;

app.post('/api/chat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt || req.body.message || req.body.text;
        if (!userPrompt) {
            return res.status(400).json({ answer: 'Промпт холӣ аст' });
        }

        if (!apiKey) {
            return res.status(500).json({ answer: "Хатогӣ: Калиди API дар сервер танзим نشده аст." });
        }

        // Запрос к OpenRouter с авто-выбором свободной модели
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
                    { "role": "system", "content": SYSTEM_INSTRUCTION },
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

// Дополнительный роут для парсинга/доп. функций
app.post('/api/parse', async (req, res) => {
    res.json({ success: true, title: "Маълумоти сомона", price: "Шартномавӣ" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
