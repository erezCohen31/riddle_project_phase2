import express from "express";
import RiddleController from "./Controller/RiddleController.js";
import PlayerController from "./Controller/PlayerController.js";

const app = express();
const PORT = 4546;

app.use(express.json());

app.get('/api/riddles', RiddleController.getAllRiddles);
app.get('/api/riddles/:id', RiddleController.getRiddleById);
app.post('/api/riddles', RiddleController.createRiddle);
app.put('/api/riddles/:id', RiddleController.updateRiddle);
app.delete('/api/riddles/:id', RiddleController.deleteRiddle);

app.get('/api/players', PlayerController.getAllPlayers);
app.get('/api/players/:id', PlayerController.getPlayer);
app.post('/api/players', PlayerController.createOrFind);
app.put('/api/players/:id/time', PlayerController.updateTime);
app.delete('/api/players/:id', PlayerController.deletePlayer);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.get('/api/status', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
});