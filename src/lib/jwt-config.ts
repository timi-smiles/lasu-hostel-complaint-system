// JWT Configuration
export const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET,
  EXPIRES_IN: 7 * 24 * 60 * 60, // 7 days in seconds
  COOKIE_NAME: 'auth-token'
} as const

// Helper function to get JWT secret
export const getJWTSecret = (): string => {
  if (!JWT_CONFIG.SECRET) {
    throw new Error('JWT_SECRET environment variable is not defined');
  }
  return JWT_CONFIG.SECRET;
}