import React from 'react';
import Button from 'react-bootstrap/Button';

class PhotoGallery extends React.Component {
  componentDidMount() {
    const video = document.getElementById('video');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function(stream) {
          video.srcObject = stream;
          video.play();
        });
    }
  }
  takePhoto() {
    // Elements for taking the snapshot
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const video = document.getElementById('video');
    context.drawImage(video, 0, 0, 640, 480);
  }
  render() {
    return (
      <div>
        <video id="video" width="640" height="480" autoPlay />
        <Button
          id="snap"
          type="button"
          onClick={() => {
            this.takePhoto();
          }}
        >
          Snap Photo
        </Button>
        <canvas id="canvas" width="640" height="480" />
      </div>
    );
  }
}

export default PhotoGallery;
