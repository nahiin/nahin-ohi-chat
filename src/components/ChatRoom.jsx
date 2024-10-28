import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('wss://nahin-ohi-chat.onrender.com'); // Adjust your backend URL

function ChatRoom({ username }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    if (messageText.trim()) {
      socket.emit('message', { user: username, text: messageText });
      setMessageText('');
    }
  };

  return (
    <div className="chat-room">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatRoom;