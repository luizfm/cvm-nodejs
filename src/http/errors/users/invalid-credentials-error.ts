export class InvalidCredentialsError extends Error {
  constructor() {
    super('Bad credentials')
  }
}
