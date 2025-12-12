import React from 'react';
import FeaturedEvents from '../components/FeaturedEvents';

const HomePage: React.FC = () => {
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="container mx-auto text-center py-12">
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="w-32 h-32 mb-4 bg-linear-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-5xl font-extrabold shadow-lg">
            🎉
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Your Gateway to Unforgettable Events
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Discover, experience, and book tickets for the best events happening around you.</p>
        </div>

         <FeaturedEvents />

        <footer className="text-gray-500 text-center text-sm mt-8">
          <p>TrueSeats</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
