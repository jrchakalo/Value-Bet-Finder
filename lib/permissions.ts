export function isDemoRole(role?: string | null): boolean {
  return role === 'demo'
}

/**
 * Demo accounts are read-only. Legacy sessions without a role are treated
 * as admin so an existing logged-in admin is not locked out after deploy.
 */
export function canWrite(role?: string | null): boolean {
  return !isDemoRole(role)
}
