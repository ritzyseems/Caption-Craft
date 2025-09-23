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
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
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
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <Sparkles className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-600 text-center text-lg">
          Upload an image and select a mood to generate captions
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">Generated Captions</h3>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Generating...' : 'Generate Captions'}</span>
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
          <button
            onClick={handleGenerate}
            className="ml-auto text-red-600 hover:text-red-800 underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center p-8 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="text-blue-600 font-medium">Creating amazing captions for you...</p>
          </div>
        </div>
      )}

      {/* Generated Captions */}
      {captions.length > 0 && !loading && (
        <div className="grid gap-4">
          {captions.map((caption, index) => (
            <div 
              key={index}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between space-x-4">
                <p className="text-gray-800 leading-relaxed flex-1">
                  {caption}
                </p>
                
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => copyToClipboard(caption, index)}
                    className={`p-2 rounded-md transition-colors ${
                      copiedIndex === index 
                        ? 'bg-green-100 text-green-600' 
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                    title={copiedIndex === index ? 'Copied!' : 'Copy caption'}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => toggleFavorite(caption)}
                    className={`p-2 rounded-md transition-colors ${
                      favorites.has(caption)
                        ? 'bg-red-100 text-red-600'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                    title={favorites.has(caption) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart 
                      className={`w-4 h-4 ${favorites.has(caption) ? 'fill-current' : ''}`} 
                    />
                  </button>
                </div>
              </div>
              
              {copiedIndex === index && (
                <div className="mt-2 text-sm text-green-600 font-medium">
                  ✓ Copied to clipboard!
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* No Captions State */}
      {captions.length === 0 && !loading && !error && (
        <div className="text-center p-8 text-gray-500">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>Click "Generate Captions" to create engaging captions for your image!</p>
        </div>
      )}
    </div>
  );
};

export default CaptionGenerator;
