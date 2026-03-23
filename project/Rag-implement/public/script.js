const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function appendMessage(sender, text, isBot = false) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isBot ? "bot-message" : "user-message"}`;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  messageDiv.innerHTML = `
        <div class="avatar">${isBot ? "🤖" : "👤"}</div>
        <div class="message-content">
            <p>${text}</p>
            <span class="time">${timeStr}</span>
        </div>
    `;

  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTypingIndicator() {
  const indicatorDiv = document.createElement("div");
  indicatorDiv.className = "message bot-message typing-indicator-container";
  indicatorDiv.id = "typing-indicator";

  indicatorDiv.innerHTML = `
        <div class="avatar">🤖</div>
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;

  chatWindow.appendChild(indicatorDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTypingIndicator() {
  const indicator = document.getElementById("typing-indicator");
  if (indicator) {
    indicator.remove();
  }
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  // Append user message
  appendMessage("User", message, false);
  userInput.value = "";

  // Show bot typing
  showTypingIndicator();

  try {
    const response = await axios.post("/api/chat", { message });
    removeTypingIndicator();

    if (response.data.answer) {
      appendMessage("Bot", response.data.answer, true);
    } else if (response.data.error) {
      appendMessage("Bot", `Error: ${response.data.error}`, true);
    }
  } catch (error) {
    removeTypingIndicator();
    console.error("Error:", error);
    const errorMsg =
      error.response?.data?.error ||
      "Sorry, something went wrong. Make sure the server is running.";
    appendMessage("Bot", errorMsg, true);
  }
});
