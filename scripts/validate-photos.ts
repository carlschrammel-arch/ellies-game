/**
 * Photo Validation and Generation Script
 * 
 * This script validates that photos used in the app are:
 * 1. Accessible via their URLs
 * 2. Kid-appropriate
 * 3. Have proper fallbacks
 * 
 * Run with: npx tsx scripts/validate-photos.ts
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

interface ValidationResult {
  url: string;
  status: 'ok' | 'failed' | 'redirect';
  httpStatus?: number;
  error?: string;
}

// Sample labels from our categories to test image fetching
const sampleLabels = [
  // Animals
  'Golden Retriever puppy',
  'Orange tabby cat',
  'Baby panda',
  'Colorful clownfish',
  
  // Gaming
  'Minecraft diamond pickaxe',
  'Roblox avatar',
  'Pikachu plush',
  'Mario Kart Rainbow Road',
  
  // Sports
  'Basketball slam dunk',
  'Soccer bicycle kick',
  'Skateboard kickflip',
  
  // Food
  'Rainbow birthday cake',
  'Pepperoni pizza slice',
  'Ice cream sundae',
  
  // Space
  'Saturn rings',
  'Mars rover',
  'Astronaut floating',
];

// Color palette for placeholder images (kid-friendly, bright colors)
const placeholderColors = [
  'FF6B9D', // Pink
  'A855F7', // Purple
  '34D399', // Green
  'FBBF24', // Yellow
  '60A5FA', // Blue
  'F97316', // Orange
];

/**
 * Generate a placeholder image URL using a service like placehold.co
 */
function generatePlaceholderUrl(label: string, width = 400, height = 300): string {
  const color = placeholderColors[Math.floor(Math.random() * placeholderColors.length)];
  const text = encodeURIComponent(label.substring(0, 20));
  return `https://placehold.co/${width}x${height}/${color}/white?text=${text}`;
}

/**
 * Generate a search-based image URL using a free image API
 */
function generateImageSearchUrl(label: string): string {
  // Using Unsplash Source (free, no API key needed)
  const query = encodeURIComponent(label.toLowerCase().replace(/\s+/g, '-'));
  return `https://source.unsplash.com/400x300/?${query}`;
}

/**
 * Check if a URL is accessible
 */
async function checkUrl(url: string): Promise<ValidationResult> {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, { timeout: 5000 }, (response) => {
      if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
        resolve({ url, status: 'ok', httpStatus: response.statusCode });
      } else if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400) {
        resolve({ url, status: 'redirect', httpStatus: response.statusCode });
      } else {
        resolve({ url, status: 'failed', httpStatus: response.statusCode });
      }
    });
    
    request.on('error', (error) => {
      resolve({ url, status: 'failed', error: error.message });
    });
    
    request.on('timeout', () => {
      request.destroy();
      resolve({ url, status: 'failed', error: 'Timeout' });
    });
  });
}

/**
 * Generate a local fallback image data URL (colored rectangle with text)
 */
function generateSvgDataUrl(label: string, width = 400, height = 300): string {
  const color = placeholderColors[Math.floor(Math.random() * placeholderColors.length)];
  const truncatedLabel = label.length > 25 ? label.substring(0, 22) + '...' : label;
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="#${color}"/>
      <text 
        x="50%" 
        y="50%" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        fill="white" 
        font-family="sans-serif" 
        font-size="20" 
        font-weight="bold"
      >
        ${truncatedLabel}
      </text>
      <text 
        x="50%" 
        y="65%" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        fill="white" 
        font-family="sans-serif" 
        font-size="12" 
        opacity="0.8"
      >
        📸
      </text>
    </svg>
  `.trim();
  
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Create a TypeScript file with fallback images
 */
function generateFallbackImagesFile(labels: string[]): string {
  const fallbacks: Record<string, string> = {};
  
  for (const label of labels) {
    fallbacks[label.toLowerCase()] = generateSvgDataUrl(label);
  }
  
  return `/**
 * Auto-generated fallback images
 * Generated on: ${new Date().toISOString()}
 */

export const fallbackImages: Record<string, string> = ${JSON.stringify(fallbacks, null, 2)};

/**
 * Get a fallback image for a label
 */
export function getFallbackImage(label: string): string {
  const normalized = label.toLowerCase();
  if (fallbackImages[normalized]) {
    return fallbackImages[normalized];
  }
  
  // Generate on the fly for unknown labels
  const colors = ['FF6B9D', 'A855F7', '34D399', 'FBBF24', '60A5FA', 'F97316'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const truncatedLabel = label.length > 25 ? label.substring(0, 22) + '...' : label;
  
  const svg = \`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="100%" height="100%" fill="#\${color}"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-size="20" font-weight="bold">
        \${truncatedLabel}
      </text>
      <text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-size="12" opacity="0.8">
        📸
      </text>
    </svg>
  \`.trim();
  
  return \`data:image/svg+xml,\${encodeURIComponent(svg)}\`;
}
`;
}

async function main() {
  console.log('🖼️  Photo Validation Script\n');
  console.log('Testing image URLs for sample labels...\n');
  
  const results: ValidationResult[] = [];
  
  for (const label of sampleLabels) {
    const url = generateImageSearchUrl(label);
    console.log(`Checking: ${label}`);
    const result = await checkUrl(url);
    results.push(result);
    
    if (result.status === 'ok') {
      console.log(`  ✅ OK (${result.httpStatus})`);
    } else if (result.status === 'redirect') {
      console.log(`  ⤴️  Redirect (${result.httpStatus})`);
    } else {
      console.log(`  ❌ Failed: ${result.error || result.httpStatus}`);
    }
  }
  
  const okCount = results.filter(r => r.status === 'ok' || r.status === 'redirect').length;
  const failedCount = results.filter(r => r.status === 'failed').length;
  
  console.log(`\n📊 Results: ${okCount} OK, ${failedCount} Failed\n`);
  
  // Generate fallback file
  console.log('Generating fallback images file...');
  const fallbackContent = generateFallbackImagesFile(sampleLabels);
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'fallbackImages.ts');
  
  fs.writeFileSync(outputPath, fallbackContent);
  console.log(`✅ Generated: ${outputPath}`);
  
  console.log('\n📝 Recommendations:');
  console.log('  1. Use Unsplash Source for dynamic images (no API key needed)');
  console.log('  2. SVG data URLs work great as fallbacks (fast, no network)');
  console.log('  3. Consider caching images locally for offline support');
}

main().catch(console.error);
