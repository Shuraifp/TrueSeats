import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to TrueSeats</h1>
        <p className="text-lg text-gray-600 mb-8">Your one-stop platform for event tickets.</p>
        <div className="space-y-4">
          <Link to="/login">
            <Button className="w-full">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="secondary" className="w-full">Register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
