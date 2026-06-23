const sharp = require('sharp');
const path = require('path');

sharp(path.join(__dirname, 'badrulhuda_qr_only.png'))
  .webp({ quality: 92 })
  .toFile(path.join(__dirname, 'public', 'images', 'qr-code-bdr.webp'))
  .then(info => {
    console.log('New QR code converted and saved:', info);
  })
  .catch(err => console.error(err));
