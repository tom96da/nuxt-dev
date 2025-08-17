import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import { getAllUsers } from '#server/services/users'
import type { User } from '#shared/schema/user'

interface SuccessResponse { success: true, count: number, users: User[] }
interface ErrorResponse { success: false, error: string }
type GetUsersResponse = SuccessResponse | ErrorResponse

export default defineEventHandler((event): GetUsersResponse => {
  try {
    const users: User[] = getAllUsers()
    setResponseStatus(event, StatusCodes.OK)
    setResponseHeader(event, 'Content-Type', 'application/json')
    return {
      success: true,
      count: users.length,
      users,
    }
  }
  catch (error) {
    console.error(error)
    setResponseStatus(event, StatusCodes.INTERNAL_SERVER_ERROR)
    setResponseHeader(event, 'Content-Type', 'application/json')
    return {
      success: false,
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    }
  }
})
