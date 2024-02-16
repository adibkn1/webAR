document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('video');
  const image = document.getElementById('image');
  let initialAlpha = null;
  let initialBeta = null;
  let initialGamma = null;

  // Access the camera stream, attempting to use the back camera
  const constraints = {
    video: { facingMode: "environment" }
  };

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (error) {
        console.error("Cannot access camera", error);
      });
  }

  // Listen for device orientation events
  window.addEventListener('deviceorientation', function (event) {
    if (initialAlpha === null) {
      // Set the initial values on first event
      initialAlpha = event.alpha;
      initialBeta = event.beta;
      initialGamma = event.gamma;
    }

    const alpha = event.alpha - initialAlpha;
    const beta = event.beta - initialBeta;
    const gamma = event.gamma - initialGamma;

    // Compensate for device rotation by applying the inverse transformation
    image.style.transform = `
      rotateZ(${-alpha}deg)
      rotateX(${-beta}deg)
      rotateY(${gamma}deg)
    `;
  });
});
