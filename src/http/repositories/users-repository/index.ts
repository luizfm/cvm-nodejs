import { User, UserDTO } from '@/http/dtos/users-dto'

export interface UsersRepository {
  create(data: UserDTO): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  update(id: string, data: UserDTO): Promise<User>
}
