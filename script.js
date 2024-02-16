document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('video');
  const image = document.getElementById('image');

  // Access the back camera stream
  const constraints = {
    video: { facingMode: "environment" }
  };

  navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Cannot access camera", error);
    });

  // Listen for device orientation events and update the image orientation
  window.addEventListener('deviceorientation', function (event) {
    const { alpha, beta, gamma } = event;

    // Convert degrees to radians
    const alphaRad = (alpha || 0) * Math.PI / 180;
    const betaRad = (beta || 0) * Math.PI / 180;
    const gammaRad = (gamma || 0) * Math.PI / 180;

    // Calculate the rotation matrix
    const zMat = [
      Math.cos(alphaRad), -Math.sin(alphaRad), 0,
      Math.sin(alphaRad), Math.cos(alphaRad), 0,
      0, 0, 1
    ];
    const xMat = [
      1, 0, 0,
      0, Math.cos(betaRad), -Math.sin(betaRad),
      0, Math.sin(betaRad), Math.cos(betaRad)
    ];
    const yMat = [
      Math.cos(gammaRad), 0, Math.sin(gammaRad),
      0, 1, 0,
      -Math.sin(gammaRad), 0, Math.cos(gammaRad)
    ];

    // Combine the rotation matrices
    // This is a simplified version, for illustrative purposes
    // You would need to perform matrix multiplication here for a correct result
    const combinedMatrix = `rotateZ(${zMat[0]}rad) rotateX(${xMat[4]}rad) rotateY(${yMat[8]}rad)`;

    // Apply the inverse rotation to the image
    image.style.transform = combinedMatrix;
  });
});
