export const JWT_CONFIG = {
  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  ACCESS_EXPIRY: 15 * 60, // 15 minutes in seconds
  REFRESH_EXPIRY: 7 * 24 * 60 * 60, // 7 days in seconds
  REFRESH_EXPIRY_MS: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds for cookie maxAge
};