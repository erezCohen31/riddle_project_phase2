import { read, write } from "../utils/fileHelper.js";
import Player from "../classes/Player.js";

export async function findOrCreatePlayer(filePath, name) {

    try {
        const players = await read(filePath);
        let player = players.find(player => player.name === name);

        if (!player) {
            player = new Player(name, players.length + 1, 0)

            players.push(player);

            await write(filePath, players);
            console.log("New player added!");
        } else {
            player = new Player(name, player.id, player.lowestTime)
        }

        return player;
    } catch (err) {
        console.error("Error:", err.message);
        return null;
    }
}


export async function UpdateTimeOfPlayer(filePath, id, time) {

    const players = await read(filePath)
    const player = players.find(player => player.id === id);
    if (!player) {
        console.log("player not exist");
        return false

    } else if (player.lowestTime !== 0 && player.lowestTime <= time) {
        console.log(`Existing time is better or equal, no update.`);
        return false

    } else {

        try {
            console.log("player in update" + player);

            player.lowestTime = time;
            await write(filePath, players);
            console.log(`Time updated for player ${player.name}: ${time}`);
            return true
        } catch (err) {
            console.error("Error:", err.message);
        }
    }
}
