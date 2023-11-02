import {
  AllPostsReturnType,
  GetAllPostsRequestArgs,
  PartialPost,
  Post,
  PostDTO,
} from '@/http/dtos/posts-dto'

export interface PostsRepository {
  create(data: PostDTO): Promise<Post>
  findById(id: string): Promise<Post | null>
  findAll({ search, page }: GetAllPostsRequestArgs): Promise<AllPostsReturnType>
  update(id: string, data: PartialPost): Promise<Post>
}
