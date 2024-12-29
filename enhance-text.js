const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const { content } = JSON.parse(event.body);

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "คุณเป็นผู้เชี่ยวชาญในการปรับแต่งและจัดโครงสร้างประโยคให้มีผลกระทบและอ่านง่ายขึ้นในขณะที่ยังคงความหมายหลักไว้ กรุณาตอบเป็นภาษาไทย"
                },
                {
                    role: "user",
                    content: `กรุณาปรับปรุงข้อความนี้ให้มีพลังและน่าประทับใจมากขึ้น โดยยังคงความหมายหลักไว้: ${content}`
                }
            ]
        });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success: true,
                content: completion.choices[0].message.content
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                error: 'Failed to enhance text'
            })
        };
    }
};