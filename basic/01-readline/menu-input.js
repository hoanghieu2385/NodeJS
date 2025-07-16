import { error, time } from 'console';
import readline from 'readline';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function get_gold_price() {
	const url = 'http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v';

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const goldItems = data.DataList.Data;
			goldItems.forEach((items, index) => {
				const name     = items[`@n_${index + 1}`];
				const k        = items[`@k_${index + 1}`];
				const content  = items[`@h_${index + 1}`];
				const buy      = items[`@pb_${index + 1}`];
				const sell     = items[`@ps_${index + 1}`];
				const time_get = items[`@d_${index + 1}`];

				console.log(`\nType of gold: ${name}`);
				console.log(`Content : ${Number(content).toLocaleString()} ` + `(${k})`);
				console.log(`Buy price: ${Number(buy).toLocaleString()} VND`);
				console.log(`Buy price: ${Number(sell).toLocaleString()} VND`);
				console.log(`Time: ${time_get}`);
			});
			Menu();
		})
		.catch((error) => {
			console.log('Error: ', error);
			Menu();
		});
}

function get_usd_price() {
	const url = 'https://open.er-api.com/v6/latest/USD';

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			// const usd = data.rates["USD"];
			const vnd = data.rates['VND'];
			console.log(`1 USD = ${vnd} VND`);

			Menu();
		})

		.catch((error) => {
			console.log('Error: ', error);
			Menu();
		});
}

function Menu() {
	console.log('\n== MENU ==');
	console.log('1. Gold price');
	console.log('2. USD price');
	console.log('3. Exit');

	rl.question('Enter your choice: ', (choice) => {
		switch (choice) {
			case '1':
				get_gold_price();
				return;

			case '2':
				get_usd_price();
				return;

			case '3':
				console.log('Exiting..');
				rl.close();
				return;

			default:
				console.log('Please choice a valid input!!');
				break;
		}

		Menu();
	});
}

Menu();
