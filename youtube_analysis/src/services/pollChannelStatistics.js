const { google } = require('googleapis');
const { Channel, Video, ChannelStats, sequelize } = require('../models');
const { Op, where } = require('sequelize');
require('dotenv').config({
  path: require('path').resolve(__dirname, '../../.env'),
});

const youtubeApi = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

const START_DATE = new Date('2025-07-15');

async function pollChannelStatistics() {
  const listOfChannels = await Channel.findAll();

  for (const channel of listOfChannels) {
    try {
      const videosOfChannel = await Video.findAll({
        where: {
          channelId: channel.channelId,
          publishedAt: {
            [Op.gte]: START_DATE,
          },
        },
      });

      if (videosOfChannel.length === 0) {
        console.log("Don't find any video of channel", channel.name);
      }

      // Get video
      const videoIds = videosOfChannel
        .map((video) => video.videoId)
        .slice(0, 50);

      const statisticsResponse = await youtubeApi.videos.list({
        part: 'statistics',
        id: videoIds.join(','),
      });

      // calculate total views, likes
      let totalViews = 0;
      let totalLikes = 0;

      for (const videoData of statisticsResponse.data.items) {
        const statistics = videoData.statistics;
        totalViews += parseInt(statistics.viewCount || '0');
        totalLikes += parseInt(statistics.likeCount || '0');
      }

      // Get channel statistics to get subs
      const channelResponse = await youtubeApi.channels.list({
        part: 'statistics',
        id: channel.channelId,
      });

      const subscriberCount = parseInt(
        channelResponse.data.items?.[0]?.statistics?.subscriberCount || '0',
        10,
      );

      const today = new Date().toISOString().slice(0, 10);

      const [channelStatsRecord, wasCreated] = await ChannelStats.findOrCreate({
        where: {
          channelId: channel.channelId,
          date: today,
        },
        defaults: {
          totalViews: totalViews,
          totalLikes: totalLikes,
          subscriberCount: subscriberCount,
        },
      });

      if (wasCreated) {
        console.log(`\nSaved data for channel ${channel.name} on ${today}`);
      } else {
        console.log(
          `\nToday's metrics already exist for channel ${channel.name}`,
        );
      }

      console.log(
        `[LIVE statistics] ${channel.name} | Views: ${totalViews} | Likes: ${totalLikes} | Subs: ${subscriberCount}`,
      );
    } catch (error) {
      console.log('\nAn error when scanning channel', error.message);
    }
  }
}

module.exports = pollChannelStatistics;

if (require.main === module) {
  (async () => {
    try {
      await sequelize.sync();

      let currentDay = new Date().toISOString().slice(0, 10);
      await pollChannelStatistics();

      setInterval(async () => {
        let newDay = new Date().toISOString().slice(0, 10);

        if (newDay != currentDay) {
          await pollChannelStatistics();

          currentDay = newDay;
        }
      }, 60 * 1000);
    } catch (error) {
      console.log('An error when running: ', error);
    }
  })();
}
