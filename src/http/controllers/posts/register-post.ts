import { PrismaPostsRepository } from '@/http/repositories/prisma/prisma-posts-repository'
import { RegisterPostUseCase } from '@/http/use-cases/posts/register-post-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const registerPostRequestSchema = z.object({
  title: z.string(),
  body: z.string(),
  post_image: z.string(),
  user_id: z.string(),
})

export async function registerPost(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  console.log(request.cookies)
  const { body, post_image, title, user_id } = registerPostRequestSchema.parse(
    request.body,
  )

  const prismaPostsRepository = new PrismaPostsRepository()
  const registerPostUseCase = new RegisterPostUseCase(prismaPostsRepository)

  try {
    const post = await registerPostUseCase.execute({
      body,
      post_image,
      title,
      user_id,
    })
    return reply.status(201).send({ post })
  } catch (error) {
    return reply.status(400).send({ message: error })
  }
}
