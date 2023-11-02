import { COOKIE_MAX_AGE } from '@/constants/cookies'
import { UserAlreadyExistsError } from '@/http/errors/users/user-already-exists-error'
import { PrismaUsersRepository } from '@/http/repositories/prisma/prisma-users-repository'
import { RegisterUseUseCase } from '@/http/use-cases/users/register-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const registerUserRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
})

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password, name } = registerUserRequestSchema.parse(
    request.body,
  )

  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUserUseCase = new RegisterUseUseCase(prismaUsersRepository)

  try {
    const { user, token } = await registerUserUseCase.execute({
      email,
      password,
      name,
    })

    reply.cookie('token', token, {
      path: '/',
      maxAge: COOKIE_MAX_AGE,
    })

    reply.cookie('userId', user.id, {
      path: '/',
      maxAge: COOKIE_MAX_AGE,
    })

    return reply.status(201).send({ user })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ error: error.message })
    }
    return reply
      .status(500)
      .send({ error: 'Something went wrong while registering this user' })
  }
}
