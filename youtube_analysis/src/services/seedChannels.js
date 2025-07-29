const sequelize = require('../../config/database');
const Channel = require('../models/Channel');
const { channels } = require('../../config/channels');

const seedChannels = async () => {
  console.log('Starting channel seeding process...');
  try {
    await sequelize.sync({ alter: true });
    console.log("Synchronized 'Channel' model with the database.");

    const allChannels = Object.values(channels).flat();
    console.log(`Preparing to add/update ${allChannels.length} channels.`);

    await Channel.bulkCreate(allChannels, {
      updateOnDuplicate: ['name', 'description', 'image'], 
    });

    console.log('Channel seeding completed successfully!');
  } catch (error) {
    console.error('Error during channel seeding:', error);
  }
};

module.exports = seedChannels;
