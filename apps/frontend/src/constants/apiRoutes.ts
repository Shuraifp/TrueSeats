export const API_ROUTES = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout',
  },
  EVENTS: {
    GET_ALL: '/events',
    GET_BY_ID: (id: string | number) => `/events/${id}`,
    CREATE: '/events',
    UPDATE: (id: string | number) => `/events/${id}`,
    BOOK_TICKET: (id: string | number) => `/events/${id}/book`,
    USER_BOOKING_HISTORY: '/events/bookings/me',
    ADMIN_ALL_BOOKINGS: '/events/bookings',
  },
};
