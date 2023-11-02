import { User, UserDTO } from '@/http/dtos/users-dto'
import { UsersRepository } from '../users-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserDTO): Promise<User> {
    return prisma.user.create({ data })
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { id } })
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { email } })
  }

  async update(id: string, data: UserDTO): Promise<User> {
    return prisma.user.update({
      data,
      where: {
        id,
      },
    })
  }
}
