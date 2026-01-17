import { Category, PersonalityType } from '../types';

// Available categories for selection (kid-friendly, modern, inclusive)
export const categories: Category[] = [
  { id: 'animals', label: 'Animals', emoji: '🐾' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'videogames', label: 'Video Games', emoji: '🎮' },
  { id: 'artcrafts', label: 'Art & Crafts', emoji: '🎨' },
  { id: 'music', label: 'Music', emoji: '🎵' },
  { id: 'moviestv', label: 'Movies & TV', emoji: '🎬' },
  { id: 'bookscomics', label: 'Books & Comics', emoji: '📚' },
  { id: 'foodtreats', label: 'Food & Treats', emoji: '🍕' },
  { id: 'outdoors', label: 'Outdoors & Adventure', emoji: '🏕️' },
  { id: 'techgadgets', label: 'Tech & Gadgets', emoji: '🤖' },
  { id: 'space', label: 'Space', emoji: '🚀' },
  { id: 'fantasymagic', label: 'Fantasy & Magic', emoji: '🦄' },
  { id: 'fashionstyle', label: 'Fashion & Style', emoji: '👗' },
  { id: 'collecting', label: 'Collecting', emoji: '🎴' },
  { id: 'buildinglego', label: 'Building & LEGO', emoji: '🧱' },
  { id: 'carsvehicles', label: 'Cars & Vehicles', emoji: '🚗' },
  { id: 'cutestuff', label: 'Cute Stuff', emoji: '🧸' },
  { id: 'puzzlesgames', label: 'Puzzles & Brain Games', emoji: '🧩' },
];

