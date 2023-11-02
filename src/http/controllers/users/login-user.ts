import { COOKIE_MAX_AGE } from '@/constants/cookies'
import { InvalidCredentialsError } from '@/http/errors/users/invalid-credentials-error'
import { PrismaUsersRepository } from '@/http/repositories/prisma/prisma-users-repository'
import { LoginUserUseCase } from '@/http/use-cases/users/login-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const loginUserRequestBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function loginUser(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = loginUserRequestBodySchema.parse(request.body)

  const prismaUsersRepository = new PrismaUsersRepository()
  const loginUserUseCase = new LoginUserUseCase(prismaUsersRepository)

  try {
    const { userId, token } = await loginUserUseCase.execute(email, password)

    reply.cookie('token', token, {
      path: '/',
      maxAge: COOKIE_MAX_AGE,
    })

    reply.cookie('userId', userId, {
      path: '/',
      maxAge: COOKIE_MAX_AGE,
    })

    return reply.status(201).send({ userId })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ error: error.message })
    }

    return reply
      .status(500)
      .send({ error: 'Something went wrong while trying to log in this user' })
  }
}
