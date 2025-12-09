import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { Booking } from '../types';

const dummyBookings: Booking[] = [
  {
    id: 101,
    eventName: 'Concert in the Park',
    eventDate: '2025-12-25',
    ticketsBooked: 2,
    bookingDate: '2025-12-01',
  },
  {
    id: 102,
    eventName: 'Tech Conference 2026',
    eventDate: '2026-01-15',
    ticketsBooked: 1,
    bookingDate: '2025-11-15',
  },
];

const BookingHistoryPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookingHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call to fetch user's booking history
      await new Promise(resolve => setTimeout(resolve, 500));
      setBookings(dummyBookings);
    } catch (err) {
      setError('Failed to fetch booking history.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookingHistory();
  }, [fetchBookingHistory]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-xl">Loading booking history...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
  if (bookings.length === 0) return <div className="flex justify-center items-center min-h-screen text-xl">No bookings found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Booking History</h1>
      <div className="grid grid-cols-1 gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden p-6">
            <h2 className="text-xl font-semibold mb-2">{booking.eventName}</h2>
            <p className="text-gray-600 text-sm mb-1">Date: {booking.eventDate}</p>
            <p className="text-gray-600 text-sm mb-1">Tickets: {booking.ticketsBooked}</p>
            <p className="text-gray-600 text-sm">Booked On: {booking.bookingDate}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link to="/events">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Browse More Events
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BookingHistoryPage;
