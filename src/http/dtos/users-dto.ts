import { Prisma, User as PrismaUser } from '@prisma/client'

export type UserRawDTO = Omit<
  Prisma.UserUncheckedCreateInput,
  'password_hash'
> & {
  password: string
}

export type UserDTO = Prisma.UserUncheckedCreateInput

export type User = PrismaUser
