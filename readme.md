# Riddle Game - Phase 5

An interactive web-based riddle game where players can test their problem-solving skills with various challenging riddles.

## Features

- **Player Management**: User registration, login, and profile management
- **Riddle System**: Dynamic question loading and answer validation
- **Real-time Feedback**: Immediate response to user answers
- **Performance Tracking**: Records completion times and scores
- **Responsive Design**: Works on desktop and mobile devices
- **RESTful API**: Secure client-server communication

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 16 or higher)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/erezCohen31/riddle_project_phase2.git
   cd riddle_project_phase2
   ```

2. Install dependencies:
   ```bash
   # Install server dependencies
   cd Server
   npm install
   
   # Install client dependencies
   cd ../Client
   npm install
   ```

3. Environment Setup:
   Create a `.env` file in the project root with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. Start the application:
   ```bash
   # Start the server (from Server directory)
   npm start
   
   # In a new terminal, start the client (from Client directory)
   npm run dev
   ```

## Project Structure

```
riddle_project_phase2/
├── Client/                 # Frontend application
│   ├── Controller/        # Client-side controllers
│   ├── Services/          # API service layer
│   ├── Utils/             # Utility functions
│   ├── Views/             # UI components
│   └── GameManager.js     # Core game logic
│
├── Server/                # Backend API
│   ├── Config/            # Configuration files
│   ├── Controllers/       # Request handlers
│   ├── Middleware/        # Custom middleware
│   ├── Models/            # Database models
│   ├── Routes/            # API routes
│   └── Services/          # Business logic
│
├── .env                   # Environment variables
├── package.json           # Project configuration
└── readme.md             # This file
```

## How to Play

1. **Register** a new account or **login** if you already have one
2. **Select** a riddle category
3. **Read** each riddle carefully
4. **Submit** your answer before the time runs out
5. **Track** your progress and statistics in your profile
6. **Compete** with other players on the leaderboard

## API Endpoints

### Player Endpoints
- `POST /api/players/register` - Register a new player
- `POST /api/players/login` - Login existing player
- `GET /api/players/profile` - Get player profile

### Game Endpoints
- `GET /api/riddles` - Get all riddles
- `GET /api/riddles/:id` - Get a specific riddle
- `POST /api/riddles/verify` - Verify an answer
- `GET /api/scores` - Get leaderboard

## Development

### Prerequisites
- Node.js 16+
- MongoDB
- Git

### Setup
1. Fork and clone the repository
2. Install dependencies in both Client and Server directories
3. Create a `.env` file with required environment variables
4. Start the development servers

### Scripts
```bash
# Install dependencies
npm install

# Start development server (from Server directory)
npm run dev

# Run tests
npm test

# Lint code
npm run lint
```

### Contributing
1. Create a new branch for your feature
2. Make your changes
3. Write tests if applicable
4. Run linter and tests
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- All contributors who helped improve this project

## Contact

For any questions or suggestions, please open an issue or contact the project maintainers.