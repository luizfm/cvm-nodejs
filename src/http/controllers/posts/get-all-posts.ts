import { PrismaPostsRepository } from '@/http/repositories/prisma/prisma-posts-repository'
import { GetAllPostsUseCase } from '@/http/use-cases/posts/get-all-posts-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const getAllPostsQuerySchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
})

export async function getAllPosts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { page, search, pageSize } = getAllPostsQuerySchema.parse(request.query)

  const prismaPostsRepository = new PrismaPostsRepository()
  const getAllPostsUseCase = new GetAllPostsUseCase(prismaPostsRepository)

  try {
    const { currentPage, nextPage, posts, totalPosts } =
      await getAllPostsUseCase.execute({ page, search, pageSize })

    return reply.status(201).send({ posts, totalPosts, currentPage, nextPage })
  } catch (error) {
    return reply
      .status(500)
      .send({ error: 'Something went wrong while trying to get all posts' })
  }
}
