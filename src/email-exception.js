export class EmailException extends Error {
  constructor(...params) {
    super(...params)
    this.name = 'EmailException';
  }
}
