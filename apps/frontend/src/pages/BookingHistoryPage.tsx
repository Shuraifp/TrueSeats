import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { Booking } from '../types';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { AppRoutes } from '../routes'; // Import AppRoutes
import toast from 'react-hot-toast';
import { api } from '../api/axios'; // Import the API instance
import { API_ROUTES } from '../constants/apiRoutes'; // Import API routes

const BookingHistoryPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookingHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Booking[]>(API_ROUTES.EVENTS.USER_BOOKING_HISTORY);
      setBookings(response.data);
    } catch (err: any) {
      setError('Failed to fetch booking history.');
      toast.error('Failed to fetch booking history: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookingHistory();
  }, [fetchBookingHistory]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-white text-xl bg-gray-900"><LoadingSpinner msg='Loading booking history...' /></div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500 bg-gray-900">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Your Booking History</h1>
        <div className="grid grid-cols-1 gap-4">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-gray-800 border border-gray-700 rounded-lg shadow-md overflow-hidden p-6">
                <h2 className="text-xl font-semibold text-white mb-2">{booking.eventName || `Event ID: ${booking.eventId}`}</h2>
                <p className="text-gray-300 text-sm mb-1">Date: <span className="font-medium text-cyan-300">{new Date(booking.eventDate || '').toLocaleDateString()}</span></p>
                <p className="text-gray-300 text-sm mb-1">Tickets: <span className="font-medium text-yellow-400">{booking.ticketsBooked}</span></p>
                <p className="text-gray-300 text-sm">Booked On: <span className="font-medium">{new Date(booking.bookingDate).toLocaleDateString()}</span></p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-full">No bookings found.</p>
          )}
        </div>
        <div className="text-center mt-6">
          <Link to={AppRoutes.EVENTS}>
            <Button variant="primary_golden" className="text-lg px-8 py-3">
              Browse More Events
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryPage;
