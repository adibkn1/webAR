document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('video');
    const image = document.getElementById('image');
  
    // Access the camera stream
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
        })
        .catch(function (error) {
          console.error("Cannot access camera", error);
        });
    }
  
    // Listen for device orientation events
    window.addEventListener('deviceorientation', function (event) {
      const { alpha, beta, gamma } = event;
      // Alpha: rotation around z-axis
      // Beta: front-to-back tilt
      // Gamma: left-to-right tilt
      image.style.transform = `rotateZ(${-alpha}deg) rotateX(${-beta}deg) rotateY(${gamma}deg)`;
    });
  });
  