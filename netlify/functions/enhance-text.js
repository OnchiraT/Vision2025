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
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that enhances vision statements and goals to be more specific, measurable, achievable, relevant, and time-bound (SMART). Make the text more inspiring while keeping the core meaning, tone, and Thai language."
                },
                {
                    role: "user",
                    content: `กรุณาปรับปรุงข้อความนี้: ${content}`
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
