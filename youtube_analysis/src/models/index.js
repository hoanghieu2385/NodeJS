const sequelize = require('../../config/database');
const Channel = require('./Channel');
const Video = require('./Video');
const ChannelStats = require('./ChannelStats');

Channel.hasMany(Video, {
  foreignKey: 'channelId',
  as: 'videos',
});

Video.belongsTo(Channel, {
  foreignKey: 'channelId',
  as: 'channel',
});

Channel.hasMany(ChannelStats, {
  foreignKey: 'channelId',
  as: 'stats',
});

ChannelStats.belongsTo(Channel, {
  foreignKey: 'channelId',
  as: 'channel',
});

module.exports = {
  sequelize,
  Channel,
  Video,
  ChannelStats,
};
