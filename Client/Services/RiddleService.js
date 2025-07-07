import { read, UpdateTimeOfPlayer, addRiddle, DeleteRiddleById, updateRiddle, readAll } from '../utils/Import.js';
import MultipleChoiceRiddle from '../Models/MultipliChoiceRiddle.js';
import readline from 'readline-sync';


export async function chooserRiddles(riddlesPath) {
    try {
        const riddles = await read(riddlesPath);
        const choosenRiddles = [];

        for (let index = 0; index < 2; index++) {
            const randomIndex = Math.floor(Math.random() * riddles.length);
            const riddle = riddles.splice(randomIndex, 1)[0]; // enlève et récupère
            choosenRiddles.push(riddle);
        }

        return choosenRiddles;
    } catch (error) {
        console.error('Error choosing riddle:', error);
        throw error;
    }
}



export async function runRiddles(riddlesPath, player, playersPath) {
    const choosenRiddles = await chooserRiddles(riddlesPath);

    for (const riddleData of choosenRiddles) {
        const riddle = new MultipleChoiceRiddle(riddleData);
        const time = riddle.startQuestion();
        console.log(`You took ${time} ms to answer.`);
        player.addTime(time);
    }

    player.showStats();
    const upperScore = await UpdateTimeOfPlayer(playersPath, player.id, player.totalTime());

    if (upperScore) {
        console.log(`\nGreat job, ${player.name}!\nNew record! Time updated.`);
    }

    player.times = [];
}

export async function ModifyRiddlesMenu(riddlesPath) {

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