import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import { getAllUsers } from '#server/services/users'
import type { User } from '#shared/schema/user'

export default defineEventHandler((event): User[] => {
  try {
    const users: User[] = getAllUsers()
    setResponseStatus(event, StatusCodes.OK)
    setResponseHeader(event, 'Content-Type', 'application/json')
    return users
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      statusMessage: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }
})
