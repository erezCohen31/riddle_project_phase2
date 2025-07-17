import RiddleDAL from "../DAL/RiddleDAL.js";
import Riddle from "../Models/Riddle.js";


export async function addRiddle({ name, taskDescription, correctAnswer, choices }) {
    try {
        const countRiddles = await RiddleDAL.countRiddles();

        const newId = countRiddles > 0 ? countRiddles + 1 : 1;
        const newRiddle = new Riddle(newId, name.toString(), taskDescription.toString(), correctAnswer.toString(), choices.map(choice => choice.toString()));

        await RiddleDAL.addRiddle(newRiddle);

        return newRiddle;
    } catch (err) {
        console.error("Error adding riddle:", err.message);
        throw err;
    }
}

export async function DeleteRiddleById(id) {
    try {
        const riddleId = parseInt(id, 10);
        await RiddleDAL.deleteRiddleById(riddleId);
        console.log(`✅ Riddle with ID ${id} deleted successfully.`);
        return true;
    } catch (error) {
        console.error("❌ Error deleting riddle:", error.message);
        throw error;
    }
}

export async function readById(id) {
    try {
        const riddleId = parseInt(id, 10);
        const riddle = await RiddleDAL.getRiddleById(riddleId);

        return riddle;
    } catch (error) {
        console.error("Error reading riddle by ID:", error.message);
        throw error;
    }
}


export async function readAll() {
    try {
        const riddles = await RiddleDAL.getAllRiddles();
        return riddles || [];
    } catch (error) {
        console.error("Error reading riddles:", error);
        return [];
    }
}

export async function updateRiddle(id, updatedRiddle) {
    try {

        const riddleId = parseInt(id, 10);
        const result = await RiddleDAL.updateRiddle(riddleId, updatedRiddle);

        if (!result) {
            throw new Error("Failed to update the riddle");
        }

        console.log(`✅ Riddle with ID ${id} updated successfully.`);
        return result;
    } catch (error) {
        console.error("❌ Error updating riddle:", error.message);
        throw error;
    }
}




