export class EmailException extends Error {
  constructor(message) {
    this.message = message;
    this.name = 'EmailException';
  }
}
