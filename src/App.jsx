body {
  font-family: 'Arial', sans-serif;
  background-color: #2c2c54; /* Darker romantic background */
  color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.App {
  text-align: center;
  background-color: #ff6b81; /* Romantic pink */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.chat-room {
  margin-top: 20px;
}

.messages {
  border: 1px solid #ccc;
  padding: 10px;
  height: 200px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message.left {
  text-align: left;
}

.message.right {
  text-align: right;
}

input[type='text'] {
  padding: 10px;
  width: calc(100% - 22px);
  margin-bottom: 10px;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background-color: #ff4757; /* Slightly darker pink */
  border: none;
  color: white;
}

button:hover {
  background-color: #e84118; /* Darker hover effect */
}