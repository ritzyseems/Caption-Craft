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

    // Call your Supabase Edge Function
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generateCaption`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          mood,
          imageBase64: imageBase64?.split(','), // Remove data:image/jpeg;base64, prefix
          imageUrl
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate captions');
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Caption generation failed');
    }

    return data.captions || [];

  } catch (error) {
    console.error('Error generating captions:', error);
    
    // Fallback captions based on mood
    return getFallbackCaptions(mood);
  }
};

// Alternative direct Hugging Face API approach (if you prefer client-side calls)
export const generateCaptionsDirectHF = async (
  mood: string,
  imageFile: File
): Promise<string[]> => {
  const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;
  
  if (!HF_TOKEN) {
    throw new Error('Hugging Face API token not configured');
  }

  try {
    // Convert image to blob for HF API
    const imageBlob = new Blob([imageFile], { type: imageFile.type 
