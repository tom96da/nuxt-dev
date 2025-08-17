import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import { getUser } from '#server/services/users'
import type { User } from '#shared/schema/user'

interface SuccessResponse { success: true, user: User }
interface ErrorResponse { success: false, error: string }
type GetUserResponse = SuccessResponse | ErrorResponse

export default defineEventHandler((event): GetUserResponse => {
  const uid = event.context.params?.uid
  let user: User | undefined
  try {
    user = getUser(uid)
  }
  catch (error) {
    console.trace(error)
    setResponseStatus(event, StatusCodes.INTERNAL_SERVER_ERROR)
    setResponseHeader(event, 'Content-Type', 'application/json')
    return { success: false, error: ReasonPhrases.INTERNAL_SERVER_ERROR }
  }

  if (!user) {
    setResponseStatus(event, StatusCodes.NOT_FOUND)
    setResponseHeader(event, 'Content-Type', 'application/json')
    return { success: false, error: 'User not found' }
  }

  setResponseStatus(event, StatusCodes.OK)
  setResponseHeader(event, 'Content-Type', 'application/json')
  return { success: true, user }
})
