export const API_ROUTES = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
  },
  EVENTS: '/events',
  EVENT_BY_ID: (id: string | number) => `/events/${id}`,
  // Add other API routes as needed
};
