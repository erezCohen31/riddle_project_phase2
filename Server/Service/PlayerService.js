import PlayerDAL from "../DAL/PlayerDAL.js";
import bcrypt from "bcrypt"

export async function findOrCreatePlayer(name, password, role = 'guest') {
    try {
        let player = await PlayerDAL.find(name);

        if (player) {
            const isMatch = await bcrypt.compare(password, player.hashedPassword);
            if (!isMatch) throw new Error("Incorrect password.");
            return { player, created: false };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createdPlayer = await PlayerDAL.create({ name, hashedPassword, role });
        return { player: createdPlayer, created: true };

    } catch (error) {
        console.error("Error in findOrCreatePlayer:", error.message);
        throw error;
    }
}

export async function updatePlayerTime(playerId, time) {
    try {
        await PlayerDAL.updatePlayerTimeIfLower(playerId, time);
        return true;
    } catch (error) {
        console.error({
            message: error.message
        });
        throw error;
    }
}

export async function getPlayerById(playerId) {
    try {
        return await PlayerDAL.getPlayerById(playerId);
    } catch (err) {
        console.error("Error in getPlayerById:", err.message);
        throw err;
    }
}

export async function getAllPlayers() {
    try {
        return await PlayerDAL.getAllPlayers();
    } catch (err) {
        console.error("Error in getAllPlayers:", err.message);
        throw err;
    }
}

export async function deletePlayer(playerId) {
    try {
        await PlayerDAL.deletePlayer(playerId);
        console.log(`Player with ID ${playerId} deleted successfully`);
        return true;
    } catch (err) {
        console.error("Error deleting player:", err.message);
        throw err;
    }
}

export async function getLeaderboard(lineCount) {
    try {
        return await PlayerDAL.getLeaderboard(lineCount);
    } catch (error) {
        console.error("Error retrieving the leaderboard:", error);
        throw error;
    }
}
