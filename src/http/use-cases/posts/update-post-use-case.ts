import { PartialPost, Post } from '@/http/dtos/posts-dto'
import { InvalidPostIdError } from '@/http/errors/posts/invalid-post-id-error'
import { PostsRepository } from '@/http/repositories/posts-repository'

export class UpdatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(post_id: string, data: PartialPost): Promise<Post> {
    const checkPostExists = await this.postsRepository.findById(post_id)

    if (!checkPostExists) {
      throw new InvalidPostIdError()
    }

    const updatedPost = await this.postsRepository.update(post_id, data)

    return updatedPost
  }
}
