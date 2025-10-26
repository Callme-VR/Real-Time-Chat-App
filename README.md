# Real-Time Chat Application

A modern, responsive chat application built with Node.js, Express, and Socket.IO that enables real-time communication between users in chat rooms.

## 🌟 Features

### Real-Time Communication
- Instant messaging with WebSocket technology
- Multi-room chat functionality
- User presence detection
- Real-time message broadcasting

### User Management
- Secure login system with username/password authentication
- Unique username enforcement
- Room joining/creation capabilities

### Modern UI/UX
- Clean black and white minimalist design
- Responsive layout for all device sizes
- Intuitive user interface with smooth interactions

### Technical Features
- Real-time message synchronization
- Automatic message scrolling
- Keyboard shortcuts (Enter to send)
- Error handling and validation

## 🛠️ Technology Stack

| Component | Technology | Purpose |
|----------|------------|---------|
| Frontend | HTML5, CSS3, JavaScript (ES6+) | User interface and client-side logic |
| Backend | Node.js, Express | Server management and static file serving |
| Real-time Communication | Socket.IO | WebSocket implementation for real-time messaging |
| Styling | Custom CSS | Responsive design and visual aesthetics |

## 📁 Project Structure

```
Real-Time-Chat-APP/
├── index.js                 # Main server file
├── package.json            # Project dependencies and metadata
├── public/                 # Frontend assets
│   ├── index.html          # Main HTML file
│   ├── style.css           # Styling
│   ├── script.js           # Client-side JavaScript
│   └── images/             # Image assets
│       └── chat-logo.svg   # Application logo
└── node_modules/           # Dependencies (auto-generated)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd Real-Time-Chat-APP-main
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the server:
   ```bash
   node index.js
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. Login with one of these test credentials:
   - Username: `anshika`, Password: `1108`
   - Username: `Akansha`, Password: `4560`
   - Username: `Akash`, Password: `8909`
   - Username: `mayank`, Password: `786`

## 🎮 Usage Guide

1. **Login**: Enter your username and password on the login screen
2. **Join/Create Room**: Enter a room name to join an existing room or create a new one
3. **Chat**: Type your message and press Enter or click Send to chat with others in the same room

## 🔧 Available Scripts

- `npm start` - Start the development server (add this to package.json)
- `node index.js` - Run the application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Socket.IO for real-time communication capabilities
- Express.js for server framework
- All contributors to this project