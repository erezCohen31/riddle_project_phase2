import {
    findOrCreatePlayer,
    updatePlayerTime,
    getPlayerById,
    getAllPlayers,
    deletePlayer,
    getLeaderboard,
    updatePlayerRole
} from '../Service/PlayerService.js';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET

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
            const { name } = req.params;

            const decodeName = req.user.name;

            if (decodeName === name) {
                return res.status(403).json({ message: "You cannot delete yourself." });
            }
            const success = await deletePlayer(name);

            if (!success) {
                return res.status(404).json({ message: 'Player not found' });
            }

            res.status(204).send();
        } catch (error) {
            console.error('Error deleting player:', error);
            res.status(500).json({ message: error.message });
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
            const { player, created } = await findOrCreatePlayer(name, password, role ?? undefined);

            const token = jwt.sign(
                { id: player.id, name: player.name, role: player.role },
                SECRET,
                { expiresIn: "1h" }
            );
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'Strict',
            });
            const message = created ? "Player successfully created" : "Login successful";
            return res.status(200).json({ message, token, player });;
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Server error."
            });
        }
    },
    async updateRole(req, res) {
        try {
            const { name } = req.params;
            const { role } = req.body;

            const validRoles = ['user', 'admin'];
            if (!validRoles.includes(role)) {
                return res.status(400).json({ error: 'Invalid role. Allowed roles: user, admin.' });
            }

            const updatedPlayer = await updatePlayerRole(name, role);

            if (!updatedPlayer) {
                return res.status(404).json({ error: 'Player not found' });
            }

            res.json({
                message: 'Player role updated successfully',
                player: updatedPlayer
            });
        } catch (error) {
            console.error('Error updating player role:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }



}

export default PlayerController;