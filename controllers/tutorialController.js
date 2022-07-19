const axios = require("axios");
const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const youtubeSearchApiUrl = "https://www.googleapis.com/youtube/v3/search";
const youtubeBaseUrl = "https://www.youtube.com";

class TutorialController {
  static async getNodejsTutorial(req, res, next) {
    try {
      const { data } = await axios.get(youtubeSearchApiUrl, {
        params: {
          part: "snippet",
          q: "nodejs tutorial",
          type: "video",
          order: "viewCount",
          maxResults: "20",
          key: youtubeApiKey,
        },
      });
      const nodejsTutorials = data.items.map((item) => {
        return {
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          channelTitle: item.snippet.channelTitle,
          channelUrl: `${youtubeBaseUrl}/channel/${item.snippet.channelId}`,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          videoUrl: `${youtubeBaseUrl}/watch?v=${item.id.videoId}`,
        };
      });

      res.status(200).json(nodejsTutorials);
    } catch (err) {
      next(err);
    }
  }

  static async getGolangTutorial(req, res, next) {
    try {
      const { data } = await axios.get(youtubeSearchApiUrl, {
        params: {
          part: "snippet",
          q: "golang tutorial",
          type: "video",
          order: "viewCount",
          maxResults: "20",
          key: youtubeApiKey,
        },
      });
      const phpTutorials = data.items.map((item) => {
        return {
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          channelTitle: item.snippet.channelTitle,
          channelUrl: `${youtubeBaseUrl}/channel/${item.snippet.channelId}`,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          videoUrl: `${youtubeBaseUrl}/watch?v=${item.id.videoId}`,
        };
      });

      res.status(200).json(phpTutorials);
    } catch (err) {
      next(err);
    }
  }

  static async getJavaTutorial(req, res, next) {
    try {
      const { data } = await axios.get(youtubeSearchApiUrl, {
        params: {
          part: "snippet",
          q: "java tutorial",
          type: "video",
          order: "viewCount",
          maxResults: "20",
          key: youtubeApiKey,
        },
      });
      const phpTutorials = data.items.map((item) => {
        return {
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          channelTitle: item.snippet.channelTitle,
          channelUrl: `${youtubeBaseUrl}/channel/${item.snippet.channelId}`,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          videoUrl: `${youtubeBaseUrl}/watch?v=${item.id.videoId}`,
        };
      });

      res.status(200).json(phpTutorials);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TutorialController;
