const socket = io();

const joinSection = document.getElementById('joinSection');
const chatSection = document.getElementById('chatSection');
const messageInput = document.getElementById('messageInput');

const usernameInput = document.getElementById('username');
const roomNameInput = document.getElementById('roomName');
const joinBtn = document.getElementById('joinBtn');
const joinStatus = document.getElementById('joinStatus');

const setupEnterKey = (input, button) => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') button.click();
  });
};

setupEnterKey(usernameInput, joinBtn);
setupEnterKey(roomNameInput, joinBtn);
setupEnterKey(messageInput, document.getElementById('sendBtn'));

joinBtn.onclick = () => {
  const username = usernameInput.value.trim();
  const roomName = roomNameInput.value.trim();

  if (!username || !roomName) {
    joinStatus.textContent = 'Username and room name are required.';
    return;
  }

  socket.emit('join-room', { username, roomName }, (res) => {
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