import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import MoodSelector from './MoodSelector';
import CaptionGenerator from './CaptionGenerator';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>('');
  const { user } = useAuth();

  const handleSaveFavorite = (caption: string) => {
    // Here you would typically save to your database
    console.log('Saving favorite caption:', caption);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user ? `Welcome back, ${user.username}!` : 'Create Amazing Captions'}
          </h1>
          <p className="text-gray-600">
            Upload your image, choose your mood, and let the magic happen
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ImageUpload
              onImageSelect={setSelectedImage}
              selectedImage={selectedImage}
            />
            
            <MoodSelector
              selectedMood={selectedMood}
              onMoodSelect={setSelectedMood}
            />
          </div>
          
          <div>
            <CaptionGenerator
              image={selectedImage}
              mood={selectedMood}
              onSaveFavorite={handleSaveFavorite}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;