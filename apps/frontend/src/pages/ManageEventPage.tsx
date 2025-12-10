import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import type { Event } from '../types';
import { AppRoutes } from '../routes';
import toast from 'react-hot-toast';
import { api } from '../api/axios'; // Import the API instance
import { API_ROUTES } from '../constants/apiRoutes'; // Import API routes
import LoadingSpinner from '../components/LoadingSpinner';

const ManageEventPage: React.FC = () => {
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

  const handleDeleteEvent = useCallback(async (eventId: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(API_ROUTES.EVENTS.UPDATE(eventId)); // Using UPDATE route for DELETE as well
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        toast.success('Event deleted successfully!');
      } catch (err: any) {
        toast.error('Failed to delete event: ' + (err.response?.data?.message || err.message));
      }
    }
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-white text-xl bg-gray-900"><LoadingSpinner msg='Loading events...' /></div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500 bg-gray-900">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Manage Events</h1>
        <div className="grid grid-cols-1 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.id} className="bg-gray-800 border border-gray-700 rounded-lg shadow-md overflow-hidden p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">{event.title}</h2>
                  <p className="text-gray-300 text-sm">Date: <span className="font-medium text-cyan-300">{new Date(event.date).toLocaleDateString()}</span></p>
                  <p className="text-gray-300 text-sm">Available Seats: <span className="font-medium text-yellow-400">{event.availableSeats}</span></p>
                </div>
                <div className="flex space-x-2">
                  <Link to={AppRoutes.ADMIN_EDIT_EVENT(event.id)}>
                    <Button variant="secondary">Edit</Button>
                  </Link>
                  <Button variant="danger" onClick={() => handleDeleteEvent(event.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">No events to manage.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageEventPage;
