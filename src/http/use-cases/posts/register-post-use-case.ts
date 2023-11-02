import { Post, PostDTO } from '@/http/dtos/posts-dto'
import { PostsRepository } from '@/http/repositories/posts-repository'

export class RegisterPostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(data: PostDTO): Promise<Post> {
    return this.postsRepository.create(data)
  }
}
