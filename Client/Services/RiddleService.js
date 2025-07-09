import { read, UpdateTimeOfPlayer, addRiddle, DeleteRiddleById, updateRiddle, readAll } from '../utils/Import.js';
import MultipleChoiceRiddle from '../Models/MultipliChoiceRiddle.js';
import readline from 'readline-sync';


export async function chooserRiddles(riddlesPath) {
    try {
        const riddles = await read(riddlesPath);
        const choosenRiddles = [];

        for (let index = 0; index < 2; index++) {
            const randomIndex = Math.floor(Math.random() * riddles.length);
            const riddle = riddles.splice(randomIndex, 1)[0];
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
function createRiddle(riddles) {
    const name = readline.question("Category (e.g. Math, Logic, etc.): ");
    const taskDescription = readline.question("Riddle question: ");
    const correctAnswer = readline.question("Correct answer: ");

    let isInclude = false;
    const choices = [];

    while (!isInclude) {
        for (let i = 0; i < 4; i++) {
            const choice = readline.question(`Choice ${i + 1}: `);
            choices.push(choice);
        }

        if (!choices.includes(correctAnswer)) {
            console.log("Warning: The correct answer is not among the choices!");
            choices.length = 0
        } else {
            isInclude = true;
        }
    }


    const newRiddle = {
        id: riddles.length + 1,
        name,
        taskDescription,
        correctAnswer,
        choices
    };

    return newRiddle;
}
function changeRiddle(riddles, targetId) {

    const riddle = riddles.find(riddle => riddle.id === targetId);
    if (!riddle) {
        console.log(`No riddle found with id ${targetId}`);
        return riddles;
    }
    const fieldToChange = readline.question("What field do you want to change? (name, taskDescription, correctAnswer, choices): ");
    if (!(fieldToChange in riddle)) {
        console.log(`Field "${fieldToChange}" does not exist.`);
        return riddles;
    }
    if (fieldToChange === "choices") {
        const newChoices = [];
        for (let i = 0; i < 4; i++) {
            const choice = readline.question(`Choice ${i + 1}: `);
            newChoices.push(choice);
        }
        riddle[fieldToChange] = newChoices;
    } else {
        riddle[fieldToChange] = readline.question("enter the new value:")
    }
    return riddles
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