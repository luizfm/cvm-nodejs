import fastify from 'fastify'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'

import { routes } from './http/routes'

export const app = fastify({ bodyLimit: 1024 * 1024 * 20 }) // BodyLimit adds the request body limit to avoid payload is too large

app.register(cors, {
  credentials: true,
  origin: (origin, cb) => {
    // if (origin) {
    //   const hostname = new URL(origin).hostname

    //   if (hostname === 'localhost') {
    //     cb(null, true)
    //     return
    //   }
    // }

    // cb(new Error('Not Allowed'), false)
    cb(null, true)
  },
})

app.register(cookie)
app.register(routes)
