import { Prisma, Post as PrismaPost } from '@prisma/client'

export type PostDTO = Prisma.PostUncheckedCreateInput
export type Post = PrismaPost
export type PartialPost = Partial<Post>

export type GetAllPostsRequestArgs = {
  search?: string
  page: number
  pageSize?: number
}

export type AllPostsReturnType = {
  posts: Post[]
  totalPosts: number
  currentPage: number
  nextPage: number | null
}
