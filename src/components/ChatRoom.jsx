import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to the deployed backend service
const socket = io('https://nahin-ohi-chat.onrender.com');

function ChatRoom({ username }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    console.log('Connecting to WebSocket...');
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('connect');
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (messageText.trim()) {
      socket.emit('message', { user: username, text: messageText });
      setMessageText('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-room">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.user === username ? 'right' : 'left'}`}
          >
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatRoom;