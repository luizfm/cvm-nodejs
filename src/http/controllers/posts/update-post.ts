import { InvalidPostIdError } from '@/http/errors/posts/invalid-post-id-error'
import { PrismaPostsRepository } from '@/http/repositories/prisma/prisma-posts-repository'
import { UpdatePostUseCase } from '@/http/use-cases/posts/update-post-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const updatePostRequestParamsSchema = z.object({
  postId: z.string(),
})

const updatePostRequestBodySchema = z.object({
  title: z.string().optional(),
  body: z.string().optional(),
  post_image: z.string().optional(),
  disabled: z.boolean().optional(),
})

export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
  const { body, post_image, title, disabled } =
    updatePostRequestBodySchema.parse(request.body)
  const { postId } = updatePostRequestParamsSchema.parse(request.params)

  const prismaPostsRepository = new PrismaPostsRepository()
  const updatePostUseCase = new UpdatePostUseCase(prismaPostsRepository)

  try {
    const post = await updatePostUseCase.execute(postId, {
      body,
      post_image,
      title,
      disabled,
    })

    return reply.status(201).send({ post })
  } catch (error) {
    if (error instanceof InvalidPostIdError) {
      return reply.status(404).send({ error: error.message })
    }

    return reply
      .status(500)
      .send({ error: `Something went wrong while updating post ${postId}` })
  }
}
