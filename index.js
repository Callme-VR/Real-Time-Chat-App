// index.js (Backend)


const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server);

// serve frontend files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Dummy users (replace with DB later)
const users = {
  "anshika":1108,
  "Akansha": "4560",
  "Akash": "8909",
  "mayank":"786"
};

io.on("connection", (socket) => {
  console.log("🔗 New client connected:", socket.id);

  socket.on('login', ({ username, password }, callback) => {
    if (users[username] && users[username] === password) {
      socket.username = username;
      callback({ success: true });
      console.log(`✅ ${username} logged in`);
    } else {
      callback({ success: false, message: 'Invalid credentials' });
    }
  });

  socket.on('join-room', (roomName, callback) => {
    if (!socket.username) {
      return callback({ success: false, message: 'Login first' });
    }
    socket.join(roomName);
    socket.currentRoom = roomName;
    callback({ success: true, room: roomName });
    socket.to(roomName).emit("msg", `${socket.username} joined the room.`);
    console.log(`📂 ${socket.username} joined room: ${roomName}`);
  });


  socket.on("user-message", (msg) => {
    if (socket.currentRoom) {
      const time = new Date().toLocaleTimeString();
      io.to(socket.currentRoom).emit(
        "msg",
        `[${time}] ${socket.username}: ${msg}`
      );
      console.log(`💬 [${socket.currentRoom}] ${socket.username}: ${msg}`);
    } else {
      socket.emit("msg", "❗ Join a room first");
    }
  });

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
});

server.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
