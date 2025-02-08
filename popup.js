document.getElementById("getSelection").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getSelectedText
        }, (results) => {
            if (results && results[0] && results[0].result) {
                document.getElementById("selectedText").textContent = results[0].result;
            } else {
                document.getElementById("selectedText").textContent = "No text selected.";
            }
        });
    });
});

document.getElementById("solveQuestion").addEventListener("click", () => {
    const question = document.getElementById("selectedText").textContent;
    if (question) {
        document.getElementById("answerText").textContent = "Solving..."; // Show loading
        fetchCohereAnswer(question);
    } else {
        document.getElementById("answerText").textContent = "No text selected.";
    }
});

function getSelectedText() {
    return window.getSelection().toString().trim();
}

function fetchCohereAnswer(text) {
    const apiKey = "t6X3R8ldgOQpEAukjDNsV5pvLT80kHLfeCmZ5i9Q"; // Replace with your Cohere API key

    fetch("https://api.cohere.ai/v1/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "command",  // More reliable than "command-xlarge-nightly"
            prompt: `Give only the final answer to: ${text}`, // Forces Cohere to return only the answer
            max_tokens: 20, // Reduce tokens to prevent long explanations
            temperature: 0 // Ensures a direct and precise response
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Cohere Response:", data); // Debugging

        if (data.generations && data.generations.length > 0) {
            document.getElementById("answerText").textContent = data.generations[0].text.trim();
        } else {
            document.getElementById("answerText").textContent = "Couldn't get an answer.";
        }
    })
    .catch(error => {
        console.error("Error:", error);

        if (error.message.includes("401")) {
            document.getElementById("answerText").textContent = "Invalid API key. Check your Cohere account.";
        } else if (error.message.includes("429")) {
            document.getElementById("answerText").textContent = "Rate limit exceeded. Try again later.";
        } else {
            document.getElementById("answerText").textContent = "An error occurred. See console for details.";
        }
    });
}
