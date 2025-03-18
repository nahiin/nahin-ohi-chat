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
    // Assign random colors to users
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
    <div className="chat-room">
      <div className="messages">
        {messages.map((msg, index) => {
          const bubbleColor = userColors[msg.user] || 'gray'; // Use the color assigned to the user
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
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
