/**
 * Kid Reference Map
 * 
 * Central file mapping concepts to kid-safe, age-appropriate (9-12 year old) examples.
 * Used for:
 * - Card generation
 * - "What is this?" explanations
 * - Personality descriptions
 * 
 * Rule: If an average 9-year-old wouldn't instantly recognize it, don't use it.
 */

export interface KidReference {
  /** Short, friendly explanation (1-2 sentences) */
  explanation: string;
  /** Fun fact or "you might see this at..." */
  funFact?: string;
  /** Related things kids would know */
  relatedTo?: string[];
  /** Search terms for finding good images */
  imageSearchTerms?: string[];
}

/**
 * Kid-friendly explanations for concepts
 * Written like a friendly older sibling explaining things
 */
export const kidExplanations: Record<string, KidReference> = {
  // ===== ANIMALS =====
  'golden retriever': {
    explanation: "A super friendly, fluffy golden dog that loves to play fetch and give cuddles!",
    funFact: "They're often trained as helper dogs because they're so smart and gentle.",
    relatedTo: ['dogs', 'pets', 'puppies'],
  },
  'german shepherd': {
    explanation: "A brave, loyal dog with pointy ears that's often seen as a police or rescue dog!",
    funFact: "They can learn over 200 commands - that's way more than most dogs!",
    relatedTo: ['dogs', 'pets', 'working dogs'],
  },
  'shiba inu': {
    explanation: "A fluffy orange dog from Japan with a curly tail and a super cute face!",
    funFact: "They're the dog behind all those funny doge memes!",
    relatedTo: ['dogs', 'pets', 'memes'],
  },
  'husky': {
    explanation: "A beautiful wolf-like dog with bright blue eyes that loves cold weather!",
    funFact: "Huskies can pull sleds for hundreds of miles through the snow.",
    relatedTo: ['dogs', 'snow', 'sledding'],
  },
  'corgi': {
    explanation: "A short-legged, long dog with big ears and an adorable fluffy butt!",
    funFact: "The Queen of England loved corgis so much she had over 30 of them!",
    relatedTo: ['dogs', 'pets', 'cute animals'],
  },
  'maine coon': {
    explanation: "A giant fluffy cat that can be as big as a small dog!",
    funFact: "They're one of the oldest cat breeds from America and love to play in water.",
    relatedTo: ['cats', 'pets', 'fluffy'],
  },
  'orange tabby': {
    explanation: "A friendly orange cat with stripy fur - like Garfield!",
    funFact: "Almost all orange cats are boys! Only about 1 in 5 are girls.",
    relatedTo: ['cats', 'pets', 'Garfield'],
  },
  'baby panda': {
    explanation: "A tiny, pink newborn panda that grows up to be a big fluffy black and white bear!",
    funFact: "Baby pandas are SO tiny - about the size of a stick of butter when born!",
    relatedTo: ['pandas', 'zoo animals', 'cute'],
  },
  't-rex': {
    explanation: "The most famous dinosaur ever - a huge meat-eater with tiny arms and giant teeth!",
    funFact: "T-Rex's teeth were as long as bananas! 🍌",
    relatedTo: ['dinosaurs', 'Jurassic World', 'fossils'],
  },
  'clownfish': {
    explanation: "A bright orange and white striped fish - just like Nemo!",
    funFact: "Clownfish live inside sea anemones which would sting other fish but not them!",
    relatedTo: ['fish', 'Finding Nemo', 'ocean'],
  },

  // ===== VIDEO GAMES =====
  'minecraft': {
    explanation: "A super popular game where you build anything you want with blocks!",
    funFact: "Over 140 million people play Minecraft every month - that's like the whole population of Russia!",
    relatedTo: ['building', 'survival games', 'creepers'],
  },
  'diamond pickaxe': {
    explanation: "The best mining tool in Minecraft - it takes forever to find enough diamonds to make one!",
    funFact: "A real diamond pickaxe would actually be terrible for mining since diamonds are brittle!",
    relatedTo: ['Minecraft', 'mining', 'diamonds'],
  },
  'creeper': {
    explanation: "The green exploding monster from Minecraft that sneaks up and goes BOOM!",
    funFact: "Creepers were actually created by accident when the game maker messed up making a pig!",
    relatedTo: ['Minecraft', 'mobs', 'explosions'],
  },
  'roblox': {
    explanation: "A platform where you can play millions of different games made by other players!",
    funFact: "Kids have earned real money making games on Roblox!",
    relatedTo: ['gaming', 'online games', 'avatars'],
  },
  'adopt me': {
    explanation: "One of the most popular Roblox games where you raise and trade virtual pets!",
    funFact: "Adopt Me once had over 1.6 million people playing at the same time!",
    relatedTo: ['Roblox', 'pets', 'trading'],
  },
  'pikachu': {
    explanation: "The famous yellow electric mouse Pokémon - Ash's best friend!",
    funFact: "Pikachu's name comes from the Japanese words for sparkle (pika) and squeak (chu)!",
    relatedTo: ['Pokémon', 'anime', 'Nintendo'],
  },
  'mario': {
    explanation: "The famous red-hatted plumber who jumps on mushrooms and saves Princess Peach!",
    funFact: "Mario was originally called 'Jumpman' and was a carpenter, not a plumber!",
    relatedTo: ['Nintendo', 'video games', 'Luigi'],
  },
  'rainbow road': {
    explanation: "The hardest and most famous track in Mario Kart - one wrong move and you fall off!",
    funFact: "There's a Rainbow Road in almost every Mario Kart game since the first one in 1992!",
    relatedTo: ['Mario Kart', 'racing games', 'Nintendo'],
  },
  'fortnite': {
    explanation: "A battle royale game where 100 players compete to be the last one standing!",
    funFact: "Fortnite once hosted a virtual concert with over 12 million people watching at the same time!",
    relatedTo: ['battle royale', 'building', 'Victory Royale'],
  },

  // ===== SPORTS =====
  'slam dunk': {
    explanation: "When a basketball player jumps super high and stuffs the ball through the hoop!",
    funFact: "The tallest NBA players can dunk without even jumping!",
    relatedTo: ['basketball', 'NBA', 'hoops'],
  },
  'bicycle kick': {
    explanation: "An amazing soccer move where you flip backwards and kick the ball over your head!",
    funFact: "It's called a bicycle kick because your legs move like you're pedaling a bike!",
    relatedTo: ['soccer', 'goals', 'tricks'],
  },
  'skateboard trick': {
    explanation: "Cool moves on a skateboard like flips, grinds, and jumps!",
    funFact: "The kickflip was invented in the 1980s and is still one of the most popular tricks!",
    relatedTo: ['skateboarding', 'skate park', 'extreme sports'],
  },
  'gymnastics floor routine': {
    explanation: "An amazing performance combining tumbling, dancing, and acrobatic moves!",
    funFact: "Olympic gymnasts can do flips so fast they spin 3 times before landing!",
    relatedTo: ['gymnastics', 'Olympics', 'tumbling'],
  },

  // ===== FOOD =====
  'deep dish pizza': {
    explanation: "A super thick pizza from Chicago with layers of cheese and chunky tomato sauce on top!",
    funFact: "It's so thick it's more like a pizza pie than a flat pizza!",
    relatedTo: ['pizza', 'Chicago', 'Italian food'],
  },
  'sushi roll': {
    explanation: "Rice, fish, and veggies rolled up in seaweed - you eat it in one or two bites!",
    funFact: "In Japan, sushi chefs train for years before they're allowed to make sushi for customers!",
    relatedTo: ['Japanese food', 'seafood', 'chopsticks'],
  },
  'ice cream sundae': {
    explanation: "Ice cream piled high with toppings like chocolate sauce, whipped cream, and a cherry!",
    funFact: "Sundaes were invented because some places wouldn't sell ice cream sodas on Sundays!",
    relatedTo: ['dessert', 'ice cream', 'toppings'],
  },
  'rainbow cake': {
    explanation: "A magical cake with layers of different colors that look like a rainbow when you cut it!",
    funFact: "Rainbow cakes became super popular from a cake decorating TV show!",
    relatedTo: ['birthday cake', 'baking', 'colorful'],
  },

  // ===== SPACE =====
  'rocket launch': {
    explanation: "When a giant rocket blasts off into space with fire shooting out the bottom!",
    funFact: "Rockets go so fast they could travel from New York to Los Angeles in under 10 minutes!",
    relatedTo: ['space', 'NASA', 'astronauts'],
  },
  'astronaut floating': {
    explanation: "People floating in space because there's no gravity to pull them down!",
    funFact: "Astronauts have to exercise 2 hours every day in space or their muscles get weak!",
    relatedTo: ['space station', 'zero gravity', 'NASA'],
  },
  'saturn rings': {
    explanation: "The beautiful rings around Saturn made of ice and rock chunks!",
    funFact: "You could fit 764 Earths inside Saturn - it's HUGE!",
    relatedTo: ['planets', 'solar system', 'space'],
  },
  'mars rover': {
    explanation: "A robot car that drives around on Mars taking pictures and doing science!",
    funFact: "NASA's rovers on Mars are powered by the same kind of batteries in your phone!",
    relatedTo: ['Mars', 'robots', 'NASA'],
  },

  // ===== MUSIC & ENTERTAINMENT =====
  'electric guitar solo': {
    explanation: "When a guitarist plays an awesome fast part all by themselves!",
    funFact: "Electric guitars need to be plugged in to make sound - without power, they're super quiet!",
    relatedTo: ['rock music', 'concerts', 'band'],
  },
  'drum solo': {
    explanation: "When a drummer shows off their skills playing all the drums and cymbals super fast!",
    funFact: "Some drummers use over 30 different drums and cymbals in their drum kit!",
    relatedTo: ['drums', 'band', 'rhythm'],
  },
  'k-pop dance': {
    explanation: "Perfectly synchronized dancing from Korean pop music groups!",
    funFact: "K-pop trainees practice dancing for years before they can debut in a group!",
    relatedTo: ['dancing', 'BTS', 'music'],
  },
  'karaoke': {
    explanation: "Singing along to your favorite songs with the lyrics on screen!",
    funFact: "Karaoke means 'empty orchestra' in Japanese!",
    relatedTo: ['singing', 'music', 'fun'],
  },

  // ===== ART & CRAFTS =====
  'tie dye': {
    explanation: "A cool way to make colorful swirly patterns on t-shirts and fabric!",
    funFact: "Tie dye has been around for over 1,000 years in different cultures!",
    relatedTo: ['crafts', 'colorful', 'DIY'],
  },
  'origami crane': {
    explanation: "A paper bird made by folding paper without any cutting or glue!",
    funFact: "In Japan, people believe if you fold 1,000 cranes, you get a wish!",
    relatedTo: ['paper folding', 'Japanese art', 'crafts'],
  },
  'slime': {
    explanation: "Squishy, stretchy goo that's super satisfying to play with!",
    funFact: "You can make slime with just glue and contact lens solution!",
    relatedTo: ['DIY', 'ASMR', 'crafts'],
  },
  'perler beads': {
    explanation: "Tiny colorful beads you arrange on a pegboard then iron to melt together!",
    funFact: "You can make pixel art of video game characters with perler beads!",
    relatedTo: ['crafts', 'pixel art', 'DIY'],
  },

  // ===== FANTASY & MAGIC =====
  'dragon': {
    explanation: "A giant flying lizard that can breathe fire - super cool but not real!",
    funFact: "Almost every culture in the world has dragon legends!",
    relatedTo: ['fantasy', 'magic', 'mythical creatures'],
  },
  'unicorn': {
    explanation: "A magical horse with a sparkly horn on its forehead!",
    funFact: "The unicorn is the national animal of Scotland!",
    relatedTo: ['magic', 'horses', 'rainbows'],
  },
  'mermaid tail': {
    explanation: "The beautiful sparkly fish tail that mermaids have instead of legs!",
    funFact: "You can actually buy swimmable mermaid tails to wear in pools!",
    relatedTo: ['mermaids', 'ocean', 'swimming'],
  },
  'wizard hat': {
    explanation: "The pointy hat that wizards and witches wear when doing magic!",
    funFact: "The classic wizard hat look was made famous by Gandalf and Dumbledore!",
    relatedTo: ['magic', 'Harry Potter', 'fantasy'],
  },

  // ===== TECH & GADGETS =====
  'robot dog': {
    explanation: "A robot pet that can walk, play, and respond to commands!",
    funFact: "Some robot dogs can do backflips and dance!",
    relatedTo: ['robots', 'technology', 'pets'],
  },
  'vr headset': {
    explanation: "Goggles that make you feel like you're inside a video game!",
    funFact: "VR stands for Virtual Reality - it tricks your brain into thinking you're somewhere else!",
    relatedTo: ['gaming', 'technology', 'virtual reality'],
  },
  'drone': {
    explanation: "A flying robot with propellers that you control with a remote!",
    funFact: "Some drones can fly for over an hour and travel miles away!",
    relatedTo: ['flying', 'technology', 'cameras'],
  },
  '3d printer': {
    explanation: "A machine that builds 3D objects layer by layer from melted plastic!",
    funFact: "You can 3D print toys, phone cases, and even parts for other machines!",
    relatedTo: ['technology', 'making', 'printing'],
  },

  // ===== LEGO & BUILDING =====
  'lego set': {
    explanation: "A box of LEGO bricks with instructions to build something awesome!",
    funFact: "There are over 400 billion LEGO bricks in the world!",
    relatedTo: ['building', 'toys', 'creativity'],
  },
  'lego minifigure': {
    explanation: "The tiny LEGO people with yellow heads and claw hands!",
    funFact: "The most expensive LEGO minifigure ever sold was worth $15,000!",
    relatedTo: ['LEGO', 'collecting', 'toys'],
  },

  // ===== CUTE STUFF =====
  'squishmallow': {
    explanation: "Super soft, squishy plush toys that are perfect for cuddling!",
    funFact: "There are over 1,000 different Squishmallow characters!",
    relatedTo: ['plushies', 'collecting', 'cute'],
  },
  'kawaii': {
    explanation: "The Japanese word for 'cute' - think big eyes, pastel colors, and adorable faces!",
    funFact: "Hello Kitty is one of the most famous kawaii characters!",
    relatedTo: ['cute', 'Japanese culture', 'art style'],
  },

  // ===== DEFAULT FALLBACK =====
  '_default': {
    explanation: "Something cool you might want to learn more about!",
    funFact: "There are so many amazing things to discover in the world!",
  },
};

