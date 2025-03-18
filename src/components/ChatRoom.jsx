import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, Box, Typography, Paper, Avatar } from '@mui/material';
import { io } from 'socket.io-client';

// Initialize socket connection
const socket = io('https://nahin-ohi-chat.onrender.com');

const ChatRoom = ({ username }) => {
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
    // Assign random color for each user
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 2,
      }}
    >
      {/* Chat Header */}
      <Paper
        sx={{
          backgroundColor: '#0078d4',
          padding: 2,
          textAlign: 'center',
          color: 'white',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">Chat with {username}</Typography>
      </Paper>

      {/* Messages */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          marginTop: 2,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.map((msg, index) => {
          const bubbleColor = userColors[msg.user] || '#0078d4';
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 1,
                justifyContent: msg.user === username ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.user !== username && (
                <Avatar
                  sx={{
                    backgroundColor: bubbleColor,
                    marginRight: 1,
                    width: 30,
                    height: 30,
                  }}
                >
                  {msg.user[0]}
                </Avatar>
              )}
              <Box
                sx={{
                  backgroundColor: msg.user === username ? bubbleColor : '#e5e5e5',
                  color: msg.user === username ? 'white' : 'black',
                  borderRadius: 2,
                  padding: 1,
                  maxWidth: '60%',
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
              </Box>
            </Box>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #ddd',
          padding: 2,
          backgroundColor: 'white',
        }}
      >
        <TextField
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          fullWidth
          variant="outlined"
          placeholder="Type a message"
          sx={{ borderRadius: 2 }}
        />
        <Button
          onClick={sendMessage}
          variant="contained"
          color="primary"
          sx={{ marginLeft: 1, borderRadius: 2 }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default function App() {
  const [username, setUsername] = useState('');
  const [isInChat, setIsInChat] = useState(false);

  const handleJoinChat = () => {
    if (username.trim()) {
      setIsInChat(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {!isInChat ? (
        <Box
          sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4">Welcome to the Chat</Typography>
          <TextField
            label="Enter your name"
            fullWidth
            variant="outlined"
            sx={{ marginTop: 2 }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleJoinChat}
          >
            Join Chat
          </Button>
        </Box>
      ) : (
        <ChatRoom username={username} />
      )}
    </Box>
  );
}
