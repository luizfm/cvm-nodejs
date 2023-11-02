import {
  AllPostsReturnType,
  GetAllPostsRequestArgs,
  PartialPost,
  Post,
  PostDTO,
} from '@/http/dtos/posts-dto'
import { PostsRepository } from '@/http/repositories/posts-repository'
import { prisma } from '@/lib/prisma'
import { PAGE_SIZE, paginationSize } from '@/utils/pagination'

export class PrismaPostsRepository implements PostsRepository {
  async create(data: PostDTO): Promise<Post> {
    return prisma.post.create({ data })
  }

  async findById(id: string): Promise<Post | null> {
    return prisma.post.findFirst({
      where: {
        id,
        disabled: false,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })
  }

  async update(id: string, data: PartialPost): Promise<Post> {
    return prisma.post.update({ data, where: { id } })
  }

  async findAll({
    search,
    page,
    pageSize = PAGE_SIZE,
  }: GetAllPostsRequestArgs): Promise<AllPostsReturnType> {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: search } },
          { user: { name: { contains: search } } },
        ],
        disabled: false,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      take: pageSize,
      skip: paginationSize(page, pageSize),
    })

    const totalPosts = await prisma.post.count({
      where: {
        OR: [
          { title: { contains: search } },
          { user: { name: { contains: search } } },
        ],
        disabled: false,
      },
    })

    const nextPage = totalPosts / pageSize === page ? null : page + 1

    return {
      posts,
      totalPosts,
      currentPage: page,
      nextPage,
    }
  }
}
