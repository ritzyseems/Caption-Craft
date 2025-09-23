import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Mood-based prompt templates for enhanced caption generation
const MOOD_PROMPTS = {
  happy: "Create a joyful, upbeat caption that radiates positivity and happiness",
  aesthetic: "Generate an artistic, beautiful caption with sophisticated and dreamy vibes", 
  savage: "Write a bold, confident caption with attitude and fierce energy",
  travel: "Craft an adventurous caption about exploration and wanderlust",
  romantic: "Create a loving, affectionate caption full of warmth and romance",
  chill: "Write a relaxed, peaceful caption with laid-back vibes",
  motivational: "Generate an inspiring, empowering caption that motivates and uplifts",
  food: "Create a delicious, mouth-watering caption about tasty experiences"
};

interface CaptionRequest {
  imageUrl?: string;
  imageBase64?: string;
  mood: keyof typeof MOOD_PROMPTS;
}

serve(async (req) => {
  try {
    // Handle CORS for frontend requests
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    const { imageUrl, imageBase64, mood }: CaptionRequest = await req.json();
    
    if (!mood || !MOOD_PROMPTS[mood]) {
      throw new Error('Invalid or missing mood parameter');
    }

    // Prepare image data for Hugging Face API
    let imageData;
    if (imageBase64) {
      imageData = imageBase64;
    } else if (imageUrl) {
      // Fetch image and convert to base64
      const imageResponse = await fetch(imageUrl);
      const imageBuffer = await imageResponse.arrayBuffer();
      imageData = btoa(String.fromCharCode(...new Uint8A

