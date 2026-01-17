/**
 * Concept Expansion Module
 * 
 * Expands base concepts into more specific, kid-friendly subtypes.
 * Ensures generated card titles are never exactly the raw input term.
 */

// Curated expansions for common kid interests
export const conceptExpansions: Record<string, string[]> = {
  // Animals
  dogs: [
    'Golden Retriever', 'German Shepherd', 'Shiba Inu', 'Labrador puppy',
    'Husky with blue eyes', 'Corgi butt', 'Dalmatian spots', 'Poodle haircut',
    'Dog agility course', 'Rescue dog adoption', 'Dog park fun', 'Puppy training class',
    'Frisbee catching dog', 'Service dog hero', 'Sled dog team',
  ],
  cats: [
    'Maine Coon fluff', 'Sphynx cat', 'Ragdoll kitten', 'Orange tabby',
    'Black cat luck', 'Siamese eyes', 'Persian cat', 'Cat café visit',
    'Laser pointer chase', 'Cat in a box', 'Kitten mittens', 'Cat tree tower',
    'Sleepy cat loaf', 'Cat zoomies', 'Tuxedo cat',
  ],
  horses: [
    'Wild mustang', 'Clydesdale giant', 'Arabian horse', 'Pony ride',
    'Horse jumping', 'Unicorn horn', 'Painted horse', 'Foal first steps',
    'Horse braids', 'Barrel racing', 'Trail riding', 'Horse whisperer',
  ],
  birds: [
    'Colorful parrot', 'Snowy owl', 'Tiny hummingbird', 'Peacock feathers',
    'Flamingo pink', 'Eagle soaring', 'Penguin waddle', 'Toucan beak',
    'Parakeet tricks', 'Bird feeder visitors', 'Cockatoo dancing',
  ],
  fish: [
    'Clownfish Nemo', 'Betta fish colors', 'Goldfish pond', 'Shark teeth',
    'Whale tail splash', 'Dolphin jump', 'Jellyfish glow', 'Coral reef life',
    'Aquarium tunnel', 'Koi fish pattern', 'Seahorse dad',
  ],
  dinosaurs: [
    'T-Rex roar', 'Triceratops horns', 'Velociraptor pack', 'Brontosaurus neck',
    'Pterodactyl flying', 'Stegosaurus plates', 'Fossil dig site', 'Dino eggs',
    'Jurassic jungle', 'Dinosaur footprint', 'Raptor claw',
  ],
  rabbits: [
    'Lop-eared bunny', 'Holland Lop fluff', 'Bunny hop', 'Rabbit ears up',
    'Baby bunnies nest', 'Bunny nose wiggle', 'Rabbit in hat magic',
  ],
  pandas: [
    'Baby panda tumble', 'Panda eating bamboo', 'Red panda curl', 'Panda slide',
    'Panda sneeze video', 'Panda bear hug', 'Giant panda nap',
  ],
  elephants: [
    'Baby elephant bath', 'Elephant parade', 'Trunk spray', 'Elephant family',
    'Circus elephant tricks', 'Elephant painting art', 'Safari elephant',
  ],
  butterflies: [
    'Monarch migration', 'Blue morpho wings', 'Butterfly garden', 'Caterpillar munch',
    'Chrysalis transform', 'Butterfly on flower', 'Painted lady butterfly',
  ],

  // Sports
  soccer: [
    'Bicycle kick goal', 'Penalty shootout', 'World Cup trophy', 'Goalkeeper dive',
    'Free kick curve', 'Soccer juggling', 'Header goal', 'Corner kick play',
    'Yellow card drama', 'Hat trick celebration', 'Cleats on grass',
  ],
  basketball: [
    'Slam dunk contest', '3-point buzzer beater', 'Crossover dribble', 'Alley-oop pass',
    'Free throw swish', 'WNBA all-star', 'Basketball spinning', 'Fast break layup',
    'Block party defense', 'March Madness', 'Sneaker collection',
  ],
  swimming: [
    'Cannonball splash', 'Butterfly stroke', 'Diving board flip', 'Pool noodle fun',
    'Swim goggles on', 'Relay race finish', 'Underwater handstand', 'Marco Polo game',
  ],
  gymnastics: [
    'Perfect 10 landing', 'Balance beam flip', 'Uneven bars routine', 'Floor tumbling',
    'Vault jump', 'Gymnastics leotard', 'Olympic gold moment', 'Cartwheel practice',
  ],
  baseball: [
    'Home run swing', 'Pitching fastball', 'Sliding into base', 'Outfield catch',
    'Baseball card collection', 'Stadium hot dog', 'Batting helmet', 'Double play',
  ],
  tennis: [
    'Ace serve', 'Tennis volley', 'Grand Slam match', 'Tennis ball can pop',
    'Racket string pattern', 'Wimbledon strawberries', 'Backhand winner',
  ],
  skateboarding: [
    'Kickflip trick', 'Halfpipe air', 'Ollie jump', 'Skateboard deck design',
    'Skate park grind', 'Pro skater trick', 'Longboard cruise', 'Helmet safety',
  ],
  dancing: [
    'Hip hop battle', 'Ballet pirouette', 'Breakdance spin', 'TikTok dance trend',
    'Dance recital costume', 'Jazz hands', 'Tap dance shoes', 'K-pop choreography',
  ],
  running: [
    'Sprint finish line', 'Relay baton pass', 'Marathon medal', 'Track hurdles',
    'Cross country trail', 'Running shoes tech', 'Starting block launch',
  ],

  // Beauty - Nails
  nails: [
    'Glitter nails sparkle', 'French tips classic', 'Press-on nails easy', 'Nail art stickers',
    'Pastel nails soft', 'Ombre nails fade', 'Acrylic nails long', 'Gel nails shiny',
    'Rainbow nails colorful', 'Flower nail art', 'Marble nails swirl', 'Neon nails bright',
    'Butterfly nail design', 'Heart nail art', 'Polka dot nails', 'Nail gems crystals',
    'Holographic nails', 'Chrome nails mirror', 'Matte nails smooth', 'Nail stencils shapes',
  ],

  // Beauty - Makeup
  makeup: [
    'Lip gloss shiny', 'Sparkly eyeshadow', 'Blush pink cheeks', 'Mascara lashes',
    'Makeup brushes set', 'Eyeshadow palette', 'Lip balm fruity', 'Highlighter glow',
    'Face gems stickers', 'Glitter makeup', 'Tinted lip balm', 'Makeup mirror lights',
    'Nail polish colors', 'Face paint designs', 'Body glitter sparkle', 'Makeup bag cute',
    'Lip tint natural', 'Setting spray mist', 'Beauty blender sponge', 'Brow gel brush',
  ],

  // Food
  pizza: [
    'Deep dish Chicago', 'Wood-fired margherita', 'Pepperoni slice pull', 'Pizza oven fire',
    'Stuffed crust bite', 'Pizza dough toss', 'Cheese stretch', 'Personal pan pizza',
    'Pizza party spread', 'Hawaiian pizza debate', 'Pizza emoji',
  ],
  icecream: [
    'Soft serve swirl', 'Waffle cone stack', 'Sundae toppings', 'Ice cream truck jingle',
    'Brain freeze moment', 'Sprinkles rainbow', 'Banana split', 'Gelato scoop',
    'Ice cream sandwich', 'Rolled ice cream', 'Dippin Dots',
  ],
  cookies: [
    'Chocolate chip warm', 'Oreo twist', 'Sugar cookie decorating', 'Cookie dough raw',
    'Giant cookie cake', 'Snickerdoodle cinnamon', 'Fortune cookie message',
    'Milk and cookies dunk', 'Girl Scout cookies',
  ],
  tacos: [
    'Taco Tuesday', 'Crunchy vs soft shell', 'Street taco stand', 'Taco bar toppings',
    'Fish taco fresh', 'Nacho cheese drip', 'Burrito wrap', 'Guacamole fresh',
  ],
  sushi: [
    'Rainbow roll colors', 'Sushi conveyor belt', 'Chopstick skills', 'Nigiri piece',
    'Soy sauce dip', 'Wasabi challenge', 'Poke bowl art', 'Sushi making class',
  ],
  pasta: [
    'Spaghetti twirl', 'Mac and cheese bowl', 'Lasagna layers', 'Ravioli pillow',
    'Alfredo creamy', 'Pasta making machine', 'Ramen slurp', 'Noodle pull',
  ],
  fruit: [
    'Watermelon slice', 'Strawberry picking', 'Banana peel slip', 'Orange juice fresh',
    'Apple picking orchard', 'Smoothie blend', 'Fruit salad rainbow', 'Grape bunch',
  ],
  chocolate: [
    'Hot cocoa marshmallows', 'Chocolate fountain dip', 'Brownie fudge', 'Chocolate bunny',
    'Candy bar unwrap', 'Chocolate chip melted', 'Truffle box fancy', 'Smores campfire',
  ],
  pancakes: [
    'Pancake flip', 'Syrup pour', 'Blueberry pancakes', 'Pancake art face',
    'Waffle iron pattern', 'Breakfast in bed', 'Whipped cream tower', 'French toast',
  ],

  // Games
  minecraft: [
    'Diamond pickaxe', 'Creeper explosion', 'Nether portal glow', 'Enderman stare',
    'Redstone contraption', 'Village trading', 'Ender dragon fight', 'Minecraft mansion',
    'Steve skin', 'Pig riding', 'Enchanting table', 'Beacon beam',
  ],
  roblox: [
    'Robux coins', 'Adopt Me pets', 'Tower of Hell climb', 'Brookhaven roleplay',
    'Murder Mystery solve', 'Obby parkour', 'Avatar customization', 'Bloxburg house',
  ],
  pokemon: [
    'Pikachu thunderbolt', 'Pokeball throw', 'Shiny Pokemon rare', 'Eevee evolutions',
    'Pokemon card holographic', 'Gym badge collection', 'Legendary catch', 'Pokemon GO walk',
    'Starter Pokemon choice', 'Pokemon battle arena',
  ],
  mario: [
    'Super mushroom power', 'Princess Peach rescue', 'Luigi mansion', 'Bowser battle',
    'Mario Kart rainbow road', 'Coin block punch', 'Yoshi egg', 'Star power invincible',
    'Warp pipe travel', 'Goomba stomp',
  ],
  lego: [
    'LEGO set unboxing', 'Minifigure collection', 'LEGO city build', 'Brick separator tool',
    'LEGO Star Wars', 'LEGO castle siege', 'LEGO Technic gears', 'Stop motion LEGO',
    'LEGO sort by color', 'Custom LEGO creation',
  ],
  fortnite: [
    'Victory Royale dance', 'Battle bus drop', 'Building ramps fast', 'Loot chest open',
    'Fortnite emote', 'Squad win', 'Storm circle run', 'Fortnite skin rare',
  ],

  // Music
  piano: [
    'Grand piano keys', 'Piano recital', 'Keyboard synthesizer', 'Learning piano app',
    'Piano melody', 'Playing by ear', 'Duet performance', 'Electric keyboard',
  ],
  guitar: [
    'Electric guitar solo', 'Acoustic campfire', 'Guitar pick collection', 'Learning chords',
    'Rock star pose', 'Ukulele strumming', 'Bass guitar groove', 'Air guitar contest',
  ],
  drums: [
    'Drum solo epic', 'Drumstick spin', 'Drum kit setup', 'Marching band drums',
    'Beat making', 'Snare drum roll', 'Cymbal crash', 'Electronic drum pad',
  ],
  singing: [
    'Karaoke night', 'Microphone gold', 'Talent show audition', 'Choir harmony',
    'Singing in shower', 'Voice recording studio', 'Duet performance', 'High note hit',
  ],

  // Colors
  blue: [
    'Ocean blue deep', 'Sky blue bright', 'Neon blue glow', 'Royal blue velvet',
    'Blue raspberry candy', 'Sapphire gemstone', 'Blue butterfly wings', 'Ice blue frozen',
  ],
  red: [
    'Fire engine red', 'Ruby gemstone', 'Cherry red lips', 'Sunset red sky',
    'Rose red petals', 'Strawberry red', 'Racing red car', 'Lava red hot',
  ],
  green: [
    'Emerald green gem', 'Forest green trees', 'Lime green neon', 'Mint green fresh',
    'Grass green field', 'Slime green goo', 'Shamrock green lucky', 'Frog green hop',
  ],
  purple: [
    'Royal purple crown', 'Lavender fields', 'Grape purple sweet', 'Galaxy purple swirl',
    'Amethyst crystal', 'Eggplant emoji', 'Violet flower', 'Neon purple glow',
  ],
  pink: [
    'Bubblegum pink', 'Flamingo pink bird', 'Cotton candy pink', 'Cherry blossom pink',
    'Hot pink neon', 'Rose pink soft', 'Strawberry milk pink', 'Pink sunset sky',
  ],
  yellow: [
    'Sunshine yellow', 'Lemon yellow zesty', 'Banana yellow', 'Sunflower yellow bright',
    'Rubber duck yellow', 'School bus yellow', 'Gold yellow treasure', 'Emoji yellow face',
  ],
  rainbow: [
    'Double rainbow sky', 'Rainbow cake layers', 'Rainbow tie dye', 'Pride rainbow flag',
    'Rainbow sprinkles', 'Rainbow unicorn', 'Rainbow road game', 'Rainbow slime swirl',
  ],

  // Places
  beach: [
    'Sandcastle building', 'Wave surfing', 'Seashell collecting', 'Beach sunset',
    'Tide pool exploring', 'Beach volleyball', 'Boardwalk arcade', 'Palm tree shade',
    'Beach bonfire', 'Snorkeling adventure', 'Hermit crab friend',
  ],
  mountains: [
    'Mountain peak summit', 'Ski slope fresh powder', 'Hiking trail view', 'Cable car ride',
    'Waterfall discovery', 'Mountain goat sighting', 'Campfire night', 'Rock climbing wall',
  ],
  forest: [
    'Treehouse hideout', 'Forest trail hike', 'Mushroom fairy ring', 'Owl spotting',
    'Campsite setup', 'Stream crossing', 'Firefly night', 'Tree climbing adventure',
  ],
  space: [
    'Rocket launch', 'Astronaut floating', 'Moon landing footprint', 'Mars rover',
    'Saturn rings', 'Meteor shower night', 'Space station view', 'Black hole mystery',
    'Nebula colors', 'Alien planet', 'Telescope stargazing', 'Zero gravity fun',
  ],
  amusementpark: [
    'Roller coaster loop', 'Ferris wheel view', 'Bumper cars crash', 'Cotton candy giant',
    'Carousel horse', 'Water slide splash', 'Haunted house scare', 'Prize booth win',
  ],
  zoo: [
    'Zoo train ride', 'Giraffe feeding', 'Lion roar', 'Penguin parade',
    'Monkey climbing', 'Zoo gift shop', 'Petting zoo baby', 'Aquarium tunnel walk',
  ],

  // Art
  painting: [
    'Canvas splatter', 'Watercolor blend', 'Palette mixing', 'Bob Ross trees',
    'Finger painting fun', 'Portrait drawing', 'Landscape painting', 'Art museum visit',
  ],
  drawing: [
    'Sketchbook doodles', 'Anime drawing style', 'Character design', 'Colored pencil art',
    'Comic strip creation', 'Doodle art pattern', 'Still life sketch', 'Digital drawing tablet',
  ],
  crafts: [
    'DIY slime making', 'Origami crane fold', 'Friendship bracelet', 'Clay sculpting',
    'Tie dye shirt', 'Beaded jewelry', 'Paper mache project', 'Scrapbook page',
    'Popsicle stick house', 'Glitter art',
  ],
  photography: [
    'Selfie pose', 'Nature photography', 'Pet photoshoot', 'Sunset capture',
    'Photo filter fun', 'Polaroid instant', 'Photography contest', 'Action shot freeze',
  ],

  // YouTubers & Content
  youtubers: [
    'MrBeast challenge', 'Gaming stream live', 'Unboxing video', 'Vlog camera setup',
    'Subscriber milestone', 'YouTube play button', 'Collab video duo', 'Fan meetup event',
    'Merch collection', 'Behind the scenes', 'Comment section funny',
  ],

  // Tech
  technology: [
    'VR headset gaming', 'Robot assistant', 'Drone flying', 'Smart watch apps',
    '3D printer creation', 'Coding screen', 'Gaming PC setup', 'Wireless earbuds',
    'Tablet drawing', 'LED strip lights', 'Mechanical keyboard clicks',
  ],
  robots: [
    'Robot dance battle', 'AI assistant chat', 'Robot dog pet', 'Battle bot arena',
    'Robot arm grabber', 'Humanoid robot walk', 'LEGO Mindstorms build', 'Robot vacuum patrol',
  ],

  // Fantasy
  fantasy: [
    'Dragon breathing fire', 'Wizard casting spell', 'Fairy dust sparkle', 'Mermaid tail',
    'Unicorn rainbow', 'Castle drawbridge', 'Knight armor shiny', 'Magic wand wave',
    'Enchanted forest', 'Phoenix rising', 'Elf ears pointed', 'Treasure chest gold',
  ],
  magic: [
    'Magic trick reveal', 'Card trick shuffle', 'Disappearing act', 'Levitation illusion',
    'Magic hat rabbit', 'Crystal ball gaze', 'Potion brewing', 'Spell book ancient',
  ],

  // Vehicles
  cars: [
    'Sports car speed', 'Monster truck jump', 'Race car pit stop', 'Lowrider bounce',
    'Electric car charging', 'Classic car show', 'Go kart racing', 'Car wash rainbow',
    'Hot wheels collection', 'Dream car poster',
  ],
  vehicles: [
    'Fire truck siren', 'Helicopter hover', 'Train locomotive', 'Motorcycle ride',
    'Airplane takeoff', 'Boat sailing', 'Ambulance rescue', 'Garbage truck arm',
    'Ice cream truck', 'School bus ride',
  ],

  // Collecting
  collecting: [
    'Trading card binder', 'Funko Pop shelf', 'Coin collection rare', 'Stamp album',
    'Rock collection display', 'Seashell jar', 'Action figure collection', 'Keychain collection',
    'Pin badge board', 'Sticker album complete',
  ],

  // Cute stuff
  cute: [
    'Baby animal yawn', 'Tiny food miniature', 'Kawaii character', 'Plushie mountain',
    'Hamster eating tiny', 'Kitten in teacup', 'Puppy eyes look', 'Squish mallow hug',
    'Chibi art style', 'Baby penguin waddle',
  ],

  // Fashion
  fashion: [
    'Outfit of the day', 'Sneaker collection', 'Hair color change', 'Nail art design',
    'Accessory haul', 'Thrift store find', 'Fashion show runway', 'Mix and match style',
    'Jewelry sparkle', 'Sunglasses cool',
  ],

  // Books & Stories
  books: [
    'Book stack tower', 'Library quiet corner', 'Audiobook headphones', 'Bookmark collection',
    'Book series marathon', 'Comic book page', 'Graphic novel art', 'Reading nook cozy',
    'Book club meeting', 'Author autograph',
  ],

  // Movies & TV
  movies: [
    'Movie theater popcorn', 'Superhero cape pose', 'Animation behind scenes', 'Movie premiere red carpet',
    'Favorite movie quote', 'Movie marathon snacks', 'Film camera vintage', 'Special effects magic',
    'Movie poster collection', 'Disney castle',
  ],

  // Puzzles
  puzzles: [
    'Jigsaw puzzle progress', 'Rubiks cube solve', 'Crossword puzzle pen', 'Sudoku grid',
    'Escape room clue', 'Brain teaser twist', 'Logic puzzle solve', 'Word search find',
    'Maze navigation', 'Puzzle box secret',
  ],
};

