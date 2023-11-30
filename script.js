async function checkPlagiarism() {
    const textToCheck = document.getElementById('textToCheck').value;

    try {
        const response = await fetch('http://localhost:3000/api/plagiarism-check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textToCheck }),
        });

        if (response.ok) {
            const result = await response.json();
            displayResult(result.plagiarismResult);
        } else {
            throw new Error('Failed to check plagiarism');
        }
    } catch (error) {
        console.error(error);
        displayResult('Error checking plagiarism');
    }
}

function displayResult(result) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = result;
}
