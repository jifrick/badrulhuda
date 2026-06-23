const sharp = require('sharp');
const path = require('path');

// The original image is 904x1280.
// The QR code appears to be roughly square in the upper portion.
// Based on inspection: QR code content starts at ~x=48, y=48
// and the QR code itself ends at approximately y=900 (square portion)
// Width of content: 804px. Height of QR code only: ~804px (square).
// We crop a 834x834 square starting from (33, 33) to get just the QR.

sharp(path.join(__dirname, 'qr code bdr.jpeg'))
  .extract({ left: 33, top: 33, width: 834, height: 834 })
  .webp({ quality: 92 })
  .toFile(path.join(__dirname, 'public', 'images', 'qr-code-bdr.webp'))
  .then(info => {
    console.log('QR code (square) saved:', info);
  })
  .catch(err => console.error(err));
