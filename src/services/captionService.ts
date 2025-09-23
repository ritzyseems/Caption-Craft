import { Mood } from '../types';

// Updated service to use Hugging Face via Supabase Edge Function
export const generateCaptions = async (
  mood: string, 
  imageFile?: File,
  imageUrl?: string
): Promise<string[]> => {
  try {
    // Convert image file to base64 if provided
    let imageBase64: string | undefined;
    if (imageFile) {
      imageBase64 = await fileToBase64(imageFile);
    }

    // For now, return fallback captions until we set up Hugging Face properly
    return getFallbackCaptions(mood);

  } catch (error) {
    console.error('Error generating captions:', error);
    return getFallbackCaptions(mood);
  }
};

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Fallback captions when API fails
const getFallbackCaptions = (mood: string): string[] => {
  const fallbacks: Record<string, string[]> = {
    happy: [
      "Living my best life ✨",
      "Pure happiness captured",
      "Smiling through it all 😊",
      "Joy in every moment"
    ],
    aesthetic: [
      "Dreamy vibes only 🌸",
      "Artistic perfection",
      "Captured in golden light ✨",
      "Ethereal moments"
    ],
    savage: [
      "Confidence level: unbothered 💅",
      "Serving main character energy",
      "Effortlessly slaying 🔥",
      "Unbothered and unstoppable"
    ],
    travel: [
      "Adventure mode: ON ✈️",
      "Wanderlust fulfilled",
      "Making memories worldwide 🗺️",
      "Passport ready for more"
    ],
    romantic: [
      "Love fills the air 💕",
      "Heart completely full",
      "Perfect moment together ❤️",
      "Romance at its finest"
    ],
    chill: [
      "Good vibes only 🌊",
      "Taking it easy",
      "Peaceful moments ☮️",
      "Zen mode activated"
    ],
    motivational: [
      "You got this! 💪",
      "Dream big, achieve bigger",
      "Unstoppable energy ⭐",
      "Making it happen"
    ],
    food: [
      "Taste of heaven 🍕",
      "Foodie paradise found",
      "Delicious moments 😋",
      "Savoring every bite"
    ]
  };

  return fallbacks[mood] || ["Perfect moment captured ✨"];
};

// Your existing moods array
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
