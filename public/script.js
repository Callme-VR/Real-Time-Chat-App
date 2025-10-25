const socket = io();

const loginSection = document.getElementById('loginSection');
const roomSection = document.getElementById('roomSection');
const chatSection = document.getElementById('chatSection');

document.getElementById('loginBtn').onclick = () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  socket.emit('login', { username, password }, (res) => {
    if (res.success) {
      loginSection.classList.add('hidden');
      roomSection.classList.remove('hidden');
    } else {
      document.getElementById('loginStatus').textContent = res.message || 'Login failed';
    }
  });
};

document.getElementById('joinRoomBtn').onclick = () => {
  const roomName = document.getElementById('roomName').value.trim();

  socket.emit('join-room', roomName, (res) => {
    if (res.success) {
      roomSection.classList.add('hidden');
      chatSection.classList.remove('hidden');
    } else {
      document.getElementById('roomStatus').textContent = res.message || 'Join failed';
    }
  });
};

document.getElementById('sendBtn').onclick = () => {
  const msg = document.getElementById('messageInput').value.trim();
  if (msg) {
    socket.emit('user-message', msg);
    document.getElementById('messageInput').value = '';
  }
};

socket.on('msg', (message) => {
  const box = document.getElementById('chatBox');
  const time = new Date().toLocaleTimeString();
  const div = document.createElement('div');
  div.textContent = `[${time}] ${message}`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
});
