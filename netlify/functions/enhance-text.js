const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
    }

    try {
        const { text } = JSON.parse(event.body);
        
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Enhance the following text for a vision board: ${text}`,
            max_tokens: 200
        });

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                enhanced: completion.data.choices[0].text.trim()
            })
        };
    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: 'Failed to enhance text',
                details: error.message 
            })
        };
    }
}