// Related terms mapping for building card decks
export const relatedTerms: Record<string, string[]> = {
  // Animals
  cats: ['kittens', 'lions', 'tigers', 'leopards', 'cheetahs', 'fluffy cats'],
  dogs: ['puppies', 'golden retrievers', 'huskies', 'beagles', 'poodles'],
  horses: ['ponies', 'unicorns', 'mustangs', 'horse riding', 'stable'],
  birds: ['parrots', 'eagles', 'owls', 'penguins', 'flamingos'],
  fish: ['goldfish', 'dolphins', 'whales', 'sharks', 'aquarium'],
  dinosaurs: ['t-rex', 'triceratops', 'fossils', 'prehistoric', 'jurassic'],
  rabbits: ['bunnies', 'carrots', 'fluffy pets', 'hop'],
  pandas: ['bamboo', 'bears', 'china', 'black and white'],
  elephants: ['safari', 'trunks', 'africa', 'big animals'],
  butterflies: ['caterpillars', 'flowers', 'gardens', 'colorful insects'],
  
  // Sports
  soccer: ['football', 'goals', 'cleats', 'stadium', 'world cup'],
  basketball: ['hoops', 'dribbling', 'slam dunk', 'court'],
  swimming: ['pool', 'diving', 'water sports', 'beach'],
  gymnastics: ['tumbling', 'balance beam', 'olympics', 'flips'],
  baseball: ['batting', 'home run', 'gloves', 'pitcher'],
  tennis: ['racket', 'wimbledon', 'court', 'volley'],
  skateboarding: ['skate park', 'tricks', 'wheels', 'ramps'],
  dancing: ['ballet', 'hip hop', 'jazz', 'rhythm'],
  running: ['track', 'marathon', 'jogging', 'sprinting'],
  
  // Video Games
  minecraft: ['building', 'crafting', 'blocks', 'survival', 'creepers'],
  roblox: ['avatars', 'games', 'multiplayer', 'building'],
  pokemon: ['pikachu', 'pokeball', 'trainers', 'battles', 'cards'],
  mario: ['nintendo', 'mushrooms', 'princess peach', 'luigi'],
  fortnite: ['battle royale', 'skins', 'building', 'squad'],
  zelda: ['link', 'hyrule', 'adventure', 'master sword'],
  
  // Building & LEGO
  lego: ['building blocks', 'construction', 'sets', 'minifigures'],
  puzzles: ['jigsaw', 'brain teasers', 'riddles', 'thinking'],
  boardgames: ['monopoly', 'chess', 'checkers', 'family game night'],
  
  // Food & Treats
  pizza: ['pepperoni', 'cheese', 'italian food', 'toppings'],
  icecream: ['sundae', 'cones', 'frozen treats', 'sprinkles'],
  cookies: ['chocolate chip', 'baking', 'desserts', 'treats'],
  tacos: ['mexican food', 'burritos', 'salsa', 'nachos'],
  sushi: ['japanese food', 'rice', 'seafood', 'chopsticks'],
  pasta: ['spaghetti', 'noodles', 'marinara', 'italian'],
  fruit: ['apples', 'bananas', 'strawberries', 'oranges', 'smoothies'],
  chocolate: ['candy', 'cocoa', 'sweets', 'desserts'],
  pancakes: ['breakfast', 'syrup', 'waffles', 'brunch'],
  
  // Colors
  blue: ['ocean', 'sky', 'sapphire', 'cool colors'],
  red: ['fire', 'roses', 'ruby', 'warm colors'],
  green: ['nature', 'grass', 'emerald', 'forest'],
  purple: ['lavender', 'grapes', 'amethyst', 'royal'],
  pink: ['flowers', 'cotton candy', 'flamingos', 'sunset'],
  yellow: ['sunshine', 'sunflowers', 'gold', 'bright'],
  rainbow: ['colorful', 'pride', 'spectrum', 'bright colors'],
  
  // Outdoors & Adventure
  beach: ['ocean', 'sand', 'waves', 'tropical', 'shells'],
  mountains: ['hiking', 'peaks', 'snow', 'climbing', 'adventure'],
  forest: ['trees', 'camping', 'wildlife', 'trails'],
  camping: ['tents', 'campfire', 'smores', 'nature'],
  
  // Space
  space: ['stars', 'planets', 'rockets', 'astronauts', 'galaxy'],
  moon: ['lunar', 'astronaut', 'crater', 'night sky'],
  planets: ['mars', 'jupiter', 'saturn rings', 'solar system'],
  
  // Music
  piano: ['keyboard', 'classical', 'keys', 'melodies'],
  guitar: ['rock', 'acoustic', 'strings', 'chords'],
  drums: ['rhythm', 'beat', 'percussion', 'rock band'],
  singing: ['vocals', 'karaoke', 'microphone', 'songs'],
  pop: ['pop stars', 'charts', 'dance', 'radio'],
  rock: ['bands', 'concerts', 'electric guitar', 'drums'],
  
  // Art & Crafts
  painting: ['canvas', 'brushes', 'colors', 'gallery'],
  drawing: ['pencils', 'sketching', 'doodles', 'art'],
  crafts: ['diy', 'making things', 'creativity', 'projects'],
  photography: ['cameras', 'pictures', 'memories', 'photos'],
  origami: ['paper folding', 'cranes', 'japanese art'],
  
  // Tech & Gadgets
  robots: ['technology', 'coding', 'machines', 'ai'],
  coding: ['programming', 'computers', 'games', 'apps'],
  gadgets: ['devices', 'electronics', 'tech', 'cool stuff'],
  
  // Fantasy & Magic
  unicorns: ['magical', 'rainbow', 'fantasy', 'sparkles'],
  dragons: ['fire breathing', 'medieval', 'fantasy', 'scales'],
  magic: ['wizards', 'spells', 'wands', 'potions'],
  fairies: ['pixies', 'wings', 'magical', 'enchanted'],
  
  // Movies & TV
  animation: ['cartoons', 'anime', 'animated movies', 'pixar'],
  superheroes: ['marvel', 'dc', 'powers', 'capes'],
  
  // Books & Comics
  comics: ['graphic novels', 'manga', 'superheroes', 'stories'],
  fantasy_books: ['adventure', 'magic', 'worlds', 'series'],
  
  // Fashion & Style
  fashion: ['clothes', 'style', 'outfits', 'trends'],
  sneakers: ['shoes', 'kicks', 'jordans', 'collection'],
  
  // Collecting
  cards: ['trading cards', 'pokemon cards', 'collection', 'rare'],
  stickers: ['sticker books', 'decorating', 'collection'],
  figurines: ['action figures', 'collectibles', 'display'],
  
  // Cars & Vehicles
  cars: ['racing', 'sports cars', 'driving', 'speed'],
  trucks: ['monster trucks', 'big rigs', 'construction'],
  trains: ['locomotives', 'railroads', 'model trains'],
  
  // Cute Stuff
  kawaii: ['cute', 'japanese style', 'adorable', 'plushies'],
  plushies: ['stuffed animals', 'cuddly', 'soft', 'collection'],
};

// Theme emoji mapping
export const themeEmojis: Record<string, string> = {
  animals: '🐾',
  sports: '⚽',
  videogames: '🎮',
  artcrafts: '🎨',
  music: '🎵',
  moviestv: '🎬',
  bookscomics: '📚',
  foodtreats: '🍕',
  outdoors: '🏕️',
  techgadgets: '🤖',
  space: '🚀',
  fantasymagic: '🦄',
  fashionstyle: '👗',
  collecting: '🎴',
  buildinglego: '🧱',
  carsvehicles: '🚗',
  cutestuff: '🧸',
  puzzlesgames: '🧩',
  // Legacy mappings for compatibility
  games: '🎮',
  food: '🍕',
  colors: '🌈',
  places: '🏖️',
  nature: '🌿',
  art: '🎨',
  books: '📚',
  movies: '🎬',
  adventure: '🗺️',
  creativity: '✨',
  technology: '🤖',
  friendship: '👋',
  learning: '📖',
  outdoor: '🏕️',
  indoor: '🏠',
  fantasy: '🦄',
};

