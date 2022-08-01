import download from "downloadjs";

const DownloadPostAsFile = async (isVideo, displayUrl, videoUrl, fileName) => {
  if (isVideo) {
    let blob = await fetch(videoUrl).then(r => r.blob());
    download(blob, `${fileName}_video_by_grambuddy.mp4`, "video");
  } else {
    let blob = await fetch(displayUrl).then(r => r.blob());
    download(blob, `${fileName}_image_by_grambuddy.jpeg`, "image/jpeg");
  }
};

export default DownloadPostAsFile;
