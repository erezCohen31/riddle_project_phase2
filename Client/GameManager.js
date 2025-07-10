import readline from 'readline-sync';
import RiddleService from "./Services/RiddleService.js";
import PlayerService from "./Services/PlayerService.js";


export default async function RunMainMenu() {
    try {
        const player = await PlayerService.createOrFindPlayer()
        console.log("Hello " + player.name);
        if (player.lowestTime > 0) {
            console.log(`Hi ${player.name}! Your previous lowest time was ${player.lowestTime} seconds.`);

        }
        let isQuit = false

        while (!isQuit) {
            console.log(`1. To play`);
            console.log(`2. Modify riddles`);
            console.log(`3. Show scores`);
            console.log(`4. to quit`);

            const choice = readline.question()

            switch (choice) {
                case "1":
                    await RiddleService.runRiddles(player)
                    break
                case "2":
                    await ModifyRiddlesMenu()
                    break
                case "3":
                    await PlayerService.showScore()
                    break;
                case "4":
                    isQuit = true
                    console.log(`bye bye`);
                    break
                default:
                    console.log("Not a valid choice");

                    break;
            }
        }



    } catch (err) {
        console.error("An unexpected error occurred:", err.message);
    }

}
async function ModifyRiddlesMenu() {
    let isQuit = false;

    while (!isQuit) {
        console.log('\n=== Riddle Management ===');
        console.log('1. Create a new riddle');
        console.log('2. Read all riddles');
        console.log('3. Update an existing riddle');
        console.log('4. Delete a riddle');
        console.log('5. Exit\n');

        try {
            const choice = readline.question('Enter your choice (1-5): ').trim();

            switch (choice) {
                case '1':
                    await RiddleService.createRiddle();
                    console.log('Riddle created successfully!');
                    break;
                case '2':
                    await RiddleService.showAllRiddles();
                    break;
                case '3':
                    await RiddleService.changeRiddle();
                    break;
                case '4':
                    await RiddleService.deleteRiddle();
                    break;
                case '5':
                    isQuit = true;
                    console.log('Exiting riddle management...');
                    break;
                default:
                    console.log('Invalid choice. Please enter a number between 1 and 5.');
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
}








