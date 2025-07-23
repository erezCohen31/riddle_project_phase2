import {
    findOrCreatePlayer,
    updatePlayerTime,
    getPlayerById,
    getAllPlayers,
    deletePlayer,
    getLeaderboard
} from '../Service/PlayerService.js';

const handleError = (res, error) => {
    console.error('Error:', error);
    const status = error.message.includes('not found') ? 404 : 500;
    res.status(status).json({
        error: error.message || 'Error in server'
    });
};

const PlayerController = {
    async createOrFind(req, res) {
        try {
            const { name } = req.body;

            if (!name || typeof name !== 'string' || name.trim() === '') {
                return res.status(400).json({ message: 'Valid name is required' });
            }

            const { player, created } = await findOrCreatePlayer(name.trim());
            if (created) {
                res.status(201).json({ message: "new player added", player });
            } else {
                res.status(200).json({ message: `welcome ${player.name}`, player })
            }
        } catch (error) {
            handleError(res, error);
        }
    },

    async updateTime(req, res) {
        try {
            const { id } = req.params;
            const { time } = req.body;

            if (time === undefined || time === null || isNaN(parseFloat(time))) {
                return res.status(400).json({ message: 'Valid time is required' });
            }

            const updated = await updatePlayerTime(parseInt(id), parseFloat(time));
            if (!updated) {
                return res.json({ message: 'time not updated' });
            }

            res.status(200).json({ message: 'Time updated successfully' });
        } catch (error) {
            handleError(res, error);
        }
    },

    async getPlayer(req, res) {
        try {
            const { id } = req.params;
            const player = await getPlayerById(parseInt(id));

            if (!player) {
                return res.status(404).json({ message: 'Player not found' });
            }

            res.status(200).json(player);
        } catch (error) {
            handleError(res, error);
        }
    },

    async getAllPlayers(req, res) {
        try {
            const players = await getAllPlayers();
            res.status(200).json(players);
        } catch (error) {
            handleError(res, error);
        }
    },


    async deletePlayer(req, res) {
        try {
            const { id } = req.params;
            const playerId = parseInt(id);

            const success = await deletePlayer(playerId);
            if (!success) {
                return res.status(500).json({ message: 'Failed to delete player' });
            }

            res.status(204).send();
        } catch (error) {
            handleError(res, error);
        }
    },

    async getLeaderboardController(req, res) {
        try {
            const { numbers: lineCountParam } = req.params;
            const lineCount = parseInt(lineCountParam, 10);
            const leaderboard = await getLeaderboard(lineCount);
            if (!leaderboard) {
                return res.status(500).json({ message: 'Failed to get the leaderboard' });

            }
            res.json(leaderboard);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get leaderboard' });
        }
    },
    async signupOrLogin(req, res) {
        const { name, password, role } = req.body;

        if (!name || !password) {
            return res.status(400).json({
                error: "The 'name' and 'password' fields are required."
            });
        }

        try {
            const { player, created } = await findOrCreatePlayer({ name, password, role });

            const message = created ? "Player successfully created" : "Login successful";
            return res.status(200).json({ message, player });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Server error."
            });
        }
    }

}

export default PlayerController;