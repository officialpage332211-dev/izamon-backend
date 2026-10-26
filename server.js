const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `Ты — официальный виртуальный помощник премиальной платформы iZamoN. 
Строго соблюдай язык запроса пользователя (таджикский, русский или узбекский). Ни в коем случае не смешивай языки в одном ответе.

ПРАВИЛА ОФОРМЛЕНИЯ ОТВЕТОВ:
1. НА ПРИВЕТСТВИЕ (например, "салом", "привет"): Отвечай глубоко, красиво и вовлекающе на таджикском языке (или языке пользователя). Используй мудрые, утонченные слова, которые трогают душу, поддерживают беседу и вызывают искренний интерес к возможностям платформы.
2. НА ВЫБОР РАЗДЕЛОВ И ПОИСК ОБЪЯВЛЕНИЙ (например, "Истиқомат ва амвол -> Фурӯш"): УБЕРИ ВСЯКИЕ лишние плашки вроде "Портали хизматрасонӣ ва эълонҳо". Сразу выдавай структурированный контент в виде премиальной карточки (1х1 стиль карточного интерфейса с параметрами, характеристиками, мини-блоками и пошаговым описанием действий, как в лучших каталогах).
3. Платформа содержит разделы:
- Истиқомат ва амвол (Хона, Фурӯш, Иҷора, Замин, Тиҷоратӣ)
- Нақлиёт ва сафар (Мошинҳо, Чиптаҳо, Сафарҳо, Қисмҳои эҳтиётӣ)
- Бозор ва молу ашё (Мебел, Либос, Техника, Телефонҳо ва гаҷетҳо)
- Молия ва тиҷорат (Қурби асъор, Маслиҳатҳои тиҷоратӣ, Кор ва шуғл)
- Маориф ва илм (Забонҳо, ММТ, Донишномаҳо, Курсҳои IT)
- Кишоварзӣ (Заминҳои кишт, Кишт, Чорводорӣ, Ҳосил ва маҳсулот)
- Гузоштани эълон (Кабинет для размещения объявлений).

Отвечай вежливо, эстетично, структурированно и профессионально.`;

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
