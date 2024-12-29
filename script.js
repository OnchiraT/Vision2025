async function getEnhancedText(content) {
    try {
        const response = await fetch('/api/enhance-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });
        
        const data = await response.json();
        if (!data.success) throw new Error(data.error);
        return data.content;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Rest of your code remains the same