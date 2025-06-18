function appendMessage(sender, text) 
{
    const msg = document.createElement('div');
    msg.className = sender === 'user' ? 'text-end my-2' : 'text-start my-2';
    msg.innerHTML = `<span class="badge ${sender === 'user' ? 'bg-primary' : 'bg-secondary'}">${text}</span>`;
    document.getElementById('chat-box').appendChild(msg);
    document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
}

function sendMessage() 
{
    const input = document.getElementById('user-input');
    const userText = input.value.trim();
    if (!userText) return;

    appendMessage('user', userText);
    input.value = '';

    fetch('/api/chat', 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: userText })
    })
    .then(res => res.json())
    .then(data => 
    {
        appendMessage('bot', data.response);
    })
    .catch(err => 
    {
        appendMessage('bot', "Oops, error reaching Dansby.");
        console.error(err);
    });
}
