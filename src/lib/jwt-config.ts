// JWT Configuration
export const JWT_CONFIG = {
  SECRET: process.env.NEXT_PUBLIC_JWT_SECRET,
  EXPIRES_IN: 7 * 24 * 60 * 60, // 7 days in seconds
  COOKIE_NAME: 'auth-token'
} as const

// Helper function to get JWT secret
export function getJWTSecret(): string {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET
  
  console.log('JWT_SECRET check:', {
    exists: !!secret,
    length: secret?.length,
    value: secret?.substring(0, 10) + '...' // Log first 10 chars for debugging
  })
  
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not defined')
  }
  return secret
}