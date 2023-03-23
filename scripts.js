document.addEventListener("DOMContentLoaded", function () {
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  let chatLog = "";

  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (message === "") return;

    displayUserMessage(message);
    userInput.value = "";

    try {
      const response = await fetch("https://webgpttestwebapp.azurewebsites.net/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          user_message: message, 
          chat_log: chatLog
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch GPT response");

      const data = await response.json();
      displayGptMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  });

function displayUserMessage(message) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container", "user-message");

  const nameElement = document.createElement("div");
  nameElement.classList.add("message-sender");
  nameElement.textContent = "You";

  const messageElement = document.createElement("div");
  messageElement.classList.add("message-text");
  messageElement.textContent = message;

  messageContainer.appendChild(nameElement);
  messageContainer.appendChild(messageElement);
  chatBox.appendChild(messageContainer);
  chatBox.scrollTop = chatBox.scrollHeight;
  chatLog += `You: ${message}\n`;
}

function displayGptMessage(message) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container", "gpt-message");

  const nameElement = document.createElement("div");
  nameElement.classList.add("message-sender");
  nameElement.textContent = "GPT";

  const messageElement = document.createElement("div");
  messageElement.classList.add("message-text");
  messageElement.textContent = message;

  messageContainer.appendChild(nameElement);
  messageContainer.appendChild(messageElement);
  chatBox.appendChild(messageContainer);
  chatBox.scrollTop = chatBox.scrollHeight;
  chatLog += `GPT: ${message}\n`;
}
});
