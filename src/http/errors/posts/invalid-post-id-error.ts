export class InvalidPostIdError extends Error {
  constructor() {
    super('The provided post id does not exists')
  }
}
