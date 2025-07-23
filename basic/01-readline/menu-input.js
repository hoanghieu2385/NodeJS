import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function fetchGoldPricesFromBTMC() {
  const apiUrl = 'http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const goldItems = data.DataList.Data;
      goldItems.forEach((items, index) => {
        const itemIndex = index + 1;
        const goldTypeName = items[`@n_${itemIndex}`];
        const goldKarats = items[`@k_${itemIndex}`];
        const goldContent = items[`@h_${itemIndex}`];
        const buyPrice = items[`@pb_${itemIndex}`];
        const sellPrice = items[`@ps_${itemIndex}`];
        const timestamp = items[`@d_${itemIndex}`];

        console.log(`\nType of gold: ${goldTypeName}`);
        console.log(`Gold content : ${Number(goldContent).toLocaleString()} ` + `(${goldKarats})`);
        console.log(`Buy price: ${Number(buyPrice).toLocaleString()} VND`);
        console.log(`Sell price: ${Number(sellPrice).toLocaleString()} VND`);
        console.log(`Last updated: ${timestamp}`);
      });
      Menu();
    })
    .catch((error) => {
      console.log('An error occurred: ', error);
      Menu();
    });
}

function fetchUsdToVndExchangeRate() {
  const apiUrl = 'https://open.er-api.com/v6/latest/USD';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const exchangeRateVnd = data.rates['VND'];
      console.log(`1 USD = ${exchangeRateVnd} VND`);

      Menu();
    })
    .catch((error) => {
      console.log('An error occurred: ', error);
      Menu();
    });
}

function Menu() {
  console.log('\n== MENU ==');
  console.log('1. View Gold Prices');
  console.log('2. View USD to VND Exchange Rate');
  console.log('3. Exit');

  rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
      case '1':
        fetchGoldPricesFromBTMC();
        return;

      case '2':
        fetchUsdToVndExchangeRate();
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