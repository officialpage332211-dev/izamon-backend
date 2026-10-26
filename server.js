const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `Ты — официальный виртуальный помощник платформы iZamoN. 
Строго соблюдай язык запроса пользователя (таджикский, русский или узбекский). Ни в коем случае не смешивай языки в одном ответе.
Платформа содержит разделы:
1. Истиқомат ва амвол (Недвижимость)
2. Нақлиёт ва сафар (Транспорт и поездки, билеты, запчасти)
3. Бозор ва молу ашё (Рынок и товары)
4. Молия ва тиҷорат (Финансы и бизнес, курсы валют, вакансии)
5. Маориф ва илм (Образование и наука)
6. Кишоварзӣ (Сельское хозяйство, кишт, чорводорӣ)
А также кабинет для размещения объявлений (Гузоштани эълон).

Отвечай вежливо, четко и структурировано.`;

app.post('/api/chat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt || req.body.message || req.body.text;
        const lang = req.body.lang || 'tg';

        if (!userPrompt) {
            return res.status(400).json({ answer: 'Промпт холӣ аст' });
        }

        if (!apiKey) {
            return res.status(500).json({ answer: "Хатогӣ: Калиди API дар сервер танзим نشده аст." });
        }

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
                    { "role": "system", "content": SYSTEM_INSTRUCTION + ` Выбранный язык ответа: ${lang}. Отвечай исключительно на этом языке.` },
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

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
