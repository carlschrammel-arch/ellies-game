# 🎯 Swipe Quiz

A kid-friendly, web-based personality game for ~9-year-olds. Players share their favorite things, swipe through fun cards, and discover their personality type!

![Swipe Quiz Preview](https://via.placeholder.com/800x400?text=Swipe+Quiz+Preview)

## ✨ Features

- **Interactive Setup**: Enter your favorite things and pick categories
- **Fun Swipe Mechanics**: Drag cards left/right or use buttons
- **Personality Types**: 12 unique kid-friendly personality results
- **Accessibility**: Keyboard navigation, reduced motion support
- **Background Music**: Gentle elevator-style music loop
- **Confetti Celebration**: Fun animations on results!

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd swipe-quiz

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Environment Variables (Optional)

For real images from Unsplash, create a `.env` file:

```env
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

Without the API key, the app uses built-in placeholder images.

## 🛠️ Development

### Available Scripts

```bash
# Start development (frontend + backend)
npm run dev

# Start only frontend
npm run dev:client

# Start only backend
npm run dev:server

# Build for production
npm run build

# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e

# Lint code
npm run lint

# Format code
npm run format
```

### Project Structure

```
swipe-quiz/
├── public/
│   ├── placeholders/     # Fallback images (SVG)
│   └── favicon.svg
├── server/
│   └── index.ts          # Express API server
├── src/
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── SetupForm.tsx
│   │   ├── SwipeCard.tsx
│   │   ├── SwipeDeck.tsx
│   │   └── Results.tsx
│   ├── context/          # React contexts
│   │   ├── GameContext.tsx
│   │   └── SettingsContext.tsx
│   ├── data/
│   │   └── gameData.ts   # Categories, personality types, related terms
│   ├── hooks/
│   │   └── useAudio.ts   # Background music & sound effects
│   ├── test/             # Unit tests
│   ├── types/
│   │   └── index.ts      # TypeScript types
│   ├── utils/
│   │   └── scoring.ts    # Personality scoring logic
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── e2e/                  # Playwright e2e tests
└── package.json
```

## 🎨 Customization

### Adding New Personality Types

Edit `src/data/gameData.ts` and add to the `personalityTypes` array:

```typescript
{
  id: 'your-type-id',
  name: 'Your Type Name',
  emoji: '🌟',
  description: 'A fun description for kids...',
  traits: ['trait1', 'trait2', 'trait3'],
  suggestions: ['suggestion1', 'suggestion2', 'suggestion3', 'suggestion4', 'suggestion5'],
  color: 'from-blue-400 to-cyan-500', // Tailwind gradient classes
}
```

Then update `themeToPersonalityWeights` to map themes to your new type.

### Adding New Categories

Add to the `categories` array in `src/data/gameData.ts`:

```typescript
{ id: 'your-category', label: 'Your Category', emoji: '🎉' }
```

### Adding Related Terms

Update the `relatedTerms` object in `src/data/gameData.ts`:

```typescript
yourkeyword: ['related1', 'related2', 'related3', 'related4'],
```

### Adding Placeholder Images

1. Add your image to `public/placeholders/`
2. Update `server/index.ts` to include it in the `placeholderImages` array

## 🎵 Audio

The app uses Web Audio API to generate:
- Background "elevator music" (pentatonic melody loop)
- Swipe sound effects (ascending/descending tones)
- Celebration sounds (arpeggios on results)

Volume is set to 15% by default. Users can toggle music on/off.

## ♿ Accessibility

- **Keyboard Navigation**: Arrow keys for swiping, Ctrl+Z for undo
- **Reduced Motion**: Toggle in header, respects `prefers-reduced-motion`
- **Touch Targets**: Minimum 56px for all interactive elements
- **Screen Readers**: ARIA labels on all buttons

## 🧪 Testing

### Unit Tests (Vitest)

```bash
npm test
```

Tests cover:
- Keyword parsing
- Theme detection
- Score calculation
- Personality type matching

### E2E Tests (Playwright)

```bash
npm run test:e2e
```

Tests cover:
- Complete game flow
- Keyboard navigation
- Undo functionality
- Settings toggles

## 📦 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Express
- **Testing**: Vitest + Playwright

## 🔒 Content Safety

- No adult/dating language
- Basic content filter for Unsplash results
- Curated placeholder images
- Kid-friendly personality descriptions

## 📝 License

MIT License - feel free to use this for educational purposes!

---

Made with 💜 for curious kids everywhere!
