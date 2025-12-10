import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import type { Event } from '../types';
import eventBGImg from '/assets/Event Management.jpg';
import { AppRoutes } from '../routes';
import toast from 'react-hot-toast';
import { api } from '../api/axios'; 
import { API_ROUTES } from '../constants/apiRoutes'; 
import LoadingSpinner from '../components/LoadingSpinner';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ticketsToBook, setTicketsToBook] = useState<number>(1);

  const fetchEventDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Event>(API_ROUTES.EVENTS.GET_BY_ID(id!));
      setEvent(response.data);
    } catch (err: any) {
      setError('Failed to fetch event details.');
      toast.error('Failed to fetch event details: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  const handleBookTicket = useCallback(async () => {
    if (!event) return;
    if (ticketsToBook <= 0 || ticketsToBook > event.availableSeats) {
      toast.error(`Please enter a valid number of tickets (1-${event.availableSeats}).`);
      return;
    }

    try {
      await api.post(API_ROUTES.EVENTS.BOOK_TICKET(event.id), { eventId: event.id, ticketsBooked: ticketsToBook });
      toast.success(`Successfully booked ${ticketsToBook} ticket(s) for ${event.title}!`);
      navigate(AppRoutes.BOOKING_HISTORY);
    } catch (err: any) {
      toast.error('Booking failed: ' + (err.response?.data?.message || err.message));
    }
  }, [event, ticketsToBook, navigate]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-white text-xl bg-gray-900"><LoadingSpinner msg='Loading event details...' /></div>;
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
          
          {event.availableSeats > 0 && (
            <div className="mb-4">
              <label htmlFor="ticketsToBook" className="block text-gray-400 text-sm font-medium mb-2">Tickets to Book:</label>
              <input
                id="ticketsToBook"
                type="number"
                min="1"
                max={event.availableSeats}
                value={ticketsToBook}
                onChange={(e) => setTicketsToBook(Number(e.target.value))}
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          <Button onClick={handleBookTicket} disabled={event.availableSeats <= 0 || ticketsToBook <= 0 || ticketsToBook > event.availableSeats} variant="primary_golden" className="mt-8 w-full">
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
