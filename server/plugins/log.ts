export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('request', (event) => {
    event.context.startTime = Date.now()
    event.context.timestamp = new Date().toISOString()
  })

  nitro.hooks.hook('beforeResponse', (event) => {
    const timestamp: string = event.context.timestamp
    const duration: number = Date.now() - event.context.startTime
    const url = event.path
    const method = event.method
    const statusCode = getResponseStatus(event)

    console.log(`[${timestamp}] ${method} ${url} - ${statusCode} | ${duration}ms`)
  })
})
