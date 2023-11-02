import { PrismaPostsRepository } from '@/http/repositories/prisma/prisma-posts-repository'
import { GetPostUseCase } from '@/http/use-cases/posts/get-post-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const getPostRequestParamSchema = z.object({
  postId: z.string(),
})

export async function getPost(request: FastifyRequest, reply: FastifyReply) {
  const { postId } = getPostRequestParamSchema.parse(request.params)

  const prismaPostsRepository = new PrismaPostsRepository()
  const getPostUseCase = new GetPostUseCase(prismaPostsRepository)

  try {
    const post = await getPostUseCase.execute(postId)
    return reply.status(201).send({ post })
  } catch (error) {
    return reply.status(500).send({
      error: `Something went wrong while trying to get post ${postId}`,
    })
  }
}
