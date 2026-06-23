const sharp = require('sharp');
const path = require('path');

async function convert() {
  const inputPath = path.join(__dirname, 'public', 'gallerybdr', 'service1.jpg');
  const outputPath = path.join(__dirname, 'public', 'images', 'gallery', 'orphan_care.webp');
  try {
    await sharp(inputPath)
      .webp({ quality: 90 })
      .toFile(outputPath);
    console.log('Conversion successful:', outputPath);
  } catch (err) {
    console.error('Error converting image:', err);
  }
}

convert();
