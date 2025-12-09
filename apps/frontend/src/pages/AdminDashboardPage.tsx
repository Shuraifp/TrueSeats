import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        <div className="space-y-4">
          <Link to="/admin/events/create">
            <Button className="w-full">Create New Event</Button>
          </Link>
          <Link to="/admin/events/manage">
            <Button variant="secondary" className="w-full">Manage Existing Events</Button>
          </Link>
          {/* Optional: Link to view bookings */}
          {/* <Link to="/admin/bookings">
            <Button variant="secondary" className="w-full">View All Bookings</Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
