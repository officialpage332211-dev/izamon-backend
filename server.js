const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// 1. Чат с AI (Gemini)
app.post('/api/chat', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'Пурсиш ворид карда нашудааст' });
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: prompt }] }] },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Пасух гирифта нашуд.";
        res.json({ answer: aiText });
    } catch (error) {
        console.error('Хатогӣ дар AI:', error?.response?.data || error.message);
        res.status(500).json({ answer: "Хатогӣ ҳангоми пайвастшавӣ ба AI." });
    }
});

// 2. Парсинг по ссылке
app.post('/api/parse', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'Суроға (URL) лозим аст' });
        }

        const pageResponse = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const $ = cheerio.load(pageResponse.data);

        const title = $('h1').first().text().trim() || $('meta[property="og:title"]').attr('content') \vert{}\vert{} $('title').text().trim() || 'Маҳсулот аз сомона';
        const price = $('.announcement-price').text().trim() \vert{}\vert{}$('meta[property="product:price:amount"]').attr('content') || 'Мувофиқи сомона';
        const description = $('meta[property="og:description"]').attr('content') || $('.announcement-description').text().trim() \vert{}\vert{}$('p').first().text().trim() || 'Тавсифи муфассал.';

        res.json({
            success: true,
            title: title,
            price: price,
            district: "Душанбе",
            desc: `• Суроға: ${url}\n• Тавсиф: ${description}`,
            link: url
        });
    } catch (error) {
        console.error('Хатогӣ дар парсинг:', error.message);
        res.status(500).json({ error: 'Хатогӣ ҳангоми кашидани маълумот аз сомона.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
