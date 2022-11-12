import { TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT } from "./constants";
import Control from "./controls";

export default class VideoPlayer {
  constructor(videoConfig, customizations) {
    this.videoConfig = videoConfig;
    this.customizations = customizations;
    this.videoPlayer = null;
    this.controls = null;
  }

  createPlayer() {
    this.videoPlayer = document.createElement("div");
    this.videoPlayer.setAttribute("draggable", true);
    this._setVideoControlsInstance();
    this._setPlayerPosition();

    this.videoPlayer.appendChild(this._createPlayerHeader());
    this.videoPlayer.appendChild(this._createPlayerContent());
    this.videoPlayer.appendChild(this._createPlayerFooter());
  }

  _setVideoControlsInstance() {
    this.controls = new Control(this.customizations, this.videoPlayer);
  }

  _createPlayerHeader() {
    const videoPlayerHeader = document.createElement("div");
    videoPlayerHeader.classList.add("video-player__header");
    videoPlayerHeader.appendChild(this.controls.createHeaderControlPanel());
    return videoPlayerHeader;
  }

  _createPlayerContent() {
    const { videoSource, videoFormatType } = this.videoConfig;
    const videoElement = document.createElement("video");
    const sourceElement = document.createElement("source");

    //Set the video tag attributes
    sourceElement.setAttribute("src", videoSource);
    sourceElement.setAttribute("type", videoFormatType);

    videoElement.appendChild(sourceElement);

    return videoElement;
  }

  _createPlayerFooter() {
    const videoPlayerFooter = document.createElement("div");
    videoPlayerFooter.classList.add("video-player__footer");
    videoPlayerFooter.appendChild(this.controls.createFooterControlPanel());
    return videoPlayerFooter;
  }

  _setPlayerPosition() {
    const { videoPosition } = this.videoConfig;
    this.videoPlayer.classList.add("video-player");

    //Set the class on the video player based on the postion in the configuration
    switch (videoPosition) {
      case TOP_LEFT:
        this.videoPlayer.classList.add("video-player--topLeft");
        break;
      case TOP_RIGHT:
        this.videoPlayer.classList.add("video-player--topRight");
        break;
      case BOTTOM_LEFT:
        this.videoPlayer.classList.add("video-player--bottomLeft");
        break;
      case BOTTOM_RIGHT:
        this.videoPlayer.classList.add("video-player--bottomRight");
        break;
      default:
        this.videoPlayer.classList.add("video-player--bottomRight");
        break;
    }
  }
}
