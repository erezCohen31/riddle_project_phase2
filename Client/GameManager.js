import readline from 'readline-sync';
import RiddleService from "./Services/RiddleService.js";
import PlayerService from "./Services/PlayerService.js";

export default async function RunMainMenu() {
    try {
        const { player, token } = await PlayerService.connect();
        console.log("Hello " + player.name);
        const role = player.role
        if (player.lowestTime > 0) {
            console.log(`Hi ${player.name}! Your previous lowest time was ${player.lowestTime} seconds.`);
        }

        let isQuit = false;

        while (!isQuit) {
            console.log(`\nMain Menu:`);
            console.log(`1. To play`);
            console.log(`2. Show scores`);
            if (player.role === 'admin' || player.role === 'user') {
                console.log(`3. Modify riddles`);
            }
            if (player.role === 'admin') {
                console.log(`4. Manage players`);
            }
            console.log(`q. Quit`);


            const choice = readline.question();

            switch (choice) {
                case "1":
                    await RiddleService.runRiddles(player, token);
                    break;
                case "2":
                    await PlayerService.showScore(token);
                    break;
                case "3":
                    if (player.role === 'admin' || player.role === 'user') {
                        await ModifyRiddlesMenu(role, token);
                    } else {
                        console.log("Unauthorized: You are not allowed to modify riddles.");
                    }
                    break;
                case "4":
                    if (player.role === 'admin') {
                        await ManagePlayersMenu(token);
                    } else {
                        console.log("Unauthorized: Only admins can manage players.");
                    }
                    break;
                case "q":
                    isQuit = true;
                    console.log(`Bye bye`);
                    break;

                default:
                    console.log("Not a valid choice");
            }
        }

    } catch (err) {
        console.error("An unexpected error occurred:", err.message);
    }
}

export async function ModifyRiddlesMenu(role, token) {
    let isQuit = false;

    while (!isQuit) {
        console.log('\n=== Riddle Management ===');
        console.log('1. Create a new riddle');
        console.log('2. Read all riddles');
        if (role === 'admin') {
            console.log('3. Update an existing riddle');
            console.log('4. Delete a riddle');
        }
        console.log('q. Exit\n');

        try {
            const choice = readline.question('Enter your choice: ').trim();

            switch (choice) {
                case '1':
                    await RiddleService.createRiddle(role, token);
                    break;
                case '2':
                    await RiddleService.showAllRiddles(role, token);
                    break;
                case '3':
                    if (role === 'admin') {
                        await RiddleService.changeRiddle(role, token);
                    } else {
                        console.log('Unauthorized: Only admins can update riddles.');
                    }
                    break;
                case '4':
                    if (role === 'admin') {
                        await RiddleService.deleteRiddle(role, token);
                    } else {
                        console.log('Unauthorized: Only admins can delete riddles.');
                    }
                    break;
                case 'q':
                    isQuit = true;
                    console.log('Exiting riddle management...');
                    break;
                default:
                    console.log('Invalid choice. Please enter a valid option.');
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
}


export async function ManagePlayersMenu(token) {
    let isQuit = false;

    while (!isQuit) {
        console.log('\n=== Player Management ===');
        console.log('1. Change a player\'s role');
        console.log('2. Delete a player');
        console.log('3. Exit\n');

        try {
            const choice = readline.question('Enter your choice (1-3): ').trim();

            switch (choice) {
                case '1':
                    await PlayerService.changePlayerRole(token);
                    break;
                case '2':
                    await PlayerService.deletePlayer(token);
                    break;
                case '3':
                    isQuit = true;
                    break;
                default:
                    console.log('Invalid choice. Please enter a number between 1 and 3.');
            }
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
}









