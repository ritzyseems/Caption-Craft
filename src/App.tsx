import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import AuthModal from './components/AuthModal';
import { useAuth } from './hooks/useAuth';

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const { user, loading } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      setShowDashboard(true);
    } else {
      setShowAuth(true);
    }
  };

  const handleAuthClose = () => {
    setShowAuth(false);
    if (user) {
      setShowDashboard(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAuthClick={() => setShowAuth(true)} />
      
      {showDashboard || user ? (
        <Dashboard />
      ) : (
        <Hero onGetStarted={handleGetStarted} />
      )}
      
      <AuthModal 
        isOpen={showAuth} 
        onClose={handleAuthClose}
      />
    </div>
  );
}

export default App;