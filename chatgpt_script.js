async function generateResponse() {
    const userInput = document.getElementById("userInput").value;

    const response = await fetch('<https://api.openai.com/v1/completions>', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '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' // Replace YOUR_API_KEY with your actual API key
        },
        body: JSON.stringify({
            model: 'text-davinci-002',
            prompt: userInput,
            max_tokens: 50
        })
    });

    const data = await response.json();
    document.getElementById("response").innerText = data.choices[0].text.trim();
}
