import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import type { UserRole } from '../types';

interface HeaderProps {
    isAuthenticated: boolean;
    userRole: UserRole | null;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, userRole, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        onLogout();
        navigate('/');
    }, [onLogout, navigate]);

    return (
        <nav className="bg-gray-700 p-4 text-gray-300">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-cyan-300">TrueSeats</Link>
                <div className="space-x-4">
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login">
                                <Button variant="secondary">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button>Register</Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            {userRole === 'admin' && (
                                <Link to="/admin/dashboard">
                                    <Button variant="secondary">Admin Dashboard</Button>
                                </Link>
                            )}
                            <Link to="/events">
                                <Button variant="secondary">Events</Button>
                            </Link>
                            <Link to="/booking-history">
                                <Button variant="secondary">My Bookings</Button>
                            </Link>
                            <Button onClick={handleLogout} variant="logout">Logout</Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
