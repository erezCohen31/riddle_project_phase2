# 🧩 Riddle Game - Phase 2

An interactive web-based riddle game where players can test their problem-solving skills with various challenging riddles.

## ✨ Features

- **Player Management**: Registration, login, and performance tracking
- **Riddle System**: Question, answer, and timing management
- **Question Types**: Support for multiple-choice and open-ended questions
- **Performance Tracking**: Records best times and scores
- **User Interface**: Modern and intuitive user experience
- **RESTful API**: Client-server architecture with API communication

## 🚀 Installation

1. Make sure you have [Node.js](https://nodejs.org/) (version 16 or higher) installed
2. Clone this repository:
   ```bash
   git clone https://github.com/erezCohen31/riddle_project_phase2.git
   cd riddle_project_phase2
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the project root
   - Configure the necessary variables (PORT, DATABASE_URL, etc.)

5. Start the server:
   ```bash
   npm start
   ```

## 🏗️ Project Structure

```
riddle_project_phase2/
├── Client/                 # Client application
│   ├── Controller/        # Client controllers
│   ├── Services/          # Business services
│   └── GameManager.js     # Main game manager
├── Server/                # API Server
│   ├── Controller/        # API controllers
│   ├── Service/           # Business logic
│   └── Models/            # Data models
├── node_modules/          # Dependencies
├── package.json           # Project configuration
└── readme.md             # This file
```

## 🧩 How to Play

1. Register or log in to your account
2. Choose a riddle category
3. Answer questions within the time limit
4. Check your ranking and statistics

## 🛠️ Development

To contribute to the project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -am 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## 🙏 Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- All project contributors