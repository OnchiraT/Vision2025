document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('vision-form');
    const output = document.getElementById('enhanced-output');
    const loadingIndicator = document.getElementById('loading');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const inputText = document.getElementById('vision-input').value;
        
        if (!inputText.trim()) {
            alert('Please enter some text');
            return;
        }

        try {
            // Show loading indicator
            loadingIndicator.style.display = 'block';
            output.style.display = 'none';
            
            const response = await fetch('/.netlify/functions/enhance-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: inputText })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            // Hide loading indicator and show result
            loadingIndicator.style.display = 'none';
            output.style.display = 'block';
            output.innerHTML = `
                <h3>Enhanced Vision:</h3>
                <p>${data.enhancedText}</p>
            `;
        } catch (error) {
            console.error('Error:', error);
            loadingIndicator.style.display = 'none';
            output.style.display = 'block';
            output.innerHTML = `<p class="error">Error: Failed to enhance text. Please try again.</p>`;
        }
    });
});
