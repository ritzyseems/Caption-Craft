import React, { useState } from 'react';
import { Copy, Heart, Sparkles, RefreshCw } from 'lucide-react';
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

  const handleGenerate = async () => {
    if (!image || !mood) return;

    setLoading(true);
    try {
      const generatedCaptions = await generateCaptions(mood);
      setCaptions(generatedCaptions);
    } catch (error) {
      console.error('Error generating captions:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (caption: string) => {
    navigator.clipboard.writeText(caption);
    // You could add a toast notification here
  };

  const toggleFavorite = (caption: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(caption)) {
      newFavorites.delete(caption);
    } else {
      newFavorites.add(caption);
      onSaveFavorite?.(caption);
    }
    setFavorites(newFavorites);
  };

  if (!image || !mood) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center text-gray-500">
          <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Upload an image and select a mood to generate captions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Generated Captions</h2>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Generating...' : 'Generate Captions'}</span>
        </button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 text-purple-600">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <span>Creating amazing captions for you...</span>
          </div>
        </div>
      )}

      {captions.length > 0 && (
        <div className="space-y-4">
          {captions.map((caption, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-purple-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <p className="text-gray-800 flex-1 pr-4">{caption}</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleFavorite(caption)}
                    className={`p-2 rounded-full transition-colors ${
                      favorites.has(caption)
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${favorites.has(caption) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={() => copyToClipboard(caption)}
                    className="p-2 rounded-full text-gray-400 hover:text-purple-600 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CaptionGenerator;