import readline from 'readline';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function getGoldPrice() {
	const url = 'http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v';

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const goldItems = data.DataList.Data;
			goldItems.forEach((items, index) => {
                const i = index + 1
				const name     = items[`@n_${i}`];
				const k        = items[`@k_${i}`];
				const content  = items[`@h_${i}`];
				const buy      = items[`@pb_${i}`];
				const sell     = items[`@ps_${i}`];
				const time_get = items[`@d_${i}`];

				console.log(`\nType of gold: ${name}`);
				console.log(`Content : ${Number(content).toLocaleString()} ` + `(${k})`);
				console.log(`Buy price: ${Number(buy).toLocaleString()} VND`);
				console.log(`Sell price: ${Number(sell).toLocaleString()} VND`);
				console.log(`Time: ${time_get}`);
			});
			Menu();
		})
		.catch((error) => {
			console.log('Error: ', error);
			Menu();
		});
}

function getUsdToVND() {
	const url = 'https://open.er-api.com/v6/latest/USD';

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
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
				getGoldPrice();
				return;

			case '2':
				getUsdToVND();
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
