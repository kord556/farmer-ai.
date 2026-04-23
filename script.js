const API_KEY = "AIzaSyCTr6ZBJusKAxne3ucKyNF6eupkTcLr-2k"; 

async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const userText = input.value.trim();

    if (userText === "") return;

    chatBox.innerHTML += `<div class="message user">${userText}</div>`;
    input.value = "";

    const botDiv = document.createElement("div");
    botDiv.className = "message bot";
    botDiv.innerText = "ل هێڤیێ بە...";
    chatBox.appendChild(botDiv);

    try {
        // ئەڤە ئەو بەشە یێ کو بێ VPN کار دکەت
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ text: `You are FARMER AI. Respond in Bahdini Kurdish for farming questions. User: ${userText}` }] 
                }]
            })
        });

        const data = await response.json();
        if (data.candidates) {
            botDiv.innerText = data.candidates[0].content.parts[0].text;
        } else {
            botDiv.innerText = "بوختانەک چێبوو، جارەکا دی تاقی بکە.";
        }
    } catch (error) {
        botDiv.innerText = "کێشەکا تەکنیکی هەیه، هندەکێ ل هێڤیێ بە.";
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}
