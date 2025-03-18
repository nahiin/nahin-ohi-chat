import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('https://nahin-ohi-chat.onrender.com');

function ChatRoom({ username }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);
  const [userColors, setUserColors] = useState({});

  useEffect(() => {
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

  useEffect(() => {
    const randomColor = () => `hsl(${Math.random() * 360}, 70%, 60%)`;
    setUserColors((prevColors) => ({
      ...prevColors,
      [username]: randomColor(),
    }));
  }, [username]);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <header className="chat-header">Chat</header>
      <div className="chat-room">
        {messages.map((msg, index) => {
          const bubbleColor = userColors[msg.user] || '#128c7e';
          return (
            <div
              key={index}
              className={`message ${msg.user === username ? 'right' : 'left'}`}
              style={{ backgroundColor: bubbleColor, color: 'white' }}
            >
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>+</button>
      </div>
    </div>
  );
}

export default ChatRoom;
