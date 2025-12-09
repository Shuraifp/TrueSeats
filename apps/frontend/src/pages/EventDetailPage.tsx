import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEventDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const foundEvent = dummyEvents.find((e) => e.id === Number(id));
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        setError('Event not found.');
      }
    } catch (err) {
      setError('Failed to fetch event details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  const handleBookTicket = useCallback(async () => {
    if (event) {
      // Simulate booking API call
      console.log(`Booking ticket for event: ${event.title}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Ticket booked for ${event.title}! (Simulation)`);
      navigate('/booking-history'); // Redirect to booking history after booking
    }
  }, [event, navigate]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-xl">Loading event details...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
  if (!event) return <div className="flex justify-center items-center min-h-screen text-xl">No event data available.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h1>
        <p className="text-gray-700 mb-4">{event.description}</p>
        <p className="text-gray-600 text-sm mb-2">Date: {event.date}</p>
        <p className="text-gray-600 text-sm mb-4">Available Seats: {event.availableSeats}</p>
        <Button onClick={handleBookTicket} disabled={event.availableSeats <= 0} className="mt-4">
          {event.availableSeats > 0 ? 'Book Ticket' : 'Sold Out'}
        </Button>
        <Button onClick={() => navigate('/events')} variant="secondary" className="ml-4 mt-4">
          Back to Events
        </Button>
      </div>
    </div>
  );
};

export default EventDetailPage;
