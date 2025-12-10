import React, { useState, useEffect, useCallback } from 'react';
import EventCard from '../components/EventCard';
import type { Event } from '../types';
import toast from 'react-hot-toast';

export const dummyEvents: Event[] = [
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
      toast.error('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-white text-xl bg-gray-900">Loading events...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500 bg-gray-900">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Events await you</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventListPage;
