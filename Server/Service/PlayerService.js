import { read, write } from "../DAL/PlayerDAL.js";

export async function findOrCreatePlayer(name) {
    try {
        const players = await read();
        let player = players.find(p => p.name === name);

        if (!player) {
            const newPlayer = {
                name: name,
                id: players.length + 1,
                lowestTime: 0
            };
            players.push(newPlayer);
            await write(players);
            console.log("New player added!");
            return newPlayer;
        } else {
            return player;
        }
    } catch (err) {
        console.error("Error in findOrCreatePlayer:", err.message);
        throw err;
    }
}

export async function updatePlayerTime(playerId, time) {
    try {
        const players = await read();
        const player = players.find(p => p.id === playerId);

        if (!player) {
            console.log("Player does not exist");
            return false;
        }



        if (player.lowestTime !== 0 && player.lowestTime <= time) {
            console.log(`Existing time is better or equal, no update.`);
            return false;
        }
        player.lowestTime = time


        await write(players);
        console.log(`Time updated for player ${player.name}: ${time}`);
        return true;
    } catch (err) {
        console.error("Error in updatePlayerTime:", err.message);
        throw err;
    }
}

export async function getPlayerById(playerId) {
    try {
        const players = await read();
        const player = players.find(p => p.id === playerId);
        return player || null;
    } catch (err) {
        console.error("Error in getPlayerById:", err.message);
        throw err;
    }
}

export async function getAllPlayers() {
    try {
        const players = await read();
        return players;
    } catch (err) {
        console.error("Error in getAllPlayers:", err.message);
        throw err;
    }
}


export async function deletePlayer(playerId) {
    try {
        const players = await read();
        const initialLength = players.length;
        const updatedPlayers = players.filter(p => p.id !== playerId);

        if (updatedPlayers.length === initialLength) {
            console.log(`No player found with id ${playerId}`);
            return false;
        }

        await write(updatedPlayers);
        console.log(`Player with ID ${playerId} deleted successfully`);
        return true;
    } catch (err) {
        console.error("Error deleting player:", err.message);
        throw err;
    }
}
export async function getLeadeboard(lineCount) {
    try {
        const players = await read();
        const leaderboard = players
            .filter(player => player.lowestTime !== 0)
            .map(player => ({
                name: player.name,
                time: player.lowestTime
            }));


        leaderboard.sort((a, b) => a.time - b.time);

        return typeof lineCount === 'number'
            ? leaderboard.slice(0, lineCount)
            : leaderboard;

    } catch (error) {
        console.error("Error retrieving the leaderboard:", error);
        throw error;
    }
}


