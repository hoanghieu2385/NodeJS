import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function Menu () {
    console.log('== MENU ==')
    console.log('1. Gold price')
    console.log('2. USD price')
    console.log('3. Exit')

    rl.question("Enter your choice: ", (choice) => {
        switch (choice) {
            case '1':
                console.log("SJC: 119,500 VNĐ / GOLD")
                break;

            case '2':
                console.log("1 USD = 26,115 VNĐ")
                break;

            case '3':
                console.log("Exiting..")
                rl.close();
                return;
        
            default:
                console.log("Please choice a valid input!!")
                break;
        };

        Menu();
    });
}

Menu();