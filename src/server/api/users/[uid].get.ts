import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import { getUser } from '#server/services/users'
import type { User } from '#shared/schema/user'

export default defineEventHandler((event) => {
  const uid = event.context.params?.uid
  let user: User | undefined
  try {
    user = getUser(uid)
  }
  catch (error) {
    console.trace(error)
    throw createError({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      statusMessage: ReasonPhrases.INTERNAL_SERVER_ERROR,
    })
  }

  if (!user) {
    throw createError({
      statusCode: StatusCodes.NOT_FOUND,
      statusMessage: `User ${ReasonPhrases.NOT_FOUND}`,
    })
  }

  setResponseStatus(event, StatusCodes.OK)
  setResponseHeader(event, 'Content-Type', 'application/json')
  return user
})