// Fallback templates for unknown concepts
const fallbackTemplates = [
  'amazing {thing}',
  'super cool {thing}',
  'tiny {thing}',
  'giant {thing}',
  'sparkly {thing}',
  'rainbow {thing}',
  'vintage {thing}',
  'futuristic {thing}',
  '{thing} collection',
  '{thing} adventure',
  '{thing} discovery',
  'best {thing} ever',
  'DIY {thing} project',
  '{thing} challenge',
  'ultimate {thing}',
  'secret {thing}',
  '{thing} surprise',
  'epic {thing} moment',
  '{thing} transformation',
  '{thing} world record',
];

/**
 * Normalize a term for comparison (lowercase, trimmed)
 */
export function normalizeTerm(term: string): string {
  return term.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
}

/**
 * Check if a title exactly matches a raw input term (case-insensitive)
 */
export function titleMatchesInput(title: string, rawInputs: string[]): boolean {
  const normalizedTitle = normalizeTerm(title);
  return rawInputs.some((input) => {
    const normalizedInput = normalizeTerm(input);
    // Exact match or plural match
    return (
      normalizedTitle === normalizedInput ||
      normalizedTitle === normalizedInput + 's' ||
      normalizedTitle + 's' === normalizedInput
    );
  });
}

/**
 * Expand a concept into more specific subtypes
 */
