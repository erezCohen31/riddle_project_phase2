import PlayerController from '../Controller/PlayerController.js';
import readline from 'readline-sync';

const PlayerService = {

    async showScore() {
        const limit = readline.question("enter number of player:\n")
        const leaderboard = await PlayerController.getLeaderboard(limit);
        console.log("\n=== Players Ranking ===");
        leaderboard.forEach(player => {
            console.log(`${player.name}: ${player.time} seconds`);
        });
        console.log("===========================\n");
    },
    async getPlayer(id) {
        const player = await PlayerController.getPlayer(id);
        return player;
    },
    async getAllPlayers() {
        const players = await PlayerController.getPlayers();
        return players;
    },
    async deletePlayer() {
        const id = readline.question("enter id of the player to delete:\n")
        const success = await PlayerController.deletePlayer(id);
        return success;
    },
    async updatePlayerTime(playerId, time) {
        const success = await PlayerController.updateTime(playerId, time);
        return success;
    },
    async createOrFindPlayer() {
        const name = readline.question("enter your name:\n")
        const player = await PlayerController.createOrFindPlayer(name);
        return player;
    }
}

export default PlayerService;
