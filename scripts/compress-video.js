const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const ffmpeg = require("ffmpeg-static");

const inputPath = path.join(__dirname, "..", "public", "WhatsApp Video 2026-06-24 at 9.24.34 AM.mp4");
const outputDir = path.join(__dirname, "..", "public", "videos");
const outputPath = path.join(outputDir, "hero-bg.mp4");

async function main() {
  console.log("Checking source video...");
  if (!fs.existsSync(inputPath)) {
    console.error("Error: Input video not found at:", inputPath);
    process.exit(1);
  }

  // Create public/videos folder if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("Source video found. Compressing video and removing audio tracks...");
  
  // ffmpeg arguments:
  // -y : Overwrite output files without asking
  // -i : Input file path
  // -an : Disable audio recording (remove sound completely)
  // -vcodec libx264 : Use H.264 video codec
  // -crf 28 : Constant Rate Factor (H.264 compression rate, 28 is highly compressed and optimized for web backgrounds)
  // -preset medium : Encoding speed to compression ratio preset
  // -vf "scale='min(1280,iw)':-2" : Scale width to 1280px maintaining aspect ratio only if original is larger
  const cmd = `"${ffmpeg}" -y -i "${inputPath}" -an -vcodec libx264 -crf 28 -preset medium -vf "scale='min(1280,iw)':-2" "${outputPath}"`;
  
  console.log("Running command:", cmd);
  try {
    execSync(cmd, { stdio: "inherit" });
    console.log("Compression completed successfully!");
    console.log("Compressed video saved at:", outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const compressedSize = fs.statSync(outputPath).size;
    console.log(`Original Size: ${(originalSize / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`Compressed Size: ${(compressedSize / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`Reduction: ${((1 - compressedSize / originalSize) * 100).toFixed(1)}%`);
  } catch (err) {
    console.error("Compression command failed:", err);
    process.exit(1);
  }
}

main().catch(console.error);
