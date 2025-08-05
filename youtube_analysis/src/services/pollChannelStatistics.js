const { google } = require('googleapis');
const { Channel, Video, ChannelStats, sequelize } = require('../models');
const { Op } = require('sequelize');
require('dotenv').config({
  path: require('path').resolve(__dirname, '../../.env'),
});

const youtubeApi = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

const START_DATE = new Date('2025-07-15');

async function pollAndSaveStatistics() {
  const channels = await Channel.findAll();

  for (const channel of channels) {
    try {
      const videos = await Video.findAll({
        where: {
          channelId: channel.channelId,
          publishedAt: {
            [Op.gte]: START_DATE,
          },
        },
      });

      if (videos.length === 0) {
        console.log(`No videos found for channel: ${channel.name}`);
        continue;
      }

      const videoIds = videos.map(v => v.videoId).slice(0, 50);

      const videoStats = await youtubeApi.videos.list({
        part: 'statistics',
        id: videoIds.join(','),
      });

      let totalViews = 0;
      let totalLikes = 0;
      for (const video of videoStats.data.items) {
        const stats = video.statistics;
        totalViews += parseInt(stats.viewCount || '0', 10);
        totalLikes += parseInt(stats.likeCount || '0', 10);
      }

      const channelResponse = await youtubeApi.channels.list({
        part: 'statistics',
        id: channel.channelId,
      });

      const subscriberCount = parseInt(
        channelResponse.data.items?.[0]?.statistics?.subscriberCount || '0',
        10,
      );

      const today = new Date().toISOString().slice(0, 10);

      const [record, created] = await ChannelStats.findOrCreate({
        where: {
          channelId: channel.channelId,
          date: today,
        },
        defaults: {
          totalViews,
          totalLikes,
          subscriberCount,
        },
      });

      if (created) {
        console.log(`Data saved for channel ${channel.name} (${today})`);
      } else {
        console.log(`Data for channel ${channel.name} already exists for today.`);
      }
    } catch (error) {
      console.error(`Error scanning channel ${channel.name}: ${error.message}`);
    }
  }
}

async function showLiveStatistics() {
  const channels = await Channel.findAll();

  for (const channel of channels) {
    try {
      const videos = await Video.findAll({
        where: {
          channelId: channel.channelId,
          publishedAt: {
            [Op.gte]: START_DATE,
          },
        },
      });

      let totalViews = 0;
      let totalLikes = 0;

      if (videos.length > 0) {
        const videoIds = videos.map(v => v.videoId).slice(0, 50);
        const videoStats = await youtubeApi.videos.list({
          part: 'statistics',
          id: videoIds.join(','),
        });

        for (const video of videoStats.data.items) {
          const stats = video.statistics;
          totalViews += parseInt(stats.viewCount || '0', 10);
          totalLikes += parseInt(stats.likeCount || '0', 10);
        }
      }

      const channelResponse = await youtubeApi.channels.list({
        part: 'statistics',
        id: channel.channelId,
      });

      const subscriberCount = parseInt(
        channelResponse.data.items?.[0]?.statistics?.subscriberCount || '0',
        10,
      );

      console.log(`[LIVE] ${channel.name} | Views: ${totalViews} | Likes: ${totalLikes} | Subs: ${subscriberCount}`);
    } catch (error) {
      console.error(`Error fetching live stats for channel ${channel.name}: ${error.message}`);
    }
  }
  console.log('');
}

if (require.main === module) {
  (async () => {
    try {
      console.log('Connecting to database...');
      await sequelize.sync();
      console.log('Database connected.');

      // Run immediately
      await pollAndSaveStatistics();
      await showLiveStatistics();

      // Schedule live stats every 5 minutes
      setInterval(showLiveStatistics, 5 * 60 * 1000);
      console.log('Live statistics will update every 5 minutes.');

      // Schedule daily save at 23:00
      function scheduleDailySave() {
        const now = new Date();
        const nextRun = new Date();

        nextRun.setHours(23, 0, 0, 0);
        if (now > nextRun) {
          nextRun.setDate(nextRun.getDate() + 1);
        }

        const delay = nextRun - now;
        // console.log(`Next daily save scheduled at: ${nextRun.toLocaleString()}`);

        setTimeout(async () => {
          await pollAndSaveStatistics();
          scheduleDailySave();
        }, delay);
      }

      scheduleDailySave();
    } catch (error) {
      console.error('Error starting scheduler:', error.message);
      process.exit(1);
    }
  })();
}
