import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import { createUser } from '#server/services/users'
import { userFormSchema } from '#shared/schema/user'
import type { User } from '#shared/schema/user'

interface SuccessResponse { success: true, user: User }
interface ErrorResponse { success: false, error: string }
type CreateUserResponse = SuccessResponse | ErrorResponse

export default defineEventHandler(async (event): Promise<CreateUserResponse> => {
  const body = await readBody(event)
  const { success, data, error } = userFormSchema.safeParse(body)
  if (!success) {
    console.error('Validation error:', error)
    setResponseStatus(event, StatusCodes.BAD_REQUEST)
    setResponseHeader(event, 'Content-Type', 'application/json')
    return { success: false, error: 'Invalid user data' }
  }

  try {
    const result = createUser(data)

    setResponseStatus(event, StatusCodes.CREATED)
    setResponseHeader(event, 'Content-Type', 'application/json')
    return { success: true, user: result }
  }
  catch (error) {
    console.trace(error)
    setResponseStatus(event, StatusCodes.INTERNAL_SERVER_ERROR)
    setResponseHeader(event, 'Content-Type', 'application/json')
    return { success: false, error: ReasonPhrases.INTERNAL_SERVER_ERROR }
  }
})
