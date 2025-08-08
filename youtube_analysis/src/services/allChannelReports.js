const { Op } = require('sequelize');
const { Channel, Category, ChannelStats } = require('../models');

const startDate = new Date('2025-07-15');
const endDate = new Date('2025-07-25');

function calculateScore(viewCount, likeCount, subscriberCount) {
  return viewCount + likeCount * 50 + subscriberCount * 500;
}

async function generateRankingReport() {
  // Lấy tất cả thống kê trong khoảng thời gian: startDate -> endDate
  const statsList = await ChannelStats.findAll({
    where: {
      date: {
        [Op.between]: [startDate, endDate],
      },
    },
  });

  // Gom dữ liệu thống kê theo channelId
  const summaryByChannel = {};

  for (const stat of statsList) {
    const { channelId, totalViews, totalLikes, subscriberCount } = stat;

    if (!summaryByChannel[channelId]) {
      summaryByChannel[channelId] = {
        views: 0,
        likes: 0,
        subscribers: subscriberCount,
      };
    }

    summaryByChannel[channelId].views += totalViews;
    summaryByChannel[channelId].likes += totalLikes;
    summaryByChannel[channelId].subscribers = subscriberCount;
  }

  // Lấy thông tin kênh + category
  const channelList = await Channel.findAll({
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    ],
  });

  const result = [];

  for (const channel of channelList) {
    const channelData = summaryByChannel[channel.channelId];
    if (!channelData) continue;

    const score = calculateScore(channelData.views, channelData.likes, channelData.subscribers);

    result.push({
      name: channel.name,
      category: channel.category?.name || 'Unknown name',
      views: channelData.views,
      likes: channelData.likes,
      subscribers: channelData.subscribers,
      score,
    });
  }

  // Sắp xếp theo điểm
  result.sort((a, b) => b.score - a.score);

  // Gán thứ hạng 
  result.forEach((channel, index) => {
    channel.rank = index + 1;
  });

  console.log(JSON.stringify(result, null, 2));
}

if (require.main === module) {
  generateRankingReport().catch(console.error);
}
