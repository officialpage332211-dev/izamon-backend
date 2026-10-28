const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// ------------------------------------------------------------------
// 1. Инициализация API-ключей для бесперебойной работы (Fallback)
// ------------------------------------------------------------------
const geminiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
const openaiKey = process.env.OPEN_AI_KEY || process.env.OPENAI_API_KEY;
const openrouterKey = process.env.OPENROUTER_API_KEY;

const genAI = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;
const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;
const openrouter = openrouterKey ? new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: openrouterKey
}) : null;

// Хелпер для предотвращения зависания запросов
const fetchWithTimeout = (promise, ms = 7000) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout Exceeded")), ms))
    ]);
};

// ------------------------------------------------------------------
// 2. Основной маршрут обработки запросов
// ------------------------------------------------------------------
app.post('/api/chat', async (req, res) => {
    const { prompt, lang, category } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Промпт не передан" });
    }

    const detectedLang = lang || 'tg';

    // Единый системный промпт для всех 6 разделов и 25 подразделов платформы
    const systemPrompt = `Ты — официальный AI-ассистент цифровой платформы iZamoN 🚀. 
СТРОГИЕ ПРАВИЛА:
1. НИКАКОЙ ВОДЫ И ТЕОРИИ: Запрещено писать вводные фразы, определения и рассуждения. Выдавай сразу точные факты, цифры, списки, цены и контакты!
2. МАСШТАБ — ВСЁ ТАДЖИКИСТАН: Охватывай рынок всей страны (Душанбе, Худжанд, Бохтар, Куляб, Рашт, ГБАО и регионы).
3. ИСТОЧНИКИ ПО ВСЕМ 6 РАЗДЕЛАМ И 25 ПОДРАЗДЕЛАМ:
   - 1. Истиқомат ва амвол (Недвижимость): дома, квартиры, продажа, иҷора (аренда), участки, коммерческая недвижимость по всему РТ.
   - 2. Нақлиёт ва сафар (Транспорт): автомобили, билеты, поездки, запчасти, авторынки Душанбе и регионов.
   - 3. Бозор ва молу ашё (Товары): мебель, одежда, техника, телефоны, маркетплейсы Таджикистана.
   - 4. Молия ва тиҷорат (Финансы и бизнес): официальный курс Национального банка Таджикистана (НБТ), коммерческие банки (Алиф, Эсхата, Спитамен, Ориёнбанк и др.), вакансии и работа по всему Таджикистану (5shanbe.tj, korgar.tj).
   - 5. Маориф ва илм (Образование): языки, ММТ, донишномаҳо, IT-курсы (IT-RUN, Alif Academy и др.).
   - 6. Кишоварзӣ (Сельское хозяйство): земли, посев, животноводство, урожай, рынки сырья и техники.
4. СТРУКТУРА: Отвечай структурированно, используя карточки, списки и выделенные цифры.
5. ЯЗЫК ОТВЕТА: Отвечай строго на языке пользователя: ${detectedLang} (tg - таджикский, ru - русский, uz - узбекский).`;

    const fullMessage = category ? `[Подраздел: ${category}] ${prompt}` : prompt;

    // --- ПРИОРИТЕТ 1: OpenAI (GPT-4o-mini) ---
    if (openai) {
        try {
            const completion = await fetchWithTimeout(
                openai.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: fullMessage }
                    ],
                    max_tokens: 500
                })
            );
            return res.json({ answer: completion.choices[0].message.content, provider: "openai" });
        } catch (err) {
            console.warn(`[OpenAI Сбой]: ${err.message}`);
        }
    }

    // --- ПРИОРИТЕТ 2: Gemini 2.5 Flash ---
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

    // --- ПРИОРИТЕТ 3: OpenRouter (Резервный канал) ---
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
            console.warn(`[OpenRouter Сбой]: ${err.message}`);
        }
    }

    // --- Резервный ответ при отсутствии подключения ко всем сетям ---
    const errFallback = {
        tg: "⚠️ Маълумот айни замон дастнорас аст. Лутфан каме дертар кӯшиш кунед! 🙏",
        ru: "⚠️ Информация временно недоступна. Попробуйте ещё чуть позже! 🙏",
        uz: "⚠️ Ma'lumot vaqtincha mavjud emas. Biroz o'tib urinib ko'ring! 🙏"
    };
    return res.json({ answer: errFallback[detectedLang] || errFallback.tg, provider: "none" });
});

// ------------------------------------------------------------------
// 3. Запуск сервера
// ------------------------------------------------------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 iZamoN бэкенд успешно запущен на порту ${PORT}`);
});
