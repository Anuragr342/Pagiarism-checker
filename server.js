const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/plagiarism-check', async (req, res) => {
    const textToCheck = req.body.text;
    const { default: fetch } = await import('node-fetch'); // Use dynamic import

    const apiKey = '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';  // Replace with your actual API key

    try {
        const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                prompt: textToCheck,
                max_tokens: 50,
            }),
        });

        if (response.ok) {
            const result = await response.json();
            const plagiarismResult = result.choices[0].text.trim();
            res.json({ plagiarismResult });
        } else {
            throw new Error('Failed to check plagiarism');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error checking plagiarism' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
