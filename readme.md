# 🧩 Riddle Game

A command-line riddle game where players can test their problem-solving skills with various challenging riddles.

## ✨ Features

- **Player Management**: Track player names and response times
- **Riddle System**: Manage questions, answers, and timing
- **Question Types**: Support for multiple-choice and open-ended questions
- **Performance Tracking**: Records best time for each player
- **Interactive Interface**: Simple navigation through a command-line menu

## 🚀 Installation

1. Make sure you have [Node.js](https://nodejs.org/) (version 14 or higher) installed
2. Clone this repository:
   ```bash
   git clone https://github.com/erezCohen31/riddle-project.git   
   cd riddle-project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the game:
   ```bash
   node app.js
   ```

## 🏗️ Project Structure

```
riddle-project/
├── app.js               # Main entry point
├── GameManager.js       # Main game manager
├── classes/             # Class definitions
│   ├── Player.js        # Player data management
│   └── Riddle.js        # Base riddle structure
├── managers/           
│   ├── PlayerManager.js # Player management
│   └── RiddleManager.js # Riddle management
├── utils/              
│   └── Import.js       # Riddle import utility
|   └── fileHelper.js   # File helper functions
├── DB/                 # Database files
│   ├── players.json    # Player data
│   └── riddles.json    # Riddles list
└── node_modules/       # Dependencies
```

## 🧩 How to Add New Riddles

1. Create a new file in the `DB/riddles/` directory
2. Export your riddle using the appropriate format
3. The riddle will be automatically loaded when the game starts

## 🛠️ Development

To contribute to the project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request