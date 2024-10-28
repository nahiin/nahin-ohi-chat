import React, { useState } from 'react';
import ChatRoom from './components/ChatRoom';
import './App.css';

function App() {
  const [username, setUsername] = useState('');

  return (
    <div className="App">
      <h1>Nahin and Ohi's Love Corner</h1>
      {!username ? (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUsername(username)}>Join Chat</button>
        </div>
      ) : (
        <ChatRoom username={username} />
      )}
    </div>
  );
}

export default App;