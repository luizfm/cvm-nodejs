import { AllPostsReturnType } from '@/http/dtos/posts-dto'
import { PostsRepository } from '@/http/repositories/posts-repository'

type GetAllPostsRequest = {
  search?: string
  page: number
  pageSize?: number
}

export class GetAllPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(data: GetAllPostsRequest): Promise<AllPostsReturnType> {
    return this.postsRepository.findAll(data)
  }
}
