const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class Video extends Model {}

Video.init(
  {
    videoId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    channelId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'channels',
        key: 'channelId',
      },
    },
  },
  {
    sequelize,
    modelName: 'Video',
    tableName: 'videos',
    timestamps: true,
    indexes: [
      {
        fields: ['channelId'],
      },
    ],
  }
);

module.exports = Video;
