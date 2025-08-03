import { Mood } from '../types';

const moodTemplates: Record<string, string[]> = {
  happy: [
    "Living my best life! ✨",
    "Good vibes only 🌟",
    "Happiness looks good on me 😊",
    "Spreading sunshine wherever I go ☀️",
    "Choose joy, always 💫"
  ],
  aesthetic: [
    "Chasing golden hour vibes ✨",
    "Minimalist moments 🤍",
    "Soft life, softer energy 💭",
    "Beauty in simplicity 🌸",
    "Aesthetic appreciation activated 📸"
  ],
  savage: [
    "Main character energy 💅",
    "Sorry, can't relate to basic 🔥",
    "Confidence level: unbothered 😎",
    "Serving looks, not explanations 💋",
    "Too glam to give a damn ✨"
  ],
  travel: [
    "Wanderlust and city dust 🗺️",
    "Adventure awaits around every corner 🌍",
    "Collecting moments, not things ✈️",
    "Lost in the right direction 🧭",
    "Making memories across the globe 📍"
  ],
  romantic: [
    "Love is in the details 💕",
    "Heart full of dreams 💖",
    "Sweet moments like these 🌹",
    "Romance isn't dead, it's just evolved 💫",
    "Fairy tale vibes only ✨"
  ],
  chill: [
    "Just vibing through life 🌊",
    "Slow living, fast loving 🍃",
    "Peace, love, and good energy 🕊️",
    "Taking life one breath at a time 💨",
    "Calm mind, wild heart 🌙"
  ],
  motivational: [
    "Progress over perfection 💪",
    "Today's struggles are tomorrow's strengths 🌟",
    "Dream big, work hard, stay humble 🚀",
    "Your only limit is you 🔥",
    "Turning dreams into plans 📋"
  ],
  food: [
    "Food is my love language 🍕",
    "Eating my way to happiness 😋",
    "Good food, good mood 🍽️",
    "Calories don't count on weekends 🍰",
    "Fueling up for greatness 🥗"
  ]
};

export const generateCaptions = async (mood: string, imageContext?: string): Promise<string[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const templates = moodTemplates[mood] || moodTemplates.happy;
  const selectedCaptions = templates.slice(0, 4);
  
  // Add a dynamic caption based on context
  const contextCaptions = [
    `${mood.charAt(0).toUpperCase() + mood.slice(1)} vibes captured perfectly 📸`,
    `This moment deserves all the ${mood} energy ✨`,
    `Living that ${mood} lifestyle 🌟`,
    `${mood.charAt(0).toUpperCase() + mood.slice(1)} mood: activated 🔥`
  ];
  
  selectedCaptions.push(contextCaptions[Math.floor(Math.random() * contextCaptions.length)]);
  
  return selectedCaptions;
};

export const moods: Mood[] = [
  { id: 'happy', name: 'Happy', emoji: '😊', description: 'Joyful and upbeat' },
  { id: 'aesthetic', name: 'Aesthetic', emoji: '🌸', description: 'Artistic and beautiful' },
  { id: 'savage', name: 'Savage', emoji: '💅', description: 'Bold and confident' },
  { id: 'travel', name: 'Travel', emoji: '✈️', description: 'Adventure and exploration' },
  { id: 'romantic', name: 'Romantic', emoji: '💕', description: 'Love and affection' },
  { id: 'chill', name: 'Chill', emoji: '🌊', description: 'Relaxed and peaceful' },
  { id: 'motivational', name: 'Motivational', emoji: '💪', description: 'Inspiring and empowering' },
  { id: 'food', name: 'Food', emoji: '🍕', description: 'Delicious and tasty' }
];