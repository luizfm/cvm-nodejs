import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'docker') {
  config({ path: '.env.docker' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'docker', 'production'])
    .default('production'),
  DATABASE_URL: z.string(),
  JSON_WEB_TOKEN_SECRET: z.string(),
  PORT: z.coerce.number().default(3000),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.log('Environment variables error', _env.error.format())
  throw new Error('Missing variables')
}

export const env = _env.data
