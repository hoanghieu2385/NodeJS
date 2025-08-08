const { Op } = require('sequelize');
const { Channel, Category, ChannelStats } = require('../models');

const startDate = '2025-07-15';
const endDate = '2025-07-25';

function calculateScore(viewCount, likeCount, subscriberCount) {
  return viewCount + likeCount * 50 + subscriberCount * 500;
}

async function generateRankingByCategory() {
  // Lấy tất cả thống kê trong khoảng thời gian startDate -> endDate
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

  // Lấy danh sách kênh và category
  const channelList = await Channel.findAll({
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    ],
  });

  // Gom dữ liệu theo categoryId
  const rankingByCategory = {};

  for (const channel of channelList) {
    const channelData = summaryByChannel[channel.channelId];
    if (!channelData) continue;

    const categoryId = channel.category?.id || 'unknown id';
    const categoryName = channel.category?.name || 'Unknown category';

    if (!rankingByCategory[categoryId]) {
      rankingByCategory[categoryId] = {
        categoryName,
        channels: [],
      };
    }

    const score = calculateScore(
      channelData.views,
      channelData.likes,
      channelData.subscribers,
    );

    rankingByCategory[categoryId].channels.push({
      name: channel.name,
      views: channelData.views,
      likes: channelData.likes,
      subscribers: channelData.subscribers,
      score,
    });
  }

  // Sắp xếp và gán rank từng nhóm
  for (const categoryId in rankingByCategory) {
    const group = rankingByCategory[categoryId];
    group.channels.sort((a, b) => b.score - a.score);

    group.channels.forEach((channel, index) => {
      channel.rank = index + 1;
    });
  }

  for (const categoryId in rankingByCategory) {
    const group = rankingByCategory[categoryId];
    console.log(`\n===== Category: ${group.categoryName} =====`);
    console.log(JSON.stringify(group.channels, null, 2));
  }
}

if (require.main === module) {
  generateRankingByCategory().catch(console.error);
}
