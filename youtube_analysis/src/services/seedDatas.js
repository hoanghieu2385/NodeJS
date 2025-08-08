const sequelize = require('../../config/database');
const { Channel, Category } = require('../models');
const { channels } = require('../../config/channels');

const seedChannels = async () => {
  console.log('Starting seeding process for categories and channels...');

  try {
    await sequelize.sync({ alter: true });
    console.log("Models synchronized with the database.");

    // Seed categories
    const categoryNames = Object.keys(channels);
    const categoryData = categoryNames.map((name) => ({ name }));

    await Category.bulkCreate(categoryData, {
      ignoreDuplicates: true,
    });

    console.log(`Inserted/Skipped ${categoryNames.length} categories.`);

    // Load category map
    const categoryRecords = await Category.findAll();
    const categoryMap = {};
    categoryRecords.forEach((cat) => {
      categoryMap[cat.name] = cat.id;
    });

    // Prepare and seed channels
    const allChannels = Object.values(channels).flat();

    const preparedChannels = allChannels.map((channel) => {
      const categoryId = categoryMap[channel.category];
      if (!categoryId) {
        throw new Error(`Category '${channel.category}' not found for channel '${channel.name}'`);
      }

      return {
        channelId: channel.channelId,
        name: channel.name,
        handle: channel.handle || null,
        url: channel.url || null,
        categoryId,
      };
    });

    await Channel.bulkCreate(preparedChannels, {
      updateOnDuplicate: ['name', 'handle', 'url', 'categoryId'],
    });

    console.log(`Inserted/Updated ${preparedChannels.length} channels.`);
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error.message || error);
  }
};

module.exports = seedChannels;
