import { Suspense, lazy, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import type { UserRole } from './types';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const EventListPage = lazy(() => import('./pages/EventListPage'));
const EventDetailPage = lazy(() => import('./pages/EventDetailPage'));
const BookingHistoryPage = lazy(() => import('./pages/BookingHistoryPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const CreateEventPage = lazy(() => import('./pages/CreateEventPage'));
const ManageEventPage = lazy(() => import('./pages/ManageEventPage'));
const EditEventPage = lazy(() => import('./pages/EditEventPage'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const handleLogin = useCallback((role: UserRole) => {
    setIsAuthenticated(true);
    setUserRole(role);
  }, []);

  const handleRegisterSuccess = useCallback((role: UserRole) => {
    console.log(`User registered with role: ${role}. Redirecting to login.`);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setUserRole(null);
  }, []);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} userRole={userRole} onLogout={handleLogout} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage onRegisterSuccess={handleRegisterSuccess} />} />
          <Route path="/events" element={<EventListPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/booking-history" element={<BookingHistoryPage />} />
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/events/create" element={<CreateEventPage />} />
          <Route path="/admin/events/manage" element={<ManageEventPage />} />
          <Route path="/admin/events/edit/:id" element={<EditEventPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
