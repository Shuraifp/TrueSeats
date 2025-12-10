import { Suspense, lazy, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import type { UserRole } from './types';
import { AppRoutes } from './routes';

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
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

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
      <Suspense fallback={<LoadingSpinner msg='loading...' />}>
        <Routes>
          <Route path={AppRoutes.HOME} element={<HomePage />} />
          <Route path={AppRoutes.LOGIN} element={<LoginPage onLogin={handleLogin} />} />
          <Route path={AppRoutes.REGISTER} element={<RegisterPage onRegisterSuccess={handleRegisterSuccess} />} />
          <Route path={AppRoutes.EVENTS} element={<EventListPage />} />
          <Route path={AppRoutes.EVENT_DETAIL(':id')} element={<EventDetailPage />} />
          <Route path={AppRoutes.BOOKING_HISTORY} element={<BookingHistoryPage />} />
          {/* Admin Routes */}
          <Route path={AppRoutes.ADMIN_DASHBOARD} element={<AdminDashboardPage />} />
          <Route path={AppRoutes.ADMIN_CREATE_EVENT} element={<CreateEventPage />} />
          <Route path={AppRoutes.ADMIN_MANAGE_EVENTS} element={<ManageEventPage />} />
          <Route path={AppRoutes.ADMIN_EDIT_EVENT(':id')} element={<EditEventPage />} />
          <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
