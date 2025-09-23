import React, { useState } from 'react';
import { Copy, Heart, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { generateCaptions } from '../services/captionService';

interface CaptionGeneratorProps {
  image: File | null;
  mood: string;
  onSaveFavorite?: (caption: string) => void;
}

const CaptionGenerator: React.FC<CaptionGeneratorProps> = ({ 
  image, 
  mood, 
  onSaveFavorite 
}) => {
  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string>('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!image || !mood) return;

    setLoading(true);
    setError('');
    
    try {
      const generatedCaptions = await generateCaptions(mood, image);
      
      if (generatedCaptions.length === 0) {
        throw new Error('No captions generated');
      }
      
      setCaptions(generatedCaptions);
    } catch (error) {
      console.error('Error generating captions:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate captions');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (caption: string, index: number) => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopiedIndex(index);
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = caption;
      document.body.appendChild(textArea);
      textArea.select();
   
