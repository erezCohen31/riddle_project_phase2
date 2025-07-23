import MultipleChoiceRiddle from '../Models/MultipliChoiceRiddle.js';
import readline from 'readline-sync';
import RiddleController from '../Controller/RiddleController.js';
import PlayerController from '../Controller/PlayerController.js';

const NUM_OF_CHOICES = 4;

const RiddleService = {
    async showAllRiddles(token) {
        try {
            const riddles = await RiddleController.getAllRiddles(token);
            console.log("\n=== Riddles ===");
            riddles.forEach(riddle => {
                console.log(`ID: ${riddle.id}`);
                console.log(`Name: ${riddle.name}`);
                console.log(`Task Description: ${riddle.taskDescription}`);
                console.log(`Correct Answer: ${riddle.correctAnswer}`);
                console.log(`Choices: ${riddle.choices.join(', ')}`);
                console.log("===========================\n");
            });
        } catch (error) {
            console.error('Error in showAllRiddles:', error.message);
            throw error;
        }
    },

    async chooserRiddles(token) {
        try {
            const count = readline.question("Enter the number of riddles: ");
            return await RiddleController.getNumOfRiddles(count, token);
        } catch (error) {
            console.error('Error in chooserRiddles:', error.message);
            throw error;
        }
    },

    async runRiddles(player, token) {
        try {
            const chosenRiddles = await this.chooserRiddles(token);
            let totalTime = 0;

            for (const riddleData of chosenRiddles) {
                const riddle = new MultipleChoiceRiddle(riddleData);
                const time = riddle.startQuestion();
                console.log(`You took ${time} ms to answer.`);
                totalTime += time;
            }

            const timeInSeconds = Math.round(totalTime / 1000);

            try {
                await PlayerController.updateTime(player.id, timeInSeconds, token);

                console.log(`\nTotal time for this round: ${timeInSeconds} seconds`);
                console.log(`Your best time so far: ${player.lowestTime} seconds`);
                console.log(`\nGreat job, ${player.name}!`);
            } catch (error) {
                console.error('\nWarning: Could not update your time on the server.');
                console.log(`Your time for this round was: ${timeInSeconds} seconds`);
            }
        } catch (error) {
            console.error('Error in runRiddles:', error.message);
            throw error;
        }
    },

    async createRiddle(token) {
        try {
            const name = readline.question("Category (e.g., Math, Logic, etc.): ").trim();
            const taskDescription = readline.question("Riddle question: ").trim();
            const correctAnswer = readline.question("Correct answer: ").trim();

            if (!name || !taskDescription || !correctAnswer) {
                throw new Error('All fields are required');
            }

            const choices = [];
            while (true) {
                for (let i = 0; i < NUM_OF_CHOICES; i++) {
                    const choice = readline.question(`Choice ${i + 1}: `).trim();
                    if (!choice) throw new Error('Choice cannot be empty');
                    choices.push(choice);
                }

                if (!choices.includes(correctAnswer)) {
                    console.log("Warning: The correct answer must be among the choices!");
                    choices.length = 0; // reset
                } else {
                    break;
                }
            }

            const riddle = { name, taskDescription, correctAnswer, choices };
            await RiddleController.addRiddle(riddle, token);
            console.log('Riddle created successfully!');
        } catch (error) {
            console.error('Error creating riddle:', error.message);
            throw error;
        }
    },

    async changeRiddle(token) {
        try {
            const targetId = readline.question('Enter riddle ID to update: ').trim();
            const field = readline.question("Field to change (name, taskDescription, correctAnswer, choices): ").trim();
            let newField;

            if (field === "choices") {
                const newChoices = [];
                for (let i = 0; i < NUM_OF_CHOICES; i++) {
                    const choice = readline.question(`Choice ${i + 1}: `).trim();
                    if (!choice) throw new Error('Choice cannot be empty');
                    newChoices.push(choice);
                }
                newField = { [field]: newChoices };
            } else {
                const newValue = readline.question(`New value for ${field}: `).trim();
                if (!newValue) throw new Error('Value cannot be empty');
                newField = { [field]: newValue };
            }

            await RiddleController.updateRiddle(targetId, newField, token);
            console.log("Riddle updated successfully.");
        } catch (error) {
            console.error('Error updating riddle:', error.message);
            throw error;
        }
    },

    async deleteRiddle(token) {
        try {
            const id = readline.question('Enter riddle ID to delete: ').trim();
            await RiddleController.deleteRiddle(id, token);
            console.log("Riddle deleted successfully.");
        } catch (error) {
            console.error('Error deleting riddle:', error.message);
            throw error;
        }
    }
};

export default RiddleService;
