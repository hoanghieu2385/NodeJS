import readline from 'readline';

const inputReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function fetchGoldPricesFromBTMC() {
  const apiUrl = 'http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((responseData) => {
      const goldItems = responseData.DataList.Data;
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

      displayMenu();
    })
    .catch((error) => {
      console.log('An error occurred:', error);
      displayMenu();
    });
}

function fetchUsdToVndExchangeRate() {
  const apiUrl = 'https://open.er-api.com/v6/latest/USD';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((responseData) => {
      const exchangeRateToVND = responseData.rates['VND'];
      console.log(`\n1 USD = ${exchangeRateToVND} VND`);
      displayMenu();
    })
    .catch((error) => {
      console.log('An error occurred:', error);
      displayMenu();
    });
}

function displayMenu() {
  console.log('\n== MAIN MENU ==');
  console.log('1. View Gold Prices');
  console.log('2. View USD to VND Exchange Rate');
  console.log('3. Exit');

  inputReader.question('Enter your choice: ', (userChoice) => {
    switch (userChoice) {
      case '1':
        fetchGoldPricesFromBTMC();
        return;

      case '2':
        fetchUsdToVndExchangeRate();
        return;

      case '3':
        console.log('Exiting..');
        inputReader.close();
        return;

      default:
        console.log('Please choice a valid input!!');
        break;
    }
  });
}

displayMenu();