import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import type { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-white mb-2">{event.title}</h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{event.description}</p>
        <p className="text-gray-300 text-sm mb-2">Date: <span className="font-medium text-cyan-300">{event.date.split('T')[0]}</span></p>
        <p className="text-gray-300 text-sm mb-4">Seats Available: <span className="font-medium text-yellow-400">{event.availableSeats}</span></p>
        <Link to={`/events/${event.id}`}>
          <Button variant="primary_golden" className="w-full mt-4">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
