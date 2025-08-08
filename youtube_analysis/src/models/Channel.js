const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class Channel extends Model {}

Channel.init(
  {
    channelId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    handle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Channel',
    tableName: 'channels',
    timestamps: true,
  }
);

module.exports = Channel;
