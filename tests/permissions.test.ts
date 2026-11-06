import { describe, it, expect } from 'vitest'
import { canWrite, isDemoRole } from '../lib/permissions'

describe('Permissions', () => {
  it('should identify the demo role', () => {
    expect(isDemoRole('demo')).toBe(true)
    expect(isDemoRole('admin')).toBe(false)
    expect(isDemoRole(undefined)).toBe(false)
    expect(isDemoRole(null)).toBe(false)
  })

  it('should block writes for the demo role only', () => {
    expect(canWrite('demo')).toBe(false)
    expect(canWrite('admin')).toBe(true)
    expect(canWrite(undefined)).toBe(true)
    expect(canWrite(null)).toBe(true)
  })
})
