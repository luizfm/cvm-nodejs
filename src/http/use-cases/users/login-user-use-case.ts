import { JSON_TOKEN_EXPIRES_IN } from '@/constants/tokens'
import { env } from '@/env'
import { InvalidCredentialsError } from '@/http/errors/users/invalid-credentials-error'
import { UsersRepository } from '@/http/repositories/users-repository'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

type LoginUserUseCaseResponse = {
  userId: string
  token: string
}

export class LoginUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    email: string,
    password: string,
  ): Promise<LoginUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isValidPassword = await compare(password, user.password_hash)

    if (!isValidPassword) {
      throw new InvalidCredentialsError()
    }

    const token = jwt.sign(user, env.JSON_WEB_TOKEN_SECRET, {
      expiresIn: JSON_TOKEN_EXPIRES_IN,
    })

    return { userId: user.id, token }
  }
}
