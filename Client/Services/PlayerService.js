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
        const nameToDelete = readline.question('Enter the player name to delete: ').trim();
        const confirmation = readline.question(`Are you sure you want to delete player ${nameToDelete}? (y/n): `).trim().toLowerCase();

        if (confirmation !== 'y') {
            console.log("Deletion cancelled.");
            return null;
        }

        try {
            await PlayerController.deletePlayer(nameToDelete, token);
            console.log("Player deleted successfully.");
            return true;
        } catch (error) {
            console.error("Error deleting player:", error.message);
            return null;
        }

    },

    async updatePlayerTime(playerId, time, token) {
        return await PlayerController.updateTime(playerId, time, token);
    },

    async connect() {
        const name = readline.question("Enter your name:\n");
        const password = readline.question("Enter your password:\n");
        const player = await PlayerController.createOrFindPlayer(name, password);
        return player;
    },
    async changePlayerRole(token) {

        const name = readline.question("Enter the name of the player whose role you want to change:\n").trim();
        const newRole = readline.question("Enter the new role (e.g. user, admin):\n").trim();

        if (!['user', 'admin'].includes(newRole)) {
            console.log("Invalid role. Allowed roles: user, admin.");
            return null;
        }

        try {
            await PlayerController.updateRole(name, newRole, token);
            console.log(`Player role updated successfully to '${newRole}'.`);
            return true;
        } catch (error) {
            console.error("Error updating player role:", error.message);
            return null;
        }

    },

};

export default PlayerService;
