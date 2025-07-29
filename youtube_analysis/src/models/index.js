const sequelize = require('../../config/database');
const Channel = require('./Channel');
const Video = require('./Video');

Channel.hasMany(Video, {
  foreignKey: 'channelId',
  as: 'videos',
});

Video.belongsTo(Channel, {
  foreignKey: 'channelId',
  as: 'channel',
});

module.exports = {
  sequelize,
  Channel,
  Video,
};
