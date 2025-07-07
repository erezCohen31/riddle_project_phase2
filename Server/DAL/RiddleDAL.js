import readline from 'readline-sync';
import { read, write } from "../fileHelper.js";

export async function addRiddle(filePath) {
    try {
        const riddles = await read(filePath);
        const newRiddle = createRiddle(riddles);
        riddles.push(newRiddle);
        await write(filePath, riddles);

        console.log("New riddle added!");
    } catch (err) {
        console.error("Error:", err.message);
    }
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



export async function DeleteRiddleById(filePath, targetId) {
    try {
        const riddles = await read(filePath)
        const initialLength = riddles.length;
        const newRiddles = riddles.filter(riddle => riddle.id !== targetId);

        if (newRiddles.length === initialLength) {
            console.log(`No riddle found with id ${targetId}`);
        } else {
            await write(filePath, newRiddles);
            console.log(`Riddle with id ${targetId} deleted.`);

        }
    } catch (error) {
        console.error(error)
    }


}



export async function readById(filePath, riddleId) {
    try {
        const riddles = read(filePath)
        const riddle = riddles.find(riddle => riddle.id === riddleId);
        return riddle
    } catch (error) {
        console.error(error)
        return null;
    }
}

export async function readAll(filePath) {
    console.log("in finction readall");

    try {
        const riddles = await read(filePath)
        console.log(`riddle inside readall ${riddles}`);

        for (const riddle of riddles) {
            console.log(riddle);
        }
    } catch (error) {
        console.error(error)
        return null;
    }
}


export async function updateRiddle(filePath, targetId) {
    try {
        const riddles = await read(filePath);
        const riddlesChanged = changeRiddle(riddles, targetId);
        await write(filePath, riddlesChanged);
        console.log("Riddle updated successfully!");
    } catch (err) {
        console.error("Error:", err.message);
    }
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


const filePath = '../DB/riddles.txt';


