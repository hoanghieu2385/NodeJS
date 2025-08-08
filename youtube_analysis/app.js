const pollNewVideos = require('./src/services/pollVideos');
const seedData = require('./src/services/seedData');
const { sequelize } = require('./src/models');
const pollChannelStatistics = require('./src/services/pollChannelStatistics');

async function startApp() {
  try {
    await sequelize.sync({ alter: true });
    await seedChannels();
    // await pollNewVideos();
    // console.log('\nScan finished.');

    // await pollChannelStatistics();

    // process.exit(0);
  } catch (error) {
    console.error('Startup error:', error);
    process.exit(1);
  }
}

startApp();