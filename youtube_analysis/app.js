const { createInterface } = require('readline');
const pollNewVideos = require('./src/services/pollVideos');
const { sequelize } = require('./src/models');

const inputReader = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayMenu() {
  console.log('\n===== YOUTUBE MENU =====');
  console.log('1. Scan for new videos');
  console.log('2. Exit');
  console.log('=================================');

  inputReader.question('Enter your choice (1-2): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        console.log('\nStarting the scan...');
        pollNewVideos()
          .then(() => {
            console.log('\nScan finished.');
            displayMenu();
          })
          .catch((error) => {
            console.error('An error occurred during the scan:', error);
            displayMenu();
          });
        break;

      case '2':
        console.log('Exiting program. Goodbye!');
        inputReader.close();
        break;

      default:
        console.log('Invalid choice. Please enter 1 or 2.');
        displayMenu();
        break;
    }
  });
}

async function startApp() {
  try {
    await sequelize.sync({ alter: true });
    // console.log('Database synced.');

    await seedChannels();
    // console.log('Channels seeded.');

    displayMenu();
  } catch (error) {
    console.error('Startup error:', error);
    process.exit(1);
  }
}


startApp();
