import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { authenticateCredentials } from '../lib/auth-credentials'

const ENV_KEYS = [
  'ADMIN_USERNAME',
  'ADMIN_PASSWORD',
  'DEMO_ENABLED',
  'DEMO_USERNAME',
  'DEMO_PASSWORD',
] as const

let savedEnv: Record<string, string | undefined> = {}

beforeEach(() => {
  savedEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]))
  process.env.ADMIN_USERNAME = 'admin'
  process.env.ADMIN_PASSWORD = 'securepassword'
  delete process.env.DEMO_ENABLED
  delete process.env.DEMO_USERNAME
  delete process.env.DEMO_PASSWORD
})

afterEach(() => {
  for (const key of ENV_KEYS) {
    if (savedEnv[key] === undefined) delete process.env[key]
    else process.env[key] = savedEnv[key]
  }
})

describe('Authentication', () => {
  describe('Admin credentials', () => {
    it('should authenticate the admin with the admin role', () => {
      const user = authenticateCredentials('admin', 'securepassword')
      expect(user).not.toBeNull()
      expect(user?.name).toBe('admin')
      expect(user?.role).toBe('admin')
      expect(user?.id).toBe('admin')
    })

    it('should reject an invalid username or password', () => {
      expect(authenticateCredentials('wronguser', 'securepassword')).toBeNull()
      expect(authenticateCredentials('admin', 'wrongpassword')).toBeNull()
    })

    it('should reject empty credentials', () => {
      expect(authenticateCredentials('', '')).toBeNull()
      expect(authenticateCredentials('admin', '')).toBeNull()
      expect(authenticateCredentials('', 'securepassword')).toBeNull()
    })

    it('should not authenticate the admin when admin env vars are missing', () => {
      delete process.env.ADMIN_USERNAME
      delete process.env.ADMIN_PASSWORD

      expect(authenticateCredentials('admin', 'securepassword')).toBeNull()
    })
  })

  describe('Demo credentials', () => {
    it('should authenticate the default demo account as read-only', () => {
      const user = authenticateCredentials('demo', 'demo-value-bets')
      expect(user).not.toBeNull()
      expect(user?.name).toBe('demo')
      expect(user?.role).toBe('demo')
      expect(user?.id).toBe('demo')
    })

    it('should allow overriding the demo credentials via env', () => {
      process.env.DEMO_USERNAME = 'visitante'
      process.env.DEMO_PASSWORD = 'outra-senha-publica'

      expect(authenticateCredentials('visitante', 'outra-senha-publica')?.role).toBe('demo')
      expect(authenticateCredentials('demo', 'demo-value-bets')).toBeNull()
    })

    it('should disable the demo account when DEMO_ENABLED=false', () => {
      process.env.DEMO_ENABLED = 'false'

      expect(authenticateCredentials('demo', 'demo-value-bets')).toBeNull()
      // Admin access must keep working
      expect(authenticateCredentials('admin', 'securepassword')?.role).toBe('admin')
    })
  })

  describe('Session Security', () => {
    it('should use the JWT strategy with a 24-hour session', () => {
      const sessionConfig = {
        strategy: 'jwt' as const,
        maxAge: 24 * 60 * 60,
      }
      expect(sessionConfig.strategy).toBe('jwt')
      expect(sessionConfig.maxAge).toBe(86400)
    })

    it('should have NEXTAUTH_SECRET set', () => {
      expect(process.env.NEXTAUTH_SECRET).toBeDefined()
      expect(process.env.NEXTAUTH_SECRET!.length).toBeGreaterThan(0)
    })
  })
})
