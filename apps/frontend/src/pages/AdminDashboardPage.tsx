import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { AppRoutes } from '../routes'; // Import AppRoutes

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="container mx-auto text-center py-12">
        <h1 className="text-4xl font-extrabold text-white mb-10 tracking-tight">Admin Control Center</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Create Event Card */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Create New Event</h2>
            <p className="text-gray-300 mb-6">Add new events to the platform, set details and initial seat availability.</p>
            <Link to={AppRoutes.ADMIN_CREATE_EVENT}>
              <Button variant="primary_golden" className="w-full">Go to Creator</Button>
            </Link>
          </div>

          {/* Manage Events Card */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">Manage Existing Events</h2>
            <p className="text-gray-300 mb-6">Edit event details, modify seat availability, or delete events.</p>
            <Link to={AppRoutes.ADMIN_MANAGE_EVENTS}>
              <Button variant="secondary" className="w-full">Go to Manager</Button>
            </Link>
          </div>

          {/* Optional: View Bookings Card */}
          {/* <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">View All Bookings</h2>
            <p className="text-gray-300 mb-6">Review all ticket bookings made across the platform.</p>
            <Link to={AppRoutes.ADMIN_VIEW_BOOKINGS}>
              <Button variant="secondary" className="w-full">View Bookings</Button>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
