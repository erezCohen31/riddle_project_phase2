import path from 'path';
import { fileURLToPath } from 'url';
import MultipleChoiceRiddle from "./classes/MultipliChoiceRiddle.js"
import readline from 'readline-sync';
import { addRiddle, read, DeleteRiddleById, updateRiddle, readAll, findOrCreatePlayer, UpdateTimeOfPlayer } from "./utils/Import.js";

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
                    await RunRiddles(riddlesPath, player)
                    break;
                case "2":
                    await ModifyRiddlesMenu(riddlesPath)
                    break
                case "3":
                    isQuit = true
                    await ShowScore(playersPath)
                    break
                case "4":
                    isQuit = true
                    console.log(`bye bye`);
                    break
                default:
                    console.log("not a choice");

                    break;
            }
        }



    } catch (err) {
        console.error("An unexpected error occurred:", err.message);
    }
}

async function chooserRiddles(riddlesPath) {
    const riddles = await read(riddlesPath)
    const choosedRiddles = []

    for (let index = 0; index < 2; index++) {
        const randomIndex = Math.floor(Math.random() * riddles.length);
        const chosenRiddle = riddles[randomIndex];
        choosedRiddles.push(chosenRiddle);
        riddles.splice(randomIndex, 1);

    }
    return choosedRiddles;
}

async function RunRiddles(riddlesPath, player) {
    const choosenRiddles = await chooserRiddles(riddlesPath);

    for (const riddleData of choosenRiddles) {
        const riddle = new MultipleChoiceRiddle(riddleData)
        const time = riddle.startQuestion()
        console.log(` You took ${time} ms to answer.`);

        player.addTime(time)
    }
    player.showStats()

    const upperScore = await UpdateTimeOfPlayer(playersPath, player.id, player.totalTime())
    if (upperScore) {
        console.log(`Great job, ${player.name}!
New record! Time updated.`);


    }
    player.times = []

}

async function ModifyRiddlesMenu(riddlesPath) {

    let isQuit = false

    while (!isQuit) {
        console.log(`1. Create a new riddle`);
        console.log(`2. Read all riddles`);
        console.log(`3. Update an existing riddle`);
        console.log(`4. Delete a riddle`);
        console.log(`5. Exit`);

        const choice = readline.question()


        switch (choice) {
            case "1":
                await addRiddle(riddlesPath)
                break;
            case "2":
                await readAll(riddlesPath);
                break
            case "3":
                const targetIdToUpdate = readline.question("enter id:\n")
                await updateRiddle(riddlesPath, Number(targetIdToUpdate))
                break
            case "4":
                const targetIdToDelete = readline.question("enter id:\n")
                await DeleteRiddleById(riddlesPath, Number(targetIdToDelete))
                break
            case "5":
                isQuit = true
                break

            default:
                console.log("not a choice");

                break;
        }
    }




}

async function ShowScore(playersPath) {
    const players = await read(playersPath);

    players.sort((a, b) => a.lowestTime - b.lowestTime);

    for (const player of players) {
        console.log(`${player.name}: ${player.lowestTime}`);
    }
}


