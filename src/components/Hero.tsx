import React from 'react';
import { Sparkles, Camera, Heart, Zap } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-6">
              <Camera className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Create Perfect
            <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Social Media Captions
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Upload your photos, choose your vibe, and let AI craft trendy, engaging captions that perfectly match your style
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={onGetStarted}
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started for Free
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200">
              Watch Demo
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                <Sparkles className="h-8 w-8 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
                <p className="text-white/80">Smart algorithms analyze your photos and generate perfect captions</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                <Zap className="h-8 w-8 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
                <p className="text-white/80">Get multiple caption options in seconds, tailored to your mood</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                <Heart className="h-8 w-8 mx-auto mb-4 text-pink-300" />
                <h3 className="text-xl font-semibold mb-2">Save Favorites</h3>
                <p className="text-white/80">Keep your favorite captions organized in your personal library</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;