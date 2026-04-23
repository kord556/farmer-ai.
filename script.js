const API_KEY = "AIzaSyAwNC-ibbDZtwLQpJwlzwNoZokG9WcTqow"; 

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
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ text: `Respond as a farming expert in Bahdini Kurdish. Question: ${userText}` }] 
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            botDiv.innerText = data.candidates[0].content.parts[0].text;
        } else {
            botDiv.innerText = "ببورە، تشتەک یێ خەلەتە. کلیلێ بپشکنە.";
        }
    } catch (error) {
        botDiv.innerText = "کێشەکا تەکنیکی هەیه.";
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}
