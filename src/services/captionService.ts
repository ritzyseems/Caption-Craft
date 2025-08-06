import { Mood } from '../types';

// ⚠️ DON'T push this code to public GitHub repos unless you hide the key properly
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const generateCaptions = async (mood: string, imageContext?: string): Promise<string[]> => {
  const prompt = `
Generate 5 short, fun, and creative Instagram captions for the mood: "${mood}".
${imageContext ? `This is the image context: "${imageContext}".` : ''}
Keep them trendy and suitable for social media.
Avoid emojis and hashtags.
Return them as a plain list, no extra commentary.
`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    console.error('OpenAI error:', await response.text());
    throw new Error('Failed to fetch captions');
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';

  const captions = content
    .split('\n')
    .map((line: string) => line.replace(/^\d+[\).\s]*/, '').trim())
    .filter(Boolean);

  return captions;
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
