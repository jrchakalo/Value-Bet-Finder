export type UserRole = 'admin' | 'demo'

export interface AuthorizedUser {
  id: string
  name: string
  email: string
  role: UserRole
}

const DEFAULT_DEMO_USERNAME = 'demo'
const DEFAULT_DEMO_PASSWORD = 'demo-value-bets'

/**
 * Validates credentials for the single admin account and the public,
 * read-only demo account.
 *
 * The admin credentials always come from the environment and have no
 * fallback. The demo account is enabled by default (it is intentionally
 * public), but can be renamed or disabled with DEMO_* variables.
 */
export function authenticateCredentials(
  username: string,
  password: string
): AuthorizedUser | null {
  if (!username || !password) return null

  const adminUsername = process.env.ADMIN_USERNAME
  const adminPassword = process.env.ADMIN_PASSWORD

  if (
    adminUsername &&
    adminPassword &&
    username === adminUsername &&
    password === adminPassword
  ) {
    return {
      id: 'admin',
      name: adminUsername,
      email: `${adminUsername}@valuebetfinder.local`,
      role: 'admin',
    }
  }

  const demoEnabled = (process.env.DEMO_ENABLED ?? 'true').toLowerCase() !== 'false'
  if (!demoEnabled) return null

  const demoUsername = process.env.DEMO_USERNAME || DEFAULT_DEMO_USERNAME
  const demoPassword = process.env.DEMO_PASSWORD || DEFAULT_DEMO_PASSWORD

  if (username === demoUsername && password === demoPassword) {
    return {
      id: 'demo',
      name: demoUsername,
      email: 'demo@valuebetfinder.local',
      role: 'demo',
    }
  }

  return null
}
