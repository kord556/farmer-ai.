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
    botDiv.innerText = "ل هێڤیێ بە / Please wait...";
    chatBox.appendChild(botDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ text: `You are FARMER AI, an expert agricultural consultant. 
                    - Respond in the SAME language the user uses.
                    - If they speak Bahdini (Kurdish), respond in authentic Bahdini.
                    - If they speak Arabic, English, or Sorani, respond in that language.
                    - Provide expert farming and livestock advice.
                    User Question: ${userText}` }] 
                }]
            })
        });

        const data = await response.json();
        
        if (data && data.candidates && data.candidates[0].content) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            botDiv.innerText = aiResponse;
        } else {
            botDiv.innerText = "Error: Deployment needed for no-VPN access.";
        }

    } catch (error) {
        botDiv.innerText = "Connection error. Please upload to Vercel for free access.";
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}