import React, { useState } from 'react';
import ChatRoom from './components/ChatRoom';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [isInChat, setIsInChat] = useState(false);

  const handleJoinChat = () => {
    if (username.trim()) {
      setIsInChat(true);
    }
  };

  return (
    <div className="App">
      <h1>Nahin and Ohi's Chatroom</h1>
      {!isInChat ? (
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleJoinChat}>Join Chat</button>
        </div>
      ) : (
        <ChatRoom username={username} />
      )}
    </div>
  );
}

export default App;
