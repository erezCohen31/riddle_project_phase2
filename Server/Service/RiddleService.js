import { read, write } from "../DAL/RiddleDAL.js";



export async function addRiddle({ name, taskDescription, correctAnswer, choices }) {
    try {
        const riddles = await read();

        if (!Array.isArray(riddles)) {
            throw new Error("Invalid data format: expected array");
        }

        const newId = riddles.length > 0
            ? Math.max(...riddles.map(r => typeof r.id === 'number' ? r.id : 0)) + 1
            : 1;
        const newRiddle = {
            id: newId,
            name: name.toString(),
            taskDescription: taskDescription.toString(),
            correctAnswer: correctAnswer.toString(),
            choices: choices.map(choice => choice.toString())
        };

        riddles.push(newRiddle);
        const succes = await write(riddles);
        if (succes) {
            console.log("New riddle added successfully!");
            return newRiddle;
        } else {
            return false
        }

    } catch (err) {
        console.error("Error adding riddle:", err.message);
        throw err;
    }
}

export async function DeleteRiddleById(id) {
    try {
        const riddles = await read();
        const riddleId = typeof id === 'string' ? parseInt(id, 10) : id;

        if (!Number.isInteger(riddleId)) {
            return null;
        }

        const toDelete = riddles.find(r => r.id === riddleId);
        if (!toDelete) {
            console.log(` No riddle found with ID ${riddleId}`);
            return false;
        }

        const newRiddles = riddles.filter(r => r.id !== riddleId);
        const success = await write(newRiddles);

        if (!success) {
            throw new Error("Failed to delete riddle");
        }

        console.log(`Riddle with ID ${riddleId} deleted successfully.`);
        return true;

    } catch (error) {
        console.error("Error deleting riddle:", error.message);
        throw error;
    }
}

export async function readById(id) {
    try {
        const riddles = await read();
        const riddleId = typeof id === 'string' ? parseInt(id, 10) : id;

        if (!Number.isInteger(riddleId)) {
            return null;
        }

        const riddle = riddles.find(r => r.id === riddleId);

        if (!riddle) {
            console.log(`No riddle found with ID ${riddleId}`);
        }

        return riddle;
    } catch (error) {
        console.error("Error reading riddle by ID:", error.message);
        throw error;
    }
}


export async function readAll() {
    try {
        const riddles = await read();
        return riddles || [];
    } catch (error) {
        console.error("Error reading riddles:", error);
        return [];
    }
}

export async function updateRiddle(id, updatedRiddle) {
    try {
        const riddles = await read();
        const riddleId = typeof id === 'string' ? parseInt(id, 10) : id;

        if (!Number.isInteger(riddleId)) {
            return null;
        }

        const index = riddles.findIndex(r => r.id === riddleId);
        if (index === -1) {
            console.log(`No riddle found with ID ${riddleId}`);
            return null;
        }

        const existingRiddle = riddles[index];

        const updatedRiddleData = {
            ...existingRiddle,
            ...updatedRiddle,
            id: existingRiddle.id
        };

        riddles[index] = updatedRiddleData;

        const success = await write(riddles);
        if (!success) {
            throw new Error("fail to updtae th riddle");
        }

        console.log(`Riddle with ID ${riddleId} updated successfully.`);
        return updatedRiddleData;

    } catch (error) {
        console.error("Error updating riddle:", error.message);
        throw error;
    }
}




