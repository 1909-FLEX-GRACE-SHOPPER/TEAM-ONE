import React from 'react';
import Button from 'react-bootstrap/Button';

class PhotoGallery extends React.Component {
  constructor() {
    super();
    this.state = {
      filming: false
    };
    this.takePhoto = this.takePhoto.bind(this);
    this.transferVideo = this.transferVideo.bind(this);
    this.draw = this.draw.bind(this);
    this.insertText = this.insertText.bind(this);
  }
  componentDidMount() {
    const video = document.getElementById('video');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function(stream) {
          video.srcObject = stream;
          video.play();
          this.transferVideo('video-overlay');
        });
    }
  }
  insertText(canvasId, text) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.font = '48px serif';
    ctx.fillText(text, 10, 50);
  }
  draw(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }
  takePhoto(canvasId) {
    // Elements for taking the snapshot
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');
    const video = document.getElementById('video');
    context.drawImage(video, 0, 0, 640, 480);
  }
  transferVideo() {
    if (!this.state.filming) return;
    this.takePhoto('video-overlay');
    setTimeout(this.transferVideo, 0);
  }
  render() {
    return (
      <div id="photo-gallery">
        <div id="video-and-overlay">
          <video id="video" width="640" height="480" autoPlay />
          <canvas id="video-overlay" width="640" height="480" />
        </div>
        <div id="gallery-buttons-container">
          <Button
            id="snap"
            type="button"
            onClick={() => {
              this.takePhoto('photo-canvas');
            }}
          >
            Snap Photo
          </Button>
          <Button
            id="snap"
            type="button"
            onClick={() => {
              this.draw('video-overlay');
            }}
          >
            Draw
          </Button>
          <Button
            id="snap"
            type="button"
            onClick={() => {
              this.insertText('video-overlay', 'JUUL KING');
            }}
          >
            Insert Text
          </Button>
        </div>
        <canvas id="photo-canvas" width="640" height="480" />
      </div>
    );
  }
}

export default PhotoGallery;
