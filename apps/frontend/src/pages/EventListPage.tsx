import React, { useState, useEffect, useCallback } from 'react';
import EventCard from '../components/EventCard';
import type { Event } from '../types';
import toast from 'react-hot-toast';
import { api } from '../api/axios'; // Import the API instance
import { API_ROUTES } from '../constants/apiRoutes'; // Import API routes
import LoadingSpinner from '../components/LoadingSpinner';

const EventListPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Event[]>(API_ROUTES.EVENTS.GET_ALL);
      setEvents(response.data);
    } catch (err: any) {
      setError('Failed to fetch events.');
      toast.error('Failed to fetch events: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-white text-xl bg-gray-900"><LoadingSpinner msg='Loading events...' /></div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500 bg-gray-900">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Events await you</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventListPage;