// Personality types
export const personalityTypes: PersonalityType[] = [
  {
    id: 'adventurer',
    name: 'The Adventurer',
    emoji: '🗺️',
    description: "You're always ready for the next big adventure! You love exploring new places, trying new things, and discovering the unknown. Life is one big exciting journey for you!",
    traits: ['curious', 'brave', 'energetic', 'outdoor-loving'],
    suggestions: ['hiking trails', 'treasure hunts', 'travel books', 'camping gear', 'adventure movies'],
    color: 'from-orange-400 to-amber-500',
  },
  {
    id: 'cozy-collector',
    name: 'The Cozy Collector',
    emoji: '🧸',
    description: "You appreciate the comfy things in life! Whether it's collecting cool stuff, enjoying your favorite snacks, or relaxing with friends, you know how to make every moment special.",
    traits: ['thoughtful', 'organized', 'appreciative', 'comfort-loving'],
    suggestions: ['cozy blankets', 'board games', 'hot cocoa recipes', 'stuffed animals', 'story books'],
    color: 'from-pink-400 to-rose-500',
  },
  {
    id: 'creative-spark',
    name: 'The Creative Spark',
    emoji: '🎨',
    description: "Your imagination knows no limits! You see the world in colors and shapes that others might miss. Making things, drawing, building - that's where you shine brightest!",
    traits: ['imaginative', 'artistic', 'original', 'expressive'],
    suggestions: ['art supplies', 'craft kits', 'music lessons', 'creative writing', 'design apps'],
    color: 'from-purple-400 to-fuchsia-500',
  },
  {
    id: 'nature-pal',
    name: 'The Nature Pal',
    emoji: '🌿',
    description: "You feel most at home in nature! Animals, plants, and the great outdoors call to you. You care about the Earth and all the amazing creatures that live here.",
    traits: ['caring', 'observant', 'peaceful', 'earth-loving'],
    suggestions: ['nature documentaries', 'gardening kits', 'bird watching', 'wildlife books', 'outdoor activities'],
    color: 'from-green-400 to-emerald-500',
  },
  {
    id: 'brainy-builder',
    name: 'The Brainy Builder',
    emoji: '🧩',
    description: "Your brain is like a super computer! You love figuring out how things work, solving puzzles, and building amazing creations. Problems are just puzzles waiting to be solved!",
    traits: ['logical', 'curious', 'patient', 'inventive'],
    suggestions: ['LEGO sets', 'science experiments', 'coding games', 'brain teasers', 'building kits'],
    color: 'from-blue-400 to-cyan-500',
  },
  {
    id: 'team-captain',
    name: 'The Team Captain',
    emoji: '⭐',
    description: "You bring people together! Whether it's sports, games, or group projects, you know how to lead and make everyone feel included. Teamwork makes the dream work!",
    traits: ['friendly', 'confident', 'encouraging', 'active'],
    suggestions: ['team sports', 'group games', 'leadership books', 'sports equipment', 'club activities'],
    color: 'from-yellow-400 to-orange-500',
  },
  {
    id: 'chill-explorer',
    name: 'The Chill Explorer',
    emoji: '🌊',
    description: "You take life at your own pace - calm, cool, and collected! You enjoy discovering new things but in your own relaxed way. You find joy in the simple moments.",
    traits: ['relaxed', 'thoughtful', 'open-minded', 'easy-going'],
    suggestions: ['music playlists', 'nature walks', 'podcasts', 'journaling', 'photography'],
    color: 'from-teal-400 to-cyan-500',
  },
  {
    id: 'super-fan',
    name: 'The Super Fan',
    emoji: '🎉',
    description: "When you love something, you REALLY love it! You dive deep into your favorite things, know all the details, and your enthusiasm is totally contagious!",
    traits: ['passionate', 'dedicated', 'enthusiastic', 'knowledgeable'],
    suggestions: ['fan communities', 'collectibles', 'fan art', 'trivia games', 'themed parties'],
    color: 'from-red-400 to-pink-500',
  },
  {
    id: 'tech-wizard',
    name: 'The Tech Wizard',
    emoji: '🤖',
    description: "Technology is your superpower! You love gadgets, games, and all things digital. You're probably the first one your friends call when they need tech help!",
    traits: ['tech-savvy', 'innovative', 'quick-learning', 'future-focused'],
    suggestions: ['coding classes', 'tech gadgets', 'video games', 'robotics kits', 'digital art'],
    color: 'from-violet-400 to-purple-500',
  },
  {
    id: 'story-seeker',
    name: 'The Story Seeker',
    emoji: '📚',
    description: "Stories are your gateway to endless worlds! Whether reading, watching, or creating them, you love getting lost in amazing tales and unforgettable characters.",
    traits: ['imaginative', 'empathetic', 'curious', 'creative'],
    suggestions: ['book series', 'movies', 'writing prompts', 'story games', 'comic books'],
    color: 'from-indigo-400 to-blue-500',
  },
  {
    id: 'foodie-friend',
    name: 'The Foodie Friend',
    emoji: '🍪',
    description: "Your taste buds are always on an adventure! You love trying new foods, baking treats, and sharing snacks with friends. Every meal is an opportunity for yumminess!",
    traits: ['adventurous', 'generous', 'creative', 'social'],
    suggestions: ['kid-friendly recipes', 'baking kits', 'food shows', 'cooking classes', 'snack ideas'],
    color: 'from-amber-400 to-yellow-500',
  },
  {
    id: 'music-maestro',
    name: 'The Music Maestro',
    emoji: '🎵',
    description: "Music flows through everything you do! Whether you're playing, singing, or just listening, music makes your world go round. You've got rhythm in your soul!",
    traits: ['rhythmic', 'expressive', 'creative', 'passionate'],
    suggestions: ['music lessons', 'concert tickets', 'instruments', 'music apps', 'dance classes'],
    color: 'from-rose-400 to-red-500',
  },
];

