import PlayerController from '../Controller/PlayerController.js';
import readline from 'readline-sync';

const PlayerService = {
    async showScore(token) {
        const limit = readline.question("Enter number of players to show:\n");
        const leaderboard = await PlayerController.getLeaderboard(limit, token);
        console.log("\n=== Players Ranking ===");
        leaderboard.forEach(player => {
            console.log(`${player.name}: ${player.lowestTime} seconds`);
        });
        console.log("===========================\n");
    },

    async getPlayer(id, token) {
        return await PlayerController.getPlayer(id, token);
    },

    async getAllPlayers(token) {
        return await PlayerController.getPlayers(token);
    },

    async deletePlayer(token) {
        const id = readline.question("Enter the ID of the player to delete:\n");
        return await PlayerController.deletePlayer(id, token);
    },

    async updatePlayerTime(playerId, time, token) {
        return await PlayerController.updateTime(playerId, time, token);
    },

    async connect() {
        const name = readline.question("Enter your name:\n");
        const password = readline.question("Enter your password:\n");
        const player = await PlayerController.createOrFindPlayer(name, password);
        return player;
    }
};

export default PlayerService;
