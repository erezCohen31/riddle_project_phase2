import { Op } from 'sequelize';
import Player from '../Models/Player.js';

const PlayerDAL = {
    async find(name) {
        return await Player.findOne({ where: { name } });
    },

    async create({ name, hashedPassword, role }) {
        return await Player.create({ name, hashedPassword, role });
    },

    async updatePlayerTimeIfLower(id, newTime) {
        try {
            const player = await Player.findOne({ where: { id } });
            if (!player) {
                console.log('Player not found');
                return null;
            }

            if (player.lowestTime === 0 || newTime < player.lowestTime) {
                player.lowestTime = newTime;
                await player.save();
                console.log(`Lowest time updated to ${newTime} for player ${player.name}`);
            } else {
                console.log('Existing lowest time is lower or equal, no update needed');
            }
            return true;
        } catch (error) {
            console.error('Error updating player time:', error);
            throw error;
        }
    },

    async getPlayerById(id) {
        try {
            return await Player.findByPk(id);
        } catch (error) {
            console.error('Error fetching player by ID:', error);
            throw error;
        }
    },

    async getAllPlayers() {
        try {
            return await Player.findAll();
        } catch (error) {
            console.error('Error fetching all players:', error);
            throw error;
        }
    },

    async deletePlayer(id) {
        try {
            const deletedCount = await Player.destroy({ where: { id } });
            return deletedCount > 0;
        } catch (error) {
            console.error('Error deleting player:', error);
            throw error;
        }
    },

    async getLeaderboard(lineCount) {
        try {
            const players = await Player.findAll({
                where: {
                    lowestTime: {
                        [Op.not]: 0
                    }
                },
                order: [['lowestTime', 'ASC']],
                limit: lineCount
            });

            return players;
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            throw error;
        }
    }
};

export default PlayerDAL;
