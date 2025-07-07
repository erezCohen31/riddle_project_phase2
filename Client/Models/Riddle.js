import readline from 'readline-sync';
export default class Riddle {
    constructor(data) {
        this.id = data.id
        this.name = data.name;
        this.taskDescription = data.taskDescription
        this.correctAnswer = data.correctAnswer
    }

    ask() {

        console.log(this.name);
        let isCorrect = false
        while (!isCorrect) {
            const answer = readline.question(this.taskDescription + "\n> ")
            if (answer.toLowerCase() === this.correctAnswer.toLowerCase()) {
                isCorrect = true
                console.log("Correct answer!");

            } else {
                console.log("Not correct, try again.");

            }

        }

    }
    startQuestion() {
        const start = Date.now()
        this.ask()
        const end = Date.now()

        return end - start
    }

}