import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import EventCard from '../components/EventCard';
import { dummyEvents } from './EventListPage';
import { AppRoutes } from '../routes'; 

const HomePage: React.FC = () => {
  const featuredEvents = dummyEvents.slice(0, 3);

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

        {/* Featured Events Section */}
        <section className="py-12 bg-gray-800 rounded-lg shadow-xl mb-10">
          <h2 className="text-3xl font-bold text-white mb-8">Upcoming Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="mt-10">
            <Link to={AppRoutes.EVENTS}>
              <Button variant="secondary" className="text-lg px-8 py-3">Browse All Events</Button>
            </Link>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="text-gray-500 text-center text-sm mt-8">
          <p>TrueSeats</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
