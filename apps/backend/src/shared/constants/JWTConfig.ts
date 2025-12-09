export const JWT_CONFIG = {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET, 
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ACCESS_EXPIRY: '15m',
    REFRESH_EXPIRY: '7d',
  };