import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import type { Event } from '../types';

// Reusing dummy events for consistency
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

const ManageEventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call to fetch all events
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

  const handleDeleteEvent = useCallback(async (eventId: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      console.log(`Deleting event with ID: ${eventId}`);
      // Simulate API call for deletion
      await new Promise(resolve => setTimeout(resolve, 500));
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      alert('Event deleted successfully! (Simulation)');
    }
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-xl">Loading events...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
  if (events.length === 0) return <div className="flex justify-center items-center min-h-screen text-xl">No events to manage.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Events</h1>
      <div className="grid grid-cols-1 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden p-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600 text-sm">Date: {event.date}</p>
              <p className="text-gray-600 text-sm">Available Seats: {event.availableSeats}</p>
            </div>
            <div className="flex space-x-2">
              <Link to={`/admin/events/edit/${event.id}`}>
                <Button variant="secondary">Edit</Button>
              </Link>
              <Button variant="danger" onClick={() => handleDeleteEvent(event.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageEventPage;