export function expandConcept(concept: string, count: number = 5): string[] {
  const normalized = normalizeTerm(concept);
  
  // Check direct match in expansions
  for (const [key, expansions] of Object.entries(conceptExpansions)) {
    if (normalized === key || normalized === key + 's' || normalized + 's' === key) {
      // Shuffle and take count
      const shuffled = [...expansions].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    }
  }
  
  // Check if concept is in any expansion values (partial match)
  for (const [_key, expansions] of Object.entries(conceptExpansions)) {
    const matches = expansions.filter((e) => 
      normalizeTerm(e).includes(normalized) || normalized.includes(normalizeTerm(e).split(' ')[0])
    );
    if (matches.length > 0) {
      const shuffled = [...matches].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    }
  }
  
  // Fallback: generate from templates
  return generateFallbackExpansions(concept, count);
}

/**
 * Generate fallback expansions using templates
 */
export function generateFallbackExpansions(concept: string, count: number = 5): string[] {
  const shuffledTemplates = [...fallbackTemplates].sort(() => Math.random() - 0.5);
  const results: string[] = [];
  
  for (let i = 0; i < Math.min(count, shuffledTemplates.length); i++) {
    const expansion = shuffledTemplates[i].replace('{thing}', concept);
    // Capitalize first letter
    results.push(expansion.charAt(0).toUpperCase() + expansion.slice(1));
  }
  
  return results;
}

