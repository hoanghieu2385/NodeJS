import { error } from 'console';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function get_gold_price() {
    const url = 'http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v'

    fetch (url) .then (response => response.json())
                .then (data => {
                    console.log("Data get form api: ", JSON.stringify(data, null, 4));
                    Menu();
                })
                .catch(error => {
                    console.log("Error: ", error);
                    Menu();
                })
}

function get_usd_price() {
    const url = 'https://open.er-api.com/v6/latest/USD'

    fetch (url) .then (response => response.json())
                .then (data => {
                    console.log("Data get form api: ", JSON.stringify(data, null, 4));
                    Menu();
                })
                .catch(error => {
                    console.log("Error: ", error);
                    Menu();
                })
}

function Menu () {
    console.log('== MENU ==')
    console.log('1. Gold price')
    console.log('2. USD price')
    console.log('3. Exit')

    rl.question("Enter your choice: ", (choice) => {
        switch (choice) {
            case '1':
                get_gold_price()
                return;

            case '2':
                get_usd_price();
                return;

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