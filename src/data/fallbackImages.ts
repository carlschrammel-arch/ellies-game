/**
 * Fallback Images for Swipe Quiz
 * 
 * These are colorful placeholder images used when real photos aren't available.
 * Kid-friendly, bright colors with labels.
 */

// Color palette (kid-friendly, bright)
const colors = ['FF6B9D', 'A855F7', '34D399', 'FBBF24', '60A5FA', 'F97316'];

/**
 * Generate a colorful SVG placeholder for a label
 */
export function generateFallbackImage(label: string, width = 400, height = 300): string {
  // Pick a consistent color based on label hash
  const hash = label.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color = colors[hash % colors.length];
  
  // Truncate long labels
  const truncatedLabel = label.length > 25 ? label.substring(0, 22) + '...' : label;
  
  // Get an emoji based on common keywords
  const emoji = getEmojiForLabel(label);
  
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#${adjustColor(color, -30)};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="60" filter="url(#shadow)">
    ${emoji}
  </text>
  <text x="50%" y="70%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" filter="url(#shadow)">
    ${escapeXml(truncatedLabel)}
  </text>
</svg>`.trim();
  
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Adjust a hex color by a percentage
 */
function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + percent));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + percent));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + percent));
  return ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

/**
 * Escape special XML characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Get a relevant emoji for a label based on keywords
 */
function getEmojiForLabel(label: string): string {
  const lower = label.toLowerCase();
  
  // Animals
  if (lower.includes('dog') || lower.includes('puppy') || lower.includes('retriever')) return '🐕';
  if (lower.includes('cat') || lower.includes('kitten') || lower.includes('tabby')) return '🐱';
  if (lower.includes('panda')) return '🐼';
  if (lower.includes('fish') || lower.includes('nemo')) return '🐠';
  if (lower.includes('dinosaur') || lower.includes('rex')) return '🦖';
  if (lower.includes('bird') || lower.includes('parrot')) return '🦜';
  if (lower.includes('bunny') || lower.includes('rabbit')) return '🐰';
  if (lower.includes('horse') || lower.includes('unicorn')) return '🦄';
  if (lower.includes('dragon')) return '🐉';
  if (lower.includes('shark')) return '🦈';
  
  // Gaming
  if (lower.includes('minecraft')) return '⛏️';
  if (lower.includes('roblox')) return '🎮';
  if (lower.includes('pokemon') || lower.includes('pikachu')) return '⚡';
  if (lower.includes('mario')) return '🍄';
  if (lower.includes('fortnite')) return '🎯';
  if (lower.includes('controller') || lower.includes('gaming')) return '🎮';
  
  // Sports
  if (lower.includes('basketball') || lower.includes('dunk')) return '🏀';
  if (lower.includes('soccer') || lower.includes('football')) return '⚽';
  if (lower.includes('skateboard') || lower.includes('skate')) return '🛹';
  if (lower.includes('swim') || lower.includes('pool')) return '🏊';
  if (lower.includes('tennis')) return '🎾';
  if (lower.includes('hockey')) return '🏒';
  
  // Food
  if (lower.includes('pizza')) return '🍕';
  if (lower.includes('cake') || lower.includes('birthday')) return '🎂';
  if (lower.includes('ice cream') || lower.includes('sundae')) return '🍦';
  if (lower.includes('taco')) return '🌮';
  if (lower.includes('cookie')) return '🍪';
  if (lower.includes('donut') || lower.includes('doughnut')) return '🍩';
  if (lower.includes('sushi')) return '🍣';
  
  // Space
  if (lower.includes('rocket') || lower.includes('launch')) return '🚀';
  if (lower.includes('planet') || lower.includes('saturn')) return '🪐';
  if (lower.includes('star') || lower.includes('constellation')) return '⭐';
  if (lower.includes('moon')) return '🌙';
  if (lower.includes('astronaut')) return '👨‍🚀';
  if (lower.includes('alien') || lower.includes('ufo')) return '👽';
  
  // Music
  if (lower.includes('guitar')) return '🎸';
  if (lower.includes('piano') || lower.includes('keyboard')) return '🎹';
  if (lower.includes('drum')) return '🥁';
  if (lower.includes('music') || lower.includes('song')) return '🎵';
  if (lower.includes('microphone') || lower.includes('singing')) return '🎤';
  
  // Art
  if (lower.includes('paint') || lower.includes('art')) return '🎨';
  if (lower.includes('draw') || lower.includes('sketch')) return '✏️';
  if (lower.includes('rainbow')) return '🌈';
  if (lower.includes('sparkle') || lower.includes('glitter')) return '✨';
  
  // Nature
  if (lower.includes('flower') || lower.includes('garden')) return '🌸';
  if (lower.includes('tree') || lower.includes('forest')) return '🌲';
  if (lower.includes('beach') || lower.includes('ocean')) return '🏖️';
  if (lower.includes('mountain')) return '⛰️';
  
  // Tech
  if (lower.includes('robot')) return '🤖';
  if (lower.includes('computer') || lower.includes('code')) return '💻';
  if (lower.includes('phone')) return '📱';
  if (lower.includes('camera')) return '📸';
  
  // Magic & Fantasy
  if (lower.includes('wizard') || lower.includes('magic')) return '🧙';
  if (lower.includes('fairy')) return '🧚';
  if (lower.includes('mermaid')) return '🧜';
  if (lower.includes('princess') || lower.includes('castle')) return '🏰';
  
  // Default fun emojis
  const defaultEmojis = ['🌟', '💫', '🎪', '🎠', '🎡', '🎢', '🎨', '🎭'];
  return defaultEmojis[label.length % defaultEmojis.length];
}

/**
 * Check if a URL is likely to be a valid image
 */
export function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith('data:image')) return true;
  
  try {
    const urlObj = new URL(url);
    // Check for common image extensions or known image hosts
    const validHosts = ['unsplash.com', 'images.unsplash.com', 'picsum.photos', 'placehold.co'];
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    
    const hasValidHost = validHosts.some(host => urlObj.hostname.includes(host));
    const hasValidExtension = validExtensions.some(ext => urlObj.pathname.toLowerCase().endsWith(ext));
    
    return hasValidHost || hasValidExtension;
  } catch {
    return false;
  }
}

/**
 * Get an image URL with fallback
 */
export function getImageWithFallback(primaryUrl: string | undefined, label: string): string {
  if (primaryUrl && isValidImageUrl(primaryUrl)) {
    return primaryUrl;
  }
  return generateFallbackImage(label);
}
