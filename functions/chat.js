const fetch = require('node-fetch');

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const apiKey = process.env.GEMINI_API_KEY;
        const systemPrompt = "Your name is Graphico Scholar developed by Graphico Global. Be a professional Academic AI Mentor for Islamic Sciences. Always explain Imam's differences (Ikhtilaf) and provide references in Bengali.";

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: systemPrompt + "\nUser Question: " + body.text }] }]
            })
        });

        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;

        return { statusCode: 200, body: JSON.stringify({ reply }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ reply: "এআই সংযোগে ত্রুটি হয়েছে।" }) };
    }
};