// Map themes to personality type weights
export const themeToPersonalityWeights: Record<string, Record<string, number>> = {
  // New categories
  animals: { 'nature-pal': 3, 'cozy-collector': 1, 'super-fan': 1 },
  sports: { 'team-captain': 3, 'adventurer': 2, 'chill-explorer': 1 },
  videogames: { 'tech-wizard': 2, 'brainy-builder': 2, 'super-fan': 2 },
  artcrafts: { 'creative-spark': 3, 'story-seeker': 1 },
  music: { 'music-maestro': 3, 'creative-spark': 1, 'super-fan': 1 },
  moviestv: { 'story-seeker': 2, 'super-fan': 2, 'cozy-collector': 1 },
  bookscomics: { 'story-seeker': 3, 'cozy-collector': 1 },
  foodtreats: { 'foodie-friend': 3, 'cozy-collector': 1, 'creative-spark': 1 },
  outdoors: { 'adventurer': 3, 'nature-pal': 2, 'team-captain': 1 },
  techgadgets: { 'tech-wizard': 3, 'brainy-builder': 2 },
  space: { 'brainy-builder': 2, 'adventurer': 2, 'story-seeker': 1 },
  fantasymagic: { 'story-seeker': 2, 'creative-spark': 2 },
  fashionstyle: { 'creative-spark': 2, 'super-fan': 2, 'chill-explorer': 1 },
  collecting: { 'cozy-collector': 3, 'super-fan': 2 },
  buildinglego: { 'brainy-builder': 3, 'creative-spark': 2 },
  carsvehicles: { 'adventurer': 2, 'tech-wizard': 2, 'super-fan': 1 },
  cutestuff: { 'cozy-collector': 3, 'nature-pal': 1 },
  puzzlesgames: { 'brainy-builder': 3, 'chill-explorer': 1 },
  // Legacy categories for compatibility
  games: { 'tech-wizard': 2, 'brainy-builder': 2, 'super-fan': 2 },
  food: { 'foodie-friend': 3, 'cozy-collector': 1, 'creative-spark': 1 },
  colors: { 'creative-spark': 2, 'chill-explorer': 1 },
  places: { 'adventurer': 3, 'chill-explorer': 2 },
  nature: { 'nature-pal': 3, 'adventurer': 2, 'chill-explorer': 1 },
  art: { 'creative-spark': 3, 'story-seeker': 1 },
  books: { 'story-seeker': 3, 'cozy-collector': 1 },
  movies: { 'story-seeker': 2, 'super-fan': 2, 'cozy-collector': 1 },
  technology: { 'tech-wizard': 3, 'brainy-builder': 2 },
  adventure: { 'adventurer': 3, 'team-captain': 1 },
  creativity: { 'creative-spark': 3, 'story-seeker': 1 },
  outdoor: { 'adventurer': 2, 'nature-pal': 2, 'team-captain': 1 },
  indoor: { 'cozy-collector': 2, 'brainy-builder': 1 },
  fantasy: { 'story-seeker': 2, 'creative-spark': 2 },
};
