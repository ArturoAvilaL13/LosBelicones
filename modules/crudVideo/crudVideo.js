import {
    postVideoURL,
    getVideosURL,
    
  } from "./urlsVideo.js";

  async function postVideo(video) {
    try {
      const response = await axios.post(postVideoURL, video);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getVideos(videos) {
    try {
      const response = await axios.get(getVideosURL);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  export {
    postVideo,
    getVideos,
  };