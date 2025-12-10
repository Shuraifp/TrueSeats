import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppRoutes } from './routes';
import ProtectedRoute from './components/ProtectedRoute';
import { Role } from './constants';

const HomePage = lazy(() => import('./pages/HomePage'));
const SigninPage = lazy(() => import('./pages/SigninPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const EventListPage = lazy(() => import('./pages/EventListPage'));
const EventDetailPage = lazy(() => import('./pages/EventDetailPage'));
const BookingHistoryPage = lazy(() => import('./pages/BookingHistoryPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const CreateEventPage = lazy(() => import('./pages/CreateEventPage'));
const ManageEventPage = lazy(() => import('./pages/ManageEventPage'));
const EditEventPage = lazy(() => import('./pages/EditEventPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const queryClient = new QueryClient();

function AppContent() {
  const { isAuthenticated, userRole, logout } = useAuth();

  return (
    <>
      <Toaster />
      <Header isAuthenticated={isAuthenticated} userRole={userRole} onLogout={logout} />
      <Suspense fallback={<LoadingSpinner msg='loading...' />}>
        <Routes>
          <Route path={AppRoutes.HOME} element={<HomePage />} />
          <Route path={AppRoutes.SIGNIN} element={<SigninPage />} />
          <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
          <Route path={AppRoutes.EVENTS} element={<EventListPage />} />
          <Route path={AppRoutes.EVENT_DETAIL(':id')} element={<EventDetailPage />} />

          {/* Protected Routes for authenticated users */}
          <Route element={<ProtectedRoute />}>
            <Route path={AppRoutes.BOOKING_HISTORY} element={<BookingHistoryPage />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={[Role.Admin]} />}>
            <Route path={AppRoutes.ADMIN_DASHBOARD} element={<AdminDashboardPage />} />
            <Route path={AppRoutes.ADMIN_CREATE_EVENT} element={<CreateEventPage />} />
            <Route path={AppRoutes.ADMIN_MANAGE_EVENTS} element={<ManageEventPage />} />
            <Route path={AppRoutes.ADMIN_EDIT_EVENT(':id')} element={<EditEventPage />} />
          </Route>

          <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