/**
 * Get expansions for a category
 */
export function getCategoryExpansions(category: string, count: number = 10): string[] {
  const categoryMappings: Record<string, string[]> = {
    animals: ['dogs', 'cats', 'horses', 'birds', 'fish', 'dinosaurs', 'rabbits', 'pandas', 'elephants', 'butterflies'],
    sports: ['soccer', 'basketball', 'swimming', 'gymnastics', 'baseball', 'tennis', 'skateboarding', 'dancing', 'running'],
    'video games': ['minecraft', 'roblox', 'pokemon', 'mario', 'fortnite'],
    'art & crafts': ['painting', 'drawing', 'crafts', 'photography'],
    music: ['piano', 'guitar', 'drums', 'singing'],
    'food & treats': ['pizza', 'icecream', 'cookies', 'tacos', 'sushi', 'pasta', 'fruit', 'chocolate', 'pancakes'],
    'outdoors & adventure': ['beach', 'mountains', 'forest', 'amusementpark', 'zoo'],
    'tech & gadgets': ['technology', 'robots'],
    space: ['space'],
    'fantasy & magic': ['fantasy', 'magic'],
    'movies & tv': ['movies'],
    'books & comics': ['books'],
    youtubers: ['youtubers'],
    'fashion & style': ['fashion'],
    collecting: ['collecting'],
    'building & lego': ['lego'],
    'cars & vehicles': ['cars', 'vehicles'],
    'cute stuff': ['cute'],
    'puzzles & brain games': ['puzzles'],
    colors: ['blue', 'red', 'green', 'purple', 'pink', 'yellow', 'rainbow'],
    places: ['beach', 'mountains', 'forest', 'space', 'amusementpark', 'zoo'],
    games: ['minecraft', 'roblox', 'pokemon', 'mario', 'fortnite', 'lego'],
    // Beauty categories
    beauty: ['nails', 'makeup'],
    nails: ['nails'],
    makeup: ['makeup'],
  };
  
  const normalizedCategory = category.toLowerCase();
  const conceptKeys = categoryMappings[normalizedCategory] || [];
  
  const allExpansions: string[] = [];
  for (const key of conceptKeys) {
    const expansions = conceptExpansions[key] || [];
    allExpansions.push(...expansions);
  }
  
  // Shuffle and return
  const shuffled = [...allExpansions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Validate that a title is not an exact match to any raw input
 * Returns true if valid (not an exact match)
 */
export function validateTitle(title: string, rawInputs: string[]): boolean {
  return !titleMatchesInput(title, rawInputs);
}

/**
 * Generate a valid title that doesn't match raw inputs
 */
export function generateValidTitle(baseConcept: string, rawInputs: string[], attempt: number = 0): string {
  const expansions = expandConcept(baseConcept, 10);
  
  for (const expansion of expansions) {
    if (validateTitle(expansion, rawInputs)) {
      return expansion;
    }
  }
  
  // If all expansions match (unlikely), use fallback with modifier
  const modifiers = ['awesome', 'incredible', 'magical', 'special', 'super'];
  const modifier = modifiers[attempt % modifiers.length];
  return `${modifier} ${baseConcept} vibes`;
}
