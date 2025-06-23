// lib/security.ts - Add these immediately
import rateLimit from 'express-rate-limit'


// Rate limiting for API routes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
})