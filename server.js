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

// Ускоренный таймаут для мгновенного ответа (сброс зависших запросов)
const fetchWithTimeout = (promise, ms = 4000) => {
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

    // Жесткие правила: 0% воды, 100% свежих данных (2026) и постраничный вывод
    const systemPrompt = `Ты — официальный AI-ассистент цифровой платформы iZamoN 🚀. 
СТРОГИЕ ПРАВИЛА:
1. НИКАКОЙ ЛЖИ И СТАРИТНЫХ ДАННЫХ: Все курсы, цены и факты актуальны строго на 28 октября 2026 года. Никаких архивных данных.
2. ФОРМАТ — КАЖДЫЙ ПУНКТ НА НОВОЙ СТРОКЕ: Запрещены сплошные абзацы. Каждый новый факт, цифра или элемент списка пишется исключительно с новой строки.
3. НИКАКОЙ ВОДЫ И ТЕОРИИ: Сразу переходи к фактам, точным цифрам, официальным курсам НБТ, банкам (Алиф, Эсхата, Спитамен) и реальным площадкам (5shanbe.tj, korgar.tj) по всему Таджикистану.
4. ЯЗЫК ОТВЕТА: Строго на языке пользователя: ${detectedLang}.`;

    const fullMessage = category ? `[Подраздел: ${category}] ${prompt}` : prompt;

    // Быстрый запрос к OpenAI
    if (openai) {
        try {
            const completion = await fetchWithTimeout(
                openai.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: fullMessage }
                    ],
                    max_tokens: 350 // Ограничиваем токены для максимальной скорости ответа
                })
            );
            return res.json({ answer: completion.choices[0].message.content, provider: "openai" });
        } catch (err) {
            console.warn(`[OpenAI Сбой]: ${err.message}`);
        }
    }

    // Быстрый резерв к Gemini
    if (genAI) {
        try {
            const model = genAI.getGenerativeModel({ 
                model: "gemini-2.5-flash",
                systemInstruction: systemPrompt
            });
            const result = await fetchWithTimeout(model.generateContent(fullMessage));
            return res.json({ answer: result.response.text(), provider: "gemini" });
        } catch (err) {
            console.warn(`[Gemini Сбой]: ${err.message}`);
        }
    }

    // Резерв через OpenRouter
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
        tg: "⚠️ Маълумот дастнорас аст.",
        ru: "⚠️ Информация недоступна.",
        uz: "⚠️ Ma'lumot mavjud emas."
    };
    return res.json({ answer: errFallback[detectedLang] || errFallback.tg, provider: "none" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 iZamoN бэкенд запущен на порту ${PORT}`);
});
