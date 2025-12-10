import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { AppRoutes } from '../routes';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 text-center">
      <h1 className="text-6xl font-extrabold text-blue-500 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-300 mb-6">Page Not Found</p>
      <p className="text-lg text-gray-400 mb-8 max-w-md">The page you're looking for doesn't exist or an other error occurred. Go back to the homepage.</p>
      <Link to={AppRoutes.HOME}>
        <Button variant="primary_golden" className="px-8 py-3">Go to Homepage</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
