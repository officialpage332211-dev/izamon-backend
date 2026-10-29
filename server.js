    const lang = ['tg', 'ru', 'uz'].includes(req.body?.lang) ? req.body.lang : 'tg';
    const text = speechText(req.body?.text);
    if (!text) return res.status(400).json({ error: 'empty' });

    const key = crypto.createHash('sha1').update(`${lang}|${text}`).digest('hex');
    let buf = ttsCache.get(key);
    if (!buf) {
        try {
            const audio = await withTimeout(openai.audio.speech.create({
                model: process.env.TTS_MODEL || 'gpt-4o-mini-tts',
                voice: process.env.TTS_VOICE || 'coral',
                input: text,
                instructions: voiceInstructions(lang),
                response_format: 'mp3'
            }), 20000);
            buf = Buffer.from(await audio.arrayBuffer());
            ttsCache.set(key, buf, 24 * 60 * MIN);
        } catch (err) {
            console.warn(`[tts Сбой]: ${err.status || ''} ${err.message}`);
            return res.status(503).json({ error: 'tts_failed' });
        }
    }
    res.set('Content-Type', 'audio/mpeg');
    res.set('Cache-Control', 'private, max-age=86400');
    return res.send(buf);
}

app.post('/api/speak', handleSpeak);

// Проверка состояния и «будильник» для бесплатного хостинга. Ключи не показываются.
app.get('/health', (req, res) => {
    res.json({
        ok: true,
        providers: { openai: !!openai, gemini: !!gemini, openrouter: !!openrouter },
        geminiModel: GEMINI_MODEL,
        active
    });
});

if (require.main === module) {
    const PORT = process.env.PORT || 10000;
    app.listen(PORT, () => {
        console.log(`🚀 iZamoN бэкенд запущен на порту ${PORT}`);
    });
}

module.exports = {
    app, handleChat, handleImport, handleSpeak,
    detectMode, needsFacts, normalizePrompt, buildUserText, buildSystemPrompt,
    isPrivateIp, assertPublicUrl, speechText, finalize, todayTJ
};
