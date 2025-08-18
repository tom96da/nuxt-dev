import { describe, it, expect, beforeEach } from 'vitest'

import {
  createUser,
  getAllUsers,
  getUserById,
  getUser,
  updateUser,
  deleteUser, resetUserStore,
} from './users'

describe('users service', () => {
  beforeEach(() => {
    resetUserStore()
  })

  it('should create a user', () => {
    const user = createUser({ name: 'Alice', email: 'alice@example.com' })
    expect(user.name).toBe('Alice')
    expect(user.email).toBe('alice@example.com')
    expect(typeof user.uid).toBe('string')
    expect(user.id).toBe(1)
    expect(user.createdAt).toBeTruthy()
    expect(user.updatedAt).toBeTruthy()
  })

  it('should get all users', () => {
    createUser({ name: 'Bob', email: 'bob@example.com' })
    createUser({ name: 'Carol', email: 'carol@example.com' })
    const users = getAllUsers()
    const EXPECTED_USER_COUNT = 2
    expect(users).toHaveLength(EXPECTED_USER_COUNT)
    expect(users[0].name).toBe('Bob')
    expect(users[1].name).toBe('Carol')
  })

  it('should get user by id', () => {
    const user = createUser({ name: 'Dave', email: 'dave@example.com' })
    const found = getUserById(user.id)
    expect(found).toBeDefined()
    expect(found?.name).toBe('Dave')
    const NON_EXISTENT_ID = 999
    expect(getUserById(NON_EXISTENT_ID)).toBeUndefined()
  })

  it('should get user by uid', () => {
    const user = createUser({ name: 'Eve', email: 'eve@example.com' })
    const found = getUser(user.uid)
    expect(found).toBeDefined()
    expect(found?.email).toBe('eve@example.com')
    expect(getUser('non-existent-uid')).toBeUndefined()
  })

  it('should update user', async () => {
    const WAIT_MS = 10
    const user = createUser({ name: 'Frank', email: 'frank@example.com' })
    // Wait to ensure updatedAt will be different
    await new Promise(resolve => setTimeout(resolve, WAIT_MS))
    const updated = updateUser(user.uid, { name: 'Frank Updated', email: 'frank2@example.com' })
    expect(updated).toBeDefined()
    expect(updated?.name).toBe('Frank Updated')
    expect(updated?.email).toBe('frank2@example.com')
    expect(updated?.updatedAt).not.toBe(user.updatedAt)
    expect(updateUser('non-existent-uid', { name: 'X', email: 'x@example.com' })).toBeUndefined()
  })

  it('should delete user', () => {
    const user = createUser({ name: 'Grace', email: 'grace@example.com' })
    const deleted = deleteUser(user.uid)
    expect(deleted).toBe(true)
    expect(getUser(user.uid)).toBeUndefined()
    expect(deleteUser('non-existent-uid')).toBe(false)
  })
})
