document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.querySelector('.ai-chat-widget');
    const chatToggleBtn = document.querySelector('.chat-toggle-btn');
    const chatContainer = document.querySelector('.chat-container');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-input textarea');
    const sendButton = document.querySelector('.send-message');
    const chatMessages = document.querySelector('.chat-messages');

    // Control textarea height
    if (chatInput) {
        chatInput.addEventListener('input', function() {
            // Reset height
            this.style.height = '45px';
            
            // Set new height based on content
            const newHeight = Math.min(this.scrollHeight, 120);
            this.style.height = newHeight + 'px';
        });
    }

    // Toggle chat window with animation
    if (chatToggleBtn && chatContainer) {
        chatToggleBtn.addEventListener('click', () => {
            if (!chatContainer.classList.contains('active')) {
                chatContainer.style.display = 'flex';
                // Trigger reflow
                chatContainer.offsetHeight;
                chatContainer.classList.add('active');
                chatInput.focus();
            } else {
                chatContainer.classList.remove('active');
                setTimeout(() => {
                    chatContainer.style.display = 'none';
                }, 300); // Match transition duration
            }
        });
    }

    // Close chat window
    if (chatClose && chatContainer) {
        chatClose.addEventListener('click', () => {
            chatContainer.classList.remove('active');
            setTimeout(() => {
                chatContainer.style.display = 'none';
            }, 300);
        });
    }

    // Send message function with typing animation
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user-message');
            chatInput.value = '';
            chatInput.style.height = '45px'; 
            
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'chat-message ai-message typing-indicator';
            typingIndicator.innerHTML = `
                <div class="message-content">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate AI response (replace with actual AI integration)
            setTimeout(() => {
                // Remove typing indicator
                typingIndicator.remove();
                
                const aiResponse = "شكراً على سؤالك! سأقوم بتوجيهك إلى أفضل إجابة ممكنة.";
                addMessage(aiResponse, 'ai-message');
            }, 2000);
        }
    }

    // Add message to chat with animation
    function addMessage(message, className) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${className}`;
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
        messageDiv.innerHTML = `
            <div class="message-content">
                ${message}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        
        // Trigger animation
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 50);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message on button click
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    // Send message on Enter key (Shift+Enter for new line)
    if (chatInput) {
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});
