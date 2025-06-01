import bcrypt from 'bcrypt'
import { randomBytes } from 'crypto'

export interface User {
  id: string
  email: string
  password: string
  name: string
  emailVerified: boolean
  verificationToken?: string
  resetToken?: string
  resetTokenExpiry?: Date
  createdAt: Date
  image?: string
}

// In-memory storage for demonstration (in production, use a real database)
const users: Map<string, User> = new Map()
const usersByEmail: Map<string, User> = new Map()

// Rate limiting storage
const loginAttempts: Map<string, { count: number; lastAttempt: Date }> = new Map()
const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

export class UserStorage {
  static async createUser(email: string, password: string, name: string): Promise<User> {
    if (usersByEmail.has(email)) {
      throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const verificationToken = randomBytes(32).toString('hex')
    
    const user: User = {
      id: randomBytes(16).toString('hex'),
      email,
      password: hashedPassword,
      name,
      emailVerified: false,
      verificationToken,
      createdAt: new Date(),
    }

    users.set(user.id, user)
    usersByEmail.set(email, user)

    return user
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    return usersByEmail.get(email) || null
  }

  static async findUserById(id: string): Promise<User | null> {
    return users.get(id) || null
  }

  static async verifyPassword(email: string, password: string): Promise<User | null> {
    // Check rate limiting
    const attempts = loginAttempts.get(email)
    if (attempts && attempts.count >= MAX_LOGIN_ATTEMPTS) {
      const timeSinceLastAttempt = Date.now() - attempts.lastAttempt.getTime()
      if (timeSinceLastAttempt < LOCKOUT_DURATION) {
        throw new Error('Too many login attempts. Please try again later.')
      } else {
        // Reset attempts after lockout period
        loginAttempts.delete(email)
      }
    }

    const user = usersByEmail.get(email)
    if (!user) {
      this.recordFailedAttempt(email)
      return null
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      this.recordFailedAttempt(email)
      return null
    }

    // Reset failed attempts on successful login
    loginAttempts.delete(email)
    return user
  }

  static recordFailedAttempt(email: string): void {
    const attempts = loginAttempts.get(email) || { count: 0, lastAttempt: new Date() }
    attempts.count += 1
    attempts.lastAttempt = new Date()
    loginAttempts.set(email, attempts)
  }

  static async verifyEmail(token: string): Promise<User | null> {
    for (const user of users.values()) {
      if (user.verificationToken === token) {
        user.emailVerified = true
        user.verificationToken = undefined
        return user
      }
    }
    return null
  }

  static async generateResetToken(email: string): Promise<string | null> {
    const user = usersByEmail.get(email)
    if (!user) return null

    const resetToken = randomBytes(32).toString('hex')
    user.resetToken = resetToken
    user.resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

    return resetToken
  }

  static async resetPassword(token: string, newPassword: string): Promise<boolean> {
    for (const user of users.values()) {
      if (user.resetToken === token && user.resetTokenExpiry && user.resetTokenExpiry > new Date()) {
        user.password = await bcrypt.hash(newPassword, 12)
        user.resetToken = undefined
        user.resetTokenExpiry = undefined
        return true
      }
    }
    return false
  }

  static async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const user = users.get(id)
    if (!user) return null

    Object.assign(user, updates)
    return user
  }

  // Utility method to get all users (for debugging)
  static getAllUsers(): User[] {
    return Array.from(users.values())
  }

  // Simulate email sending (in production, use real email service)
  static async sendVerificationEmail(user: User): Promise<void> {
    console.log(`📧 Verification email sent to ${user.email}`)
    console.log(`Verification link: http://localhost:3002/auth/verify-email?token=${user.verificationToken}`)
  }

  static async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    console.log(`📧 Password reset email sent to ${email}`)
    console.log(`Reset link: http://localhost:3002/auth/reset-password?token=${resetToken}`)
  }
}

// Initialize with some demo users for testing
UserStorage.createUser('demo@example.com', 'Demo123!', 'Demo User').then(user => {
  // Auto-verify demo user for testing
  user.emailVerified = true
  console.log('Demo user created: demo@example.com / Demo123!')
})
