export default class Control {
  //
  constructor(customizations, videoPlayer) {
    this.customizations = customizations;
    this.videoPlayer = videoPlayer;
  }

  createHeaderControlPanel() {
    const headerControlPanelDiv = document.createElement("div");
    headerControlPanelDiv.classList.add("video-player__header-controls");
    return headerControlPanelDiv;
  }

  _getMuteUnmuteButton() {}

  _getReplayButton() {}

  _getPlayPauseButton() {}

  createFooterControlPanel() {
    const footerControlPanelDiv = document.createElement("div");
    footerControlPanelDiv.classList.add("video-player__footer-controls");
    footerControlPanelDiv.appendChild(this._getDragControl());
    footerControlPanelDiv.appendChild(this._getCloseControl());
    return footerControlPanelDiv;
  }

  _getDragControl(dragIconColor = "currentColor") {
    const mouseDownHandler = (e) => {
      e = e || window.event;
      e.preventDefault();

      // Remove the fixed position classes on the video player
      this.videoPlayer.classList.remove("video-player--topLeft");
      this.videoPlayer.classList.remove("video-player--topRight");
      this.videoPlayer.classList.remove("video-player--bottomLeft");
      this.videoPlayer.classList.remove("video-player--bottomRight");

      // Add a new class to set absolute position
      this.videoPlayer.classList.add("video-player");

      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = mouseUpHandler;
      // call a function whenever the cursor moves:
      document.onmousemove = mouseMoveHandler;
    };

    const mouseMoveHandler = (e) => {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      this.videoPlayer.style.top = this.videoPlayer.offsetTop - pos2 + "px";
      this.videoPlayer.style.left = this.videoPlayer.offsetLeft - pos1 + "px";
    };

    const mouseUpHandler = () => {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    };

    const dragDiv = document.createElement("div");
    dragDiv.classList.add("player-control--drag");
    dragDiv.addEventListener("onmousedown", mouseDownHandler);

    dragDiv.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill=${dragIconColor} class="bi bi-grip-horizontal double-flex" viewBox="0 0 16 16">
            <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>`;
    return dragDiv;
  }

  _getCloseControl(closeIconColor = "currentColor") {
    const closeHandler = (event) => {
      try {
        this.videoPlayer?.remove();
      } catch (err) {
        console.log("Can't close the video player");
      }
    };

    const closeDiv = document.createElement("div");
    closeDiv.classList.add("player-control--close");

    closeDiv.addEventListener("click", closeHandler);

    closeDiv.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill=${closeIconColor} class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>`;
    return closeDiv;
  }
}
