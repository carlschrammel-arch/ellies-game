/**
 * Logo Processing Script
 * 
 * Processes a high-quality source logo into optimized variants for:
 * - Header: Wide format, transparent, optimized for ~36-40px height
 * - Icon: Square format, centered, for favicon/app icon
 * 
 * Usage:
 *   1. Drop your high-quality logo PNG into /assets/source/logo-source.png
 *   2. Run: npm run process-logo
 *   3. Outputs will be in /public/logo-header.png and /public/logo-icon.png
 * 
 * Requirements:
 *   npm install sharp --save-dev
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '..', 'assets', 'source');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

const SOURCE_LOGO = path.join(ASSETS_DIR, 'logo-source.png');

interface LogoConfig {
  outputPath: string;
  width?: number;
  height?: number;
  fit?: 'contain' | 'cover' | 'fill' | 'inside' | 'outside';
  background?: { r: number; g: number; b: number; alpha: number };
  description: string;
}

const logoConfigs: LogoConfig[] = [
  // Header logo - optimized for ~36-40px height display, but exported at 2x for retina
  {
    outputPath: path.join(PUBLIC_DIR, 'logo-header.png'),
    height: 80, // 2x for retina (displays at 40px)
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent
    description: 'Header logo (2x retina, displays at 40px height)',
  },
  // Icon - square format for favicon, 64x64 base + 128x128 for higher DPI
  {
    outputPath: path.join(PUBLIC_DIR, 'logo-icon-64.png'),
    width: 64,
    height: 64,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    description: 'Icon 64x64 (standard)',
  },
  {
    outputPath: path.join(PUBLIC_DIR, 'logo-icon-128.png'),
    width: 128,
    height: 128,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    description: 'Icon 128x128 (retina)',
  },
  {
    outputPath: path.join(PUBLIC_DIR, 'logo-icon-192.png'),
    width: 192,
    height: 192,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    description: 'Icon 192x192 (Android)',
  },
  {
    outputPath: path.join(PUBLIC_DIR, 'logo-icon-512.png'),
    width: 512,
    height: 512,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    description: 'Icon 512x512 (PWA)',
  },
  // Apple touch icon
  {
    outputPath: path.join(PUBLIC_DIR, 'apple-touch-icon.png'),
    width: 180,
    height: 180,
    fit: 'contain',
    background: { r: 254, g: 243, b: 199, alpha: 1 }, // Warm yellow background for iOS
    description: 'Apple Touch Icon 180x180',
  },
];

async function processLogo(): Promise<void> {
  console.log('🐻 Logo Processing Script\n');

  // Check if source file exists
  if (!fs.existsSync(SOURCE_LOGO)) {
    console.error(`❌ Source logo not found at: ${SOURCE_LOGO}`);
    console.log('\n📝 Instructions:');
    console.log('   1. Place your high-quality logo PNG at:');
    console.log(`      ${SOURCE_LOGO}`);
    console.log('   2. Run this script again: npm run process-logo');
    console.log('\n💡 Tip: Use a PNG with transparent background for best results.');
    process.exit(1);
  }

  console.log(`📂 Source: ${SOURCE_LOGO}`);
  console.log(`📂 Output: ${PUBLIC_DIR}\n`);

  // Get source image metadata
  const metadata = await sharp(SOURCE_LOGO).metadata();
  console.log(`📐 Source dimensions: ${metadata.width}x${metadata.height}`);
  console.log(`🎨 Format: ${metadata.format}, Channels: ${metadata.channels}\n`);

  // Process each configuration
  for (const config of logoConfigs) {
    try {
      const pipeline = sharp(SOURCE_LOGO);

      // Resize with appropriate options
      const resizeOptions: sharp.ResizeOptions = {
        fit: config.fit || 'contain',
        background: config.background,
      };

      if (config.width) resizeOptions.width = config.width;
      if (config.height) resizeOptions.height = config.height;

      await pipeline
        .resize(resizeOptions)
        .png({
          quality: 100,
          compressionLevel: 9,
        })
        .toFile(config.outputPath);

      // Get output file size
      const stats = fs.statSync(config.outputPath);
      const sizeKB = (stats.size / 1024).toFixed(1);

      console.log(`✅ ${config.description}`);
      console.log(`   → ${path.basename(config.outputPath)} (${sizeKB} KB)`);
    } catch (error) {
      console.error(`❌ Failed to process ${config.description}:`, error);
    }
  }

  // Create a "main" icon symlink/copy for convenience
  const mainIconSource = path.join(PUBLIC_DIR, 'logo-icon-128.png');
  const mainIconDest = path.join(PUBLIC_DIR, 'logo-icon.png');
  if (fs.existsSync(mainIconSource)) {
    fs.copyFileSync(mainIconSource, mainIconDest);
    console.log(`\n📎 Created logo-icon.png (copy of 128x128)`);
  }

  console.log('\n🎉 Logo processing complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Check the generated files in /public/');
  console.log('   2. Update index.html if needed for favicon references');
  console.log('   3. Test in browser at different zoom levels');
}

// Run the script
processLogo().catch(console.error);
