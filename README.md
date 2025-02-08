SparxBot

Overview

    This Chrome extension allows users to select text on a webpage, detect if it's a math-related question, and fetch an answer using the Cohere API.

Features

    Select text from a webpage and display it in the extension popup.

    Detect if the selected text is a math-related question.

    Fetch an answer using the Cohere AI API.

Installation

    Download or clone this repository.

    Open Chrome and go to chrome://extensions/.

    Enable "Developer mode" (toggle in the top right corner).

    Click "Load unpacked" and select the extension folder.

    The extension will now be available in your Chrome toolbar.

How to Use

    Select a Sparx Maths question on any webpage.

    Click on the extension icon to open the popup.

    Click the "Get Selected text" button to extract the selected text.

    Click the "Solve" button to fetch an answer using the Cohere API.

    The answer will be displayed in the popup.

This extension uses the Cohere API to generate answers. To use it:

Replace KEY-HERE in fetchMathAnswer with your Cohere API key.

Ensure you have access to the generate endpoint in Cohere's API.
