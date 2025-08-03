import React from 'react';
import { moods } from '../services/captionService';
import { Mood } from '../types';

interface MoodSelectorProps {
  selectedMood: string;
  onMoodSelect: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodSelect }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Your Mood</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedMood === mood.id
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">{mood.emoji}</div>
              <div className="font-medium text-sm">{mood.name}</div>
              <div className="text-xs text-gray-500 mt-1">{mood.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;