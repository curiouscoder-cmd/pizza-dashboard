import { z } from 'zod'

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

// Email validation schema
export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required')

// Sign up form validation
export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// Sign in form validation
export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
})

// Forgot password form validation
export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

// Reset password form validation
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// Schedule delivery form validation
export const scheduleDeliverySchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  customerName: z.string().min(2, 'Customer name must be at least 2 characters'),
  customerPhone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  address: z.string().min(10, 'Please enter a complete address'),
  scheduledDate: z.string().min(1, 'Scheduled date is required'),
  scheduledTime: z.string().min(1, 'Scheduled time is required'),
  estimatedDuration: z.number().min(10, 'Duration must be at least 10 minutes').max(120, 'Duration cannot exceed 120 minutes'),
  driverName: z.string().min(1, 'Please select a driver'),
  priority: z.enum(['low', 'medium', 'high'], {
    required_error: 'Please select a priority level'
  }),
  items: z.array(z.string()).min(1, 'At least one item is required'),
  notes: z.string().optional()
})

// Add customer form validation
export const addCustomerSchema = z.object({
  name: z
    .string()
    .min(2, 'Customer name must be at least 2 characters')
    .max(50, 'Customer name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s\-\.\']+$/, 'Name can only contain letters, numbers, spaces, hyphens, periods, and apostrophes'),
  email: emailSchema,
  phone: z
    .string()
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits'),
  address: z
    .string()
    .min(10, 'Please enter a complete address')
    .max(200, 'Address must be less than 200 characters'),
  status: z.enum(['active', 'inactive', 'vip'], {
    required_error: 'Please select a customer status'
  }),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional()
})

// Type exports
export type SignUpFormData = z.infer<typeof signUpSchema>
export type SignInFormData = z.infer<typeof signInSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>
export type ScheduleDeliveryFormData = z.infer<typeof scheduleDeliverySchema>
export type AddCustomerFormData = z.infer<typeof addCustomerSchema>

// Password strength checker
export const checkPasswordStrength = (password: string): {
  score: number
  feedback: string[]
} => {
  const feedback: string[] = []
  let score = 0

  if (password.length >= 8) score += 1
  else feedback.push('Use at least 8 characters')

  if (/[A-Z]/.test(password)) score += 1
  else feedback.push('Add uppercase letters')

  if (/[a-z]/.test(password)) score += 1
  else feedback.push('Add lowercase letters')

  if (/[0-9]/.test(password)) score += 1
  else feedback.push('Add numbers')

  if (/[^A-Za-z0-9]/.test(password)) score += 1
  else feedback.push('Add special characters')

  return { score, feedback }
}

// Get password strength label
export const getPasswordStrengthLabel = (score: number): string => {
  switch (score) {
    case 0:
    case 1:
      return 'Very Weak'
    case 2:
      return 'Weak'
    case 3:
      return 'Fair'
    case 4:
      return 'Good'
    case 5:
      return 'Strong'
    default:
      return 'Very Weak'
  }
}

// Get password strength color
export const getPasswordStrengthColor = (score: number): string => {
  switch (score) {
    case 0:
    case 1:
      return 'text-red-600'
    case 2:
      return 'text-orange-600'
    case 3:
      return 'text-yellow-600'
    case 4:
      return 'text-blue-600'
    case 5:
      return 'text-green-600'
    default:
      return 'text-red-600'
  }
}
