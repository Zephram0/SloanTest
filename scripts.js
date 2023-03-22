document.addEventListener("DOMContentLoaded", function () {
  const chatForm = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");

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
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error("Failed to fetch GPT response");

      const data = await response.json();
      displayGptMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  function displayUserMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", "user-message");
    messageElement.textContent = `You: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function displayGptMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", "gpt-message");
    messageElement.textContent = `GPT: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
