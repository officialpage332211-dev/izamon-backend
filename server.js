const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// Базовые настройки ключей
const geminiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
const openaiKey = process.env.OPEN_AI_KEY || process.env.OPENAI_API_KEY;
const openrouterKey = process.env.OPENROUTER_API_KEY;

const genAI = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;
const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;
const openrouter = openrouterKey ? new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: openrouterKey
}) : null;

// Таймаут 5 секунд для защиты от зависаний
const fetchWithTimeout = (promise, ms = 5000) => {
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

    // Точное определение языка для защиты от языковой «аварии»
    const detectedLang = lang || (/[ӯқҳҷғӣӯў]/i.test(prompt) ? 'tg' : /^[А-Яа-яЁё\s]+$/.test(prompt) ? 'ru' : 'tg');

    // Жесткий системный промпт: строгое соответствие языку, без воды и философии
    const systemPrompt = `Ты — быстрый, вежливый и точный AI-ассистент цифровой платформы iZamoN 🚀. 
СТРОГИЕ ПРАВИЛА:
1. ЯЗЫК ОТВЕТА: Отвечай СТРОГО на том же языке, на котором написан вопрос пользователя (таджикский, русский или узбекский). Текущий язык: ${detectedLang}.
2. НИКАКОЙ ВОДЫ: Никаких вводных лекций, определений («... — это...») и философии. Говори сразу по существу и цифрам! 🎯
3. ФОРМАТ: Используй смайлики (😊, 📊, 💡, 🔥) для живости, но пиши ультра-кратко (1-2 предложения или короткий список).
4. КОНТЕКСТ: Учитывай текущий раздел приложения для максимальной точности.`;

    const fullMessage = category 
        ? `[Раздел: ${category}] ${prompt}` 
        : prompt;

    // --- ПРИОРИТЕТ 1: OpenAI ---
    if (openai) {
        try {
            const completion = await fetchWithTimeout(
                openai.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: fullMessage }
                    ],
                    max_tokens: 250
                })
            );
            return res.json({ answer: completion.choices[0].message.content, provider: "openai" });
        } catch (err) {
            console.warn(`OpenAI сбой: ${err.message}`);
        }
    }

    // --- ПРИОРИТЕТ 2: Google Gemini ---
    if (genAI) {
        try {
            const model = genAI.getGenerativeModel({ 
                model: "gemini-2.5-flash",
                systemInstruction: systemPrompt
            });
            const result = await fetchWithTimeout(model.generateContent(fullMessage));
            return res.json({ answer: result.response.text(), provider: "gemini" });
        } catch (err) {
            console.warn(`Gemini сбой: ${err.message}`);
        }
    }

    // --- ПРИОРИТЕТ 3: OpenRouter ---
    if (openrouter) {
        try {
            const completion = await fetchWithTimeout(
                openrouter.chat.completions.create({
                    model: "openai/gpt-4o-mini",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: fullMessage }
                    ]
                })
            );
            return res.json({ answer: completion.choices[0].message.content, provider: "openrouter" });
        } catch (err) {
            console.warn(`OpenRouter сбой: ${err.message}`);
        }
    }

    // Запасной ответ с учетом языка
    const errFallback = {
        tg: "⚠️ Маълумот айни замон дастнорас аст. Лутфан каме дертар кӯшиш кунед! 🙏",
        ru: "⚠️ Информация временно недоступна. Попробуйте ещё чуть позже! 🙏",
        uz: "⚠️ Ma'lumot vaqtincha mavjud emas. Biroz o'tib urinib ko'ring! 🙏"
    };
    return res.json({ answer: errFallback[detectedLang] || errFallback.tg });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 iZamoN бэкенд запущен на порту ${PORT}`);
});
