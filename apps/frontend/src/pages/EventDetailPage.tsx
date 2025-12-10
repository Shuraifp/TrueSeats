import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import type { Event } from '../types';
import eventBGImg from '/assets/Event Management.jpg';
import { AppRoutes } from '../routes';
import toast from 'react-hot-toast';

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
        toast.error('Event not found.');
      }
    } catch (err) {
      setError('Failed to fetch event details.');
      toast.error('Failed to fetch event details.');
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
      toast.success(`Ticket booked for ${event.title}! (Simulation)`);
      navigate(AppRoutes.BOOKING_HISTORY); // Redirect to booking history after booking
    }
  }, [event, navigate]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-white text-xl bg-gray-900">Loading event details...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500 bg-gray-900">Error: {error}</div>;
  if (!event) return <div className="flex justify-center items-center min-h-screen text-white text-xl bg-gray-900">No event data available.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col md:flex-row">
      {/* Background Image Section */}
      <div
        className="w-full md:w-1/2 bg-cover bg-center h-64 md:h-auto"
        style={{
          backgroundImage: `url(${eventBGImg})`,
          minHeight: '300px',
        }}
      ></div>

      {/* Event Details Section */}
      <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
        <div className="p-8 max-w-2xl w-full mx-auto md:mx-0">
          <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">{event.title}</h1>
          <p className="text-lg text-gray-300 mb-6">{event.description}</p>
          <p className="text-md text-gray-400 mb-2">Date: <span className="font-semibold text-cyan-300">{event.date}</span></p>
          <p className="text-md text-gray-400 mb-6">Available Seats: <span className="font-semibold text-yellow-400">{event.availableSeats}</span></p>
          <Button onClick={handleBookTicket} disabled={event.availableSeats <= 0} variant="primary_golden" className="mt-8 w-full">
            {event.availableSeats > 0 ? 'Book Ticket' : 'Sold Out'}
          </Button>
          <Button onClick={() => navigate(AppRoutes.EVENTS)} variant="secondary" className="ml-0 md:ml-4 mt-2 md:mt-8 w-full md:w-auto">
            Back to Events
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