/**
 * Get a kid-friendly explanation for a concept
 */
export function getKidExplanation(concept: string): KidReference {
  const normalized = concept.toLowerCase().trim();
  
  // Try exact match first
  if (kidExplanations[normalized]) {
    return kidExplanations[normalized];
  }
  
  // Try partial match
  for (const [key, value] of Object.entries(kidExplanations)) {
    if (key === '_default') continue;
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }
  }
  
  // Generate a simple explanation based on the concept
  return {
    explanation: `${concept} - something cool you might want to check out!`,
    funFact: "Every day is a chance to learn something new!",
  };
}

/**
 * Modern, kid-safe references to replace outdated ones
 * Maps old/adult references → new kid-friendly alternatives
 */
export const modernReplacements: Record<string, string> = {
  // Replace outdated sports references
  'tony hawk move': 'skateboard flip trick',
  'tony hawk': 'pro skater trick',
  
  // Replace adult-leaning music references
  'rock concert': 'music concert',
  
  // Generic replacements for anything potentially unfamiliar
  'influencer': 'YouTuber',
  'celebrity': 'famous person',
};

/**
 * Replace any outdated references with kid-appropriate ones
 */
export function modernizeReference(text: string): string {
  let result = text;
  for (const [old, replacement] of Object.entries(modernReplacements)) {
    const regex = new RegExp(old, 'gi');
    result = result.replace(regex, replacement);
  }
  return result;
}
