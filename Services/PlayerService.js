import { read } from '../utils/Import.js';

export async function showScore(playersPath) {
    const players = await read(playersPath);

    players.sort((a, b) => a.lowestTime - b.lowestTime);

    console.log("\n=== Players Ranking ===");
    players.forEach((player, index) => {
        console.log(`${index + 1}. ${player.name}: ${player.lowestTime} secondes`);
    });
    console.log("===========================\n");
}


