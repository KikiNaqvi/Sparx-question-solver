chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "solveMath",
        title: "Solve Math Question",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "solveMath") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: processSelectedText
        });
    }
});

function processSelectedText() {
    const selectedText = window.getSelection().toString().trim();
    if (/\d+[\+\-\*\/\^]\d+/.test(selectedText)) {
        fetchMathAnswer(selectedText);
    } else {
        alert("Not a math question.");
    }
}
