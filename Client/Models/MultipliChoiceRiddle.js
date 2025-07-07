import Riddle from "./Riddle.js"
import readline from 'readline-sync';


export default class MultipleChoiceRiddle extends Riddle {
    constructor(data) {
        super(data)
        this.choices = data.choices
    }

    async ask() {
        try {
            console.log(this.name);
            console.log(this.taskDescription);

            this.choices.forEach((choice, index) => {
                console.log(`${index + 1}) ${choice}`);
            });

            let isCorrect = false;

            while (!isCorrect) {

                const answer = GetInput(this.choices)

                if (answer.toLowerCase() === this.correctAnswer.toLowerCase()) {
                    isCorrect = true;
                    console.log("Correct answer!");
                } else {
                    console.log("Not correct, try again.");
                }
            }
        } catch (err) {
            console.error("An error occurred while asking the riddle:", err.message);
        }
    }

}

function GetInput(choices) {
    let goodInput = false;
    let answer = "";
    while (!goodInput) {
        try {
            const input = readline.questionInt("Your choice: ");
            if (input > 0 && input <= 4) {
                goodInput = true;
                answer = choices[input - 1];
                return answer
            } else {
                console.log("Invalid choice, try again.");
            }
        } catch (err) {
            console.log("Please enter a valid number.");
        }
    }

}

