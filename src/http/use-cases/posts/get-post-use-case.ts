import { Post } from '@/http/dtos/posts-dto'
import { PostsRepository } from '@/http/repositories/posts-repository'

export class GetPostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(post_id: string): Promise<Post | null> {
    return this.postsRepository.findById(post_id)
  }
}
