const { google } = require('googleapis');
const { Video } = require('../models');
const { channels } = require('../../config/channels.js');

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

const PUBLISHED_AFTER = '2025-07-15T00:00:00Z';

const videoExists = async (videoId) => {
  const video = await Video.findByPk(videoId);
  return !!video;
};

const addNewVideo = async (video) => {
  try {
    await Video.create(video);
    console.log(`Add new video: ${video.title} to Database successful`);
  } catch (error) {
    console.error(`Error when add video: ${video.videoId}:`, error.message);
  }
};

const pollNewVideos = async () => {
  console.log('\n===Scan new video ===');

  const allChannelIds = Object.values(channels)
    .flat()
    .map((channel) => channel.channelId);

  for (const channelId of allChannelIds) {
    console.log(`Scan channel: ${channelId}`);

    try {
      const response = await youtube.search.list({
        part: 'snippet',
        channelId: channelId,
        order: 'date',
        type: 'video',
        publishedAfter: PUBLISHED_AFTER,
        maxResults: 10,
      });

      const videos = response.data.items || [];

      if (videos.length === 0) {
        console.log(`No new videos found for: ${channelId}`);
        continue;
      }

      for (const item of videos) {
        const videoId = item.id.videoId;

        if (await videoExists(videoId)) {
          console.log(`Skipped (exists): ${item.snippet.title}`);
          continue;
        }

        const video = {
          videoId,
          channelId: item.snippet.channelId,
          title: item.snippet.title,
          description: item.snippet.description,
          publishedAt: new Date(item.snippet.publishedAt),
          thumbnailUrl: item.snippet.thumbnails.high.url,
        };

        await addNewVideo(video);
      }
    } catch (err) {
      console.error(`Error scanning channel ${channelId}:`, err.message);
    }
  }

  console.log('Scan end.');
};

module.exports = pollNewVideos;
