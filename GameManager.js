import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline-sync';
import { findOrCreatePlayer } from "./utils/Import.js";
import { runRiddles, ModifyRiddlesMenu } from "./Services/RiddleService.js";
import { showScore } from "./Services/PlayerService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const riddlesPath = path.join(__dirname, 'DB', 'riddles.txt');
const playersPath = path.join(__dirname, 'DB', 'players.txt');


export default async function RunMainMenu() {
    try {
        let isQuit = false
        const name = readline.question("enter your name:\n")
        const player = await findOrCreatePlayer(playersPath, name)
        console.log("Hello " + name);
        if (player.lowestTime > 0) {
            console.log(`Hi ${player.name}! Your previous lowest time was ${player.lowestTime} seconds.`);

        }

        while (!isQuit) {
            console.log(`1. To play`);
            console.log(`2. Modify riddles`);
            console.log(`3. Show scores`);
            console.log(`4. to quit`);

            const choice = readline.question()

            switch (choice) {
                case "1":
                    await runRiddles(riddlesPath, player, playersPath);
                    break;
                case "2":
                    await ModifyRiddlesMenu(riddlesPath)
                    break
                case "3":
                    await showScore(playersPath);
                    break;
                case "4":
                    isQuit = true
                    console.log(`bye bye`);
                    break
                default:
                    console.log("Not a valid choice");

                    break;
            }
        }



    } catch (err) {
        console.error("An unexpected error occurred:", err.message);
    }
}








