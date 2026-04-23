const API_KEY = "AIzaSyCTr6ZBJusKAxne3ucKyNF6eupkTcLr-2k"; 

async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const userText = input.value.trim();

    if (userText === "") return;

    // نیشاندانا نامەیا بکاربەر
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
                    parts: [{ text: `Respond in Bahdini Kurdish. You are a farming expert. Question: ${userText}` }] 
                }]
            })
        });

        const data = await response.json();
        
        // پشکنینا کا بەرسڤ هاتییە یان نا
        if (data.candidates && data.candidates[0].content) {
            botDiv.innerText = data.candidates[0].content.parts[0].text;
        } else {
            botDiv.innerText = "ببورە، سیستەم یێ مژوولە. جارەکا دی پرسیارێ بکە.";
        }
    } catch (error) {
        botDiv.innerText = "کێشەکا تەکنیکی هەیه، ئینتەرنێتا خۆ پشکنی بکە.";
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}
