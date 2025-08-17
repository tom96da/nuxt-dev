import { v4 as uuidv4 } from 'uuid'

import type { User } from '#shared/schema/user'

const usersStore: User[] = []
let userIdCounter = 1

const createUser = (
  userData: Pick<User, 'name' | 'email'>,
): User => {
  const newUser: User = {
    id: userIdCounter++,
    uid: uuidv4(),
    ...userData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  usersStore.push(newUser)
  return newUser
}

const getAllUsers = (): User[] => {
  return usersStore
}

const getUserById = (id?: number): User | undefined => {
  return usersStore.find(user => user.id === id) || undefined
}

const getUser = (uid?: string): User | undefined => {
  return usersStore.find(user => user.uid === uid) || undefined
}

const updateUser = (
  uid?: string,
  userData?: Pick<User, 'name' | 'email'>,
): User | undefined => {
  const userIndex = usersStore.findIndex(user => user.uid === uid)
  const existingUser = usersStore.at(userIndex)

  if (userIndex === -1 || !existingUser) {
    return undefined
  }
  const updatedUser = {
    ...existingUser,
    ...userData,
    updatedAt: new Date().toISOString(),
  }
  usersStore[userIndex] = updatedUser
  return updatedUser
}

const deleteUser = (uid?: string): boolean => {
  const userIndex = usersStore.findIndex(user => user.uid === uid)
  const existingUser = usersStore.at(userIndex)

  if (userIndex === -1 || !existingUser) {
    return false
  }
  usersStore.splice(userIndex, 1)
  return true
}

const resetUserStore = () => {
  usersStore.length = 0
  userIdCounter = 1
}

export {
  createUser,
  getAllUsers,
  getUserById,
  getUser,
  updateUser,
  deleteUser,
  usersStore,
  resetUserStore,
}
