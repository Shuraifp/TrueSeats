import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import type { UserRole } from '../types';
import { Role } from '../constants';
import { AppRoutes } from '../routes'; // Import AppRoutes

interface HeaderProps {
    isAuthenticated: boolean;
    userRole: UserRole | null;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, userRole, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        onLogout();
        navigate(AppRoutes.HOME);
    }, [onLogout, navigate]);

    return (
        <nav className="bg-gray-700 p-4 text-gray-300">
            <div className="container mx-auto flex justify-between items-center">
                <Link to={AppRoutes.HOME} className="text-2xl font-bold text-cyan-300">TrueSeats</Link>
                <div className="space-x-4">
                    {!isAuthenticated ? (
                        <>
                            <Link to={AppRoutes.LOGIN}>
                                <Button variant="secondary">Login</Button>
                            </Link>
                            <Link to={AppRoutes.REGISTER}>
                                <Button>Register</Button>
                            </Link>
                        </>
                    ) : (
                        <>
                            {userRole === Role.Admin && (
                                <Link to={AppRoutes.ADMIN_DASHBOARD}>
                                    <Button variant="secondary">Admin Dashboard</Button>
                                </Link>
                            )}
                            <Link to={AppRoutes.EVENTS}>
                                <Button variant="secondary">Events</Button>
                            </Link>
                            <Link to={AppRoutes.BOOKING_HISTORY}>
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
