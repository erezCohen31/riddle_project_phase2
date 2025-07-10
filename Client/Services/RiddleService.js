import MultipleChoiceRiddle from '../Models/MultipliChoiceRiddle.js';
import readline from 'readline-sync';
import RiddleController from '../Controller/RiddleController.js';
import PlayerController from '../Controller/PlayerController.js';
const NUM_OF_CHOICES = 4
const RiddleService = {

    async showAllRiddles() {
        try {
            const riddles = await RiddleController.getAllRiddles();
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
    async chooserRiddles() {
        try {
            const riddles = await RiddleController.getAllRiddles();
            const choosenRiddles = [];
            const numOfChossen = readline.question("enter the number of riddles")
            for (let index = 0; index < numOfChossen; index++) {
                const randomIndex = Math.floor(Math.random() * riddles.length);
                const riddle = riddles.splice(randomIndex, 1)[0];
                choosenRiddles.push(riddle);
            }

            return choosenRiddles;
        } catch (error) {
            console.error('Error in chooserRiddles:', error.message);
            throw error;
        }
    },

    async runRiddles(player) {
        try {
            const chosenRiddles = await this.chooserRiddles();
            let totalTime = 0;

            for (const riddleData of chosenRiddles) {
                const riddle = new MultipleChoiceRiddle(riddleData);
                const time = riddle.startQuestion();
                console.log(`You took ${time} ms to answer.`);
                totalTime += time;
            }

            const timeInSeconds = Math.round(totalTime / 1000);

            try {
                await PlayerController.updateTime(player.id, timeInSeconds);

                try {
                    const updatedPlayer = await PlayerController.getPlayer(player.id);
                    console.log(`\nTotal time for this round: ${timeInSeconds} seconds`);
                    console.log(`Your best time so far: ${updatedPlayer.lowestTime} seconds`);
                } catch (error) {
                    console.log('\nCould not fetch updated player stats, but your time was recorded.');
                    console.log(`Your time for this round: ${timeInSeconds} seconds`);
                }

                console.log(`\nGreat job, ${player.name}!`);

            } catch (error) {
                console.error('\nWarning: Could not update your time on the server.');
                console.log(`Your time for this round was: ${timeInSeconds} seconds`);
                console.log('Your score may not have been saved. Please try again later.');
            }
        } catch (error) {
            console.error('Error in runRiddles:', error.message);
            throw error;
        }
    },

    async createRiddle() {
        try {
            const name = readline.question("Category (e.g., Math, Logic, etc.): ").trim();
            const taskDescription = readline.question("Riddle question: ").trim();
            const correctAnswer = readline.question("Correct answer: ").trim();

            if (!name || !taskDescription || !correctAnswer) {
                throw new Error('All fields are required');
            }

            let isInclude = false;
            const choices = [];

            while (!isInclude) {
                for (let i = 0; i < NUM_OF_CHOICES; i++) {
                    const choice = readline.question(`Choice ${i + 1}: `).trim();
                    if (!choice) {
                        throw new Error('Choice cannot be empty');
                    }
                    choices.push(choice);
                }

                if (!choices.includes(correctAnswer)) {
                    console.log("Warning: The correct answer must be among the choices!");
                    choices.length = 0;
                } else {
                    isInclude = true;
                }
            }
            const riddle = {
                name,
                taskDescription,
                correctAnswer,
                choices
            }
            await RiddleController.addRiddle(riddle)

        } catch (error) {
            console.error('Error creating riddle:', error.message);
            throw error;
        }
    },

    async changeRiddle() {
        try {

            const targetIdToUpdate = readline.question('Enter riddle ID to update: ').trim();
            const fieldToChange = readline.question("What field do you want to change? (name, taskDescription, correctAnswer, choices): ").trim();
            let newField
            if (fieldToChange === "choices") {
                const newChoices = [];
                for (let i = 0; i < NUM_OF_CHOICES; i++) {
                    const choice = readline.question(`Choice ${i + 1}: `).trim();
                    if (!choice) {
                        throw new Error('Choice cannot be empty');
                    }
                    newChoices.push(choice);
                }
                newField = { [fieldToChange]: newChoices };
            } else {
                const newValue = readline.question(`Enter the new value for ${fieldToChange}: `).trim();
                if (!newValue) {
                    throw new Error('Value cannot be empty');
                }
                newField = { [fieldToChange]: newValue };

            }
            await RiddleController.updateRiddle(targetIdToUpdate, newField)
        } catch (error) {
            console.error('Error updating riddle:', error.message);
            throw error;
        }
    },
    async deleteRiddle() {
        try {
            const targetIdToDelete = readline.question('Enter riddle ID to delete: ').trim();
            await RiddleController.deleteRiddle(targetIdToDelete)
        } catch (error) {
            console.error('Error deleting riddle:', error.message)
            throw error
        }


    }


};

export default RiddleService;