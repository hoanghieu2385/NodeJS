const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class ChannelStats extends Model {}

ChannelStats.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    channelId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'channels',
        key: 'channelId',
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    totalViews: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    totalLikes: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    subscriberCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'ChannelStats',
    tableName: 'channel_stats',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['channelId', 'date'],
      },
    ],
  }
);

module.exports = ChannelStats;
