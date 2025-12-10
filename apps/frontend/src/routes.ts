export const AppRoutes = {
  HOME: '/',
  SIGNIN: '/signin',
  REGISTER: '/register',
  EVENTS: '/events',
  EVENT_DETAIL: (id: string | number) => `/events/${id}`,
  BOOKING_HISTORY: '/booking-history',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_CREATE_EVENT: '/admin/events/create',
  ADMIN_MANAGE_EVENTS: '/admin/events/manage',
  ADMIN_EDIT_EVENT: (id: string | number) => `/admin/events/edit/${id}`,
  NOT_FOUND: '*',
};
