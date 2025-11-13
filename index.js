// index.js (Backend)

const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// serve frontend files from public folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('🔗 New client connected:', socket.id);

  socket.on('join-room', ({ username, roomName }, callback) => {
    if (!username) {
      return callback({ success: false, message: 'Username is required' });
    }
    socket.username = username;
    socket.join(roomName);
    socket.currentRoom = roomName;
    callback({ success: true, room: roomName });
    socket.to(roomName).emit('msg', `${socket.username} joined the room.`);
    console.log(`📂 ${socket.username} joined room: ${roomName}`);
  });

  socket.on('user-message', (msg) => {
    if (socket.currentRoom) {
      const time = new Date().toLocaleTimeString();
      io.to(socket.currentRoom).emit('msg', `[${time}] ${socket.username}: ${msg}`);
      console.log(`💬 [${socket.currentRoom}] ${socket.username}: ${msg}`);
    } else {
      socket.emit('msg', '❗ Join a room first');
    }
  });

  socket.on('disconnect', () => {
    if (socket.username && socket.currentRoom) {
      socket.to(socket.currentRoom).emit('msg', `${socket.username} left the room.`);
      console.log(`🔴 ${socket.username} left room ${socket.currentRoom}`);
    }
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

