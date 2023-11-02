import jwt from 'jsonwebtoken'

import { User, UserRawDTO } from '@/http/dtos/users-dto'
import { UsersRepository } from '@/http/repositories/users-repository'
import { PASSWORD_SALT } from '@/constants/passwords'
import { UserAlreadyExistsError } from '@/http/errors/users/user-already-exists-error'
import { env } from '@/env'
import { JSON_TOKEN_EXPIRES_IN } from '@/constants/tokens'
import { hashSync } from 'bcrypt'

type RegisterUserUseCaseResponse = {
  user: User
  token: string
}

export class RegisterUseUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: UserRawDTO): Promise<RegisterUserUseCaseResponse> {
    const { email, name, password } = data

    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = hashSync(password, PASSWORD_SALT)

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    })

    const token = jwt.sign(user, env.JSON_WEB_TOKEN_SECRET, {
      expiresIn: JSON_TOKEN_EXPIRES_IN,
    })

    return {
      user,
      token,
    }
  }
}
