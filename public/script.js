const socket = io();

const loginSection = document.getElementById('loginSection');
const joinSection = document.getElementById('joinSection');
const chatSection = document.getElementById('chatSection');
const messageInput = document.getElementById('messageInput');

const loginUsernameInput = document.getElementById('loginUsername');
const loginPasswordInput = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');
const loginStatus = document.getElementById('loginStatus');

const roomNameInput = document.getElementById('roomName');
const joinBtn = document.getElementById('joinBtn');
const joinStatus = document.getElementById('joinStatus');

const setupEnterKey = (input, button) => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') button.click();
  });
};

setupEnterKey(loginUsernameInput, loginBtn);
setupEnterKey(loginPasswordInput, loginBtn);
setupEnterKey(roomNameInput, joinBtn);
setupEnterKey(messageInput, document.getElementById('sendBtn'));

// Login handler
loginBtn.onclick = () => {
  const username = loginUsernameInput.value.trim();
  const password = loginPasswordInput.value.trim();

  if (!username || !password) {
    loginStatus.textContent = 'Username and password are required.';
    return;
  }

  socket.emit('login', { username, password }, (res) => {
    if (res.success) {
      loginSection.classList.add('hidden');
      joinSection.classList.remove('hidden');
      loginStatus.textContent = '';
    } else {
      loginStatus.textContent = res.message || 'Login failed.';
    }
  });
};

joinBtn.onclick = () => {
  const roomName = roomNameInput.value.trim();

  if (!roomName) {
    joinStatus.textContent = 'Room name is required.';
    return;
  }

  socket.emit('join-room', roomName, (res) => {
    if (res.success) {
      joinSection.classList.add('hidden');
      chatSection.classList.remove('hidden');
      messageInput.focus();
    } else {
      joinStatus.textContent = res.message || 'Failed to join room.';
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