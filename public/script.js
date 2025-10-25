const socket = io();

const loginSection = document.getElementById('loginSection');
const roomSection = document.getElementById('roomSection');
const chatSection = document.getElementById('chatSection');
const messageInput = document.getElementById('messageInput');

// Add Enter key support for login
document.getElementById('password').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('loginBtn').click();
  }
});

// Add Enter key support for room join
document.getElementById('roomName').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('joinRoomBtn').click();
  }
});

// Add Enter key support for message sending
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    document.getElementById('sendBtn').click();
  }
});

document.getElementById('loginBtn').onclick = () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Basic validation
  if (!username || !password) {
    document.getElementById('loginStatus').textContent = 'Please enter both username and password';
    return;
  }

  socket.emit('login', { username, password }, (res) => {
    if (res.success) {
      loginSection.classList.add('hidden');
      roomSection.classList.remove('hidden');
      document.getElementById('roomName').focus();
    } else {
      document.getElementById('loginStatus').textContent = res.message || 'Login failed';
    }
  });
};

document.getElementById('joinRoomBtn').onclick = () => {
  const roomName = document.getElementById('roomName').value.trim();

  
  // Basic validation
  if (!roomName) {
    document.getElementById('roomStatus').textContent = 'Please enter a room name';
    return;
  }

  socket.emit('join-room', roomName, (res) => {
    if (res.success) {
      roomSection.classList.add('hidden');
      chatSection.classList.remove('hidden');
      messageInput.focus();
    } else {
      document.getElementById('roomStatus').textContent = res.message || 'Join failed';
    }
  });
};

document.getElementById('sendBtn').onclick = () => {
  const msg = messageInput.value.trim();
  if (msg) {
    socket.emit('user-message', msg);
    messageInput.value = '';
  }
};

socket.on('msg', (message) => {
  const box = document.getElementById('chatBox');
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const div = document.createElement('div');
  div.textContent = `[${time}] ${message}`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
});