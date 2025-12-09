import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import type { Event } from '../types';

const dummyEvents: Event[] = [
  {
    id: 1,
    title: 'Concert in the Park',
    description: 'An evening of live music under the stars.',
    date: '2025-12-25',
    availableSeats: 150,
  },
  {
    id: 2,
    title: 'Tech Conference 2026',
    description: 'Discover the latest in technology and innovation.',
    date: '2026-01-15',
    availableSeats: 300,
  },
  {
    id: 3,
    title: 'Art Exhibition: Modern Visions',
    description: 'A collection of contemporary art from local artists.',
    date: '2026-02-10',
    availableSeats: 80,
  },
];

const EventListPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setEvents(dummyEvents);
    } catch (err) {
      setError('Failed to fetch events.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-xl">Loading events...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Available Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <p className="text-gray-700 text-sm mb-2">Date: {event.date}</p>
              <p className="text-gray-700 text-sm mb-4">Seats Left: {event.availableSeats}</p>
              <Link to={`/events/${event.id}`}>
                <Button className="w-full">View Details</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventListPage;
