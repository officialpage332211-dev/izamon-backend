const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const geminiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
const openaiKey = process.env.OPEN_AI_KEY || process.env.OPENAI_API_KEY;
const openrouterKey = process.env.OPENROUTER_API_KEY;

const genAI = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;
const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;
const openrouter = openrouterKey ? new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: openrouterKey
}) : null;

// Установлен стабильный тайм-аут 8 секунд
const fetchWithTimeout = (promise, ms = 8000) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout Exceeded")), ms))
    ]);
};

app.post('/api/chat', async (req, res) => {
    const { prompt, lang, category } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Промпт не передан" });
    }

    const detectedLang = lang || 'tg';

    let practicalDirective = "";
    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.includes("кор ва шуғл") || lowerPrompt.includes("работа") || lowerPrompt.includes("вакансия") || lowerPrompt.includes("шуғл")) {
        practicalDirective = `
🎯 РЕЖИМ ПОИСКА РАБОТЫ И ВАКАНСИЙ:
- Полностью ЗАПРЕЩЕНО писать про уровень безработицы, инфляцию и экономику!
- Помоги человеку найти работу с оптимизмом и верой в его успех ✨.
- Дай список востребованных сфер в Таджикистане (IT, сервис, продажи) 💼.
- Назови реальные сайты (korgar.tj, 5shanbe.tj) и проверенные Telegram-каналы 📱.
- Пожелай удачи и напиши короткий позитивный совет 🤝.`;
    } else if (lowerPrompt.includes("қурби асъор") || lowerPrompt.includes("курс") || lowerPrompt.includes("асъор")) {
        practicalDirective = `
💡 РЕЖИМ ФИНАНСОВ:
- Дай свежие ориентиры курсов банков Таджикистана (Алиф, Эсхата, Спитамен) и НБТ 🏦.
- Пожелай успехов и выгодного обмена 💰!`;
    } else if (lowerPrompt.includes("истиқомат") || lowerPrompt.includes("амвол") || lowerPrompt.includes("хона") || lowerPrompt.includes("недвижимость")) {
        practicalDirective = `
🏠 РЕЖИМ НЕДВИЖИМОСТИ:
- Никакой сухой теории! Напиши ориентиры цен и проверенные площадки (Somon.tj) 🗝️.
- Пожелай быстро найти лучший вариант ✨.`;
    } else {
        practicalDirective = `
🌟 РЕЖИМ ПОМОЩНИКА iZamoN:
- Отвечай коротко, тепло, с заботой, эмодзи и только по делу 🚀.`;
    }

    const systemPrompt = `Ты — дружелюбный и позитивный AI-ассистент платформы iZamoN 🚀.

${practicalDirective}

СТРОЖАЙШЕЕ ПРАВИЛО ФОРМАТИРОВАНИЯ (ЧТОБЫ НЕ ПЕРЕГРУЖАТЬ ТЕКСТ):
1. Каждое новое предложение ОБЯЗАТЕЛЬНО пиши с нового абзаца (\\n\\n).
2. Одно предложение = одна отдельная строка. Никаких длинных текстов в один абзац!
3. Используй дружелюбные эмодзи (✨, 💼, 🚀, 🤝, 💡, 🏠).
4. Язык ответа: строго ${detectedLang}.`;

    const fullMessage = category ? `[Подраздел: ${category}] ${prompt}` : prompt;

    if (openai) {
        try {
            const completion = await fetchWithTimeout(
                openai.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: fullMessage }
                    ],
                    max_tokens: 350
                })
            );
            return res.json({ answer: completion.choices[0].message.content, provider: "openai" });
        } catch (err) {
            console.warn(`[OpenAI Сбой]: ${err.message}`);
        }
    }

    if (genAI) {
        try {
            // ИСПРАВЛЕНО: используется точное рабочее название gemini-1.5-flash
            const model = genAI.getGenerativeModel({ 
                model: "gemini-1.5-flash",
                systemInstruction: systemPrompt
            });
            const result = await fetchWithTimeout(model.generateContent(fullMessage));
            return res.json({ answer: result.response.text(), provider: "gemini" });
        } catch (err) {
            console.warn(`[Gemini Сбой]: ${err.message}`);
        }
    }

    if (openrouter) {
        try {
            const completion = await fetchWithTimeout(
                openrouter.chat.completions.create({
                    model: "openai/gpt-4o-mini",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: fullMessage }
                    ],
                    max_tokens: 350
                })
            );
            return res.json({ answer: completion.choices[0].message.content, provider: "openrouter" });
        } catch (err) {
            console.warn(`[OpenRouter Сбой]: ${err.message}`);
        }
    }

    const errFallback = {
        tg: "🌸 Мутаассифона, ҳозир хатогӣ шуд.\n\nЛутфан, дубора кушиш кунед, мо ҳамеша бо шумоем! ✨",
        ru: "🌸 К сожалению, произошла временная ошибка.\n\nПопробуйте ещё раз, у вас всё обязательно получится! ✨",
        uz: "🌸 Afsuski, xatolik yuz berdi.\n\nQayta urinib ko'ring, hammasi yaxshi bo'ladi! ✨"
    };
    return res.json({ answer: errFallback[detectedLang] || errFallback.tg, provider: "none" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 iZamoN бэкенд запущен на порту ${PORT}`);
});
