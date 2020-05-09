export class EmailException extends Error {
  constructor(message) {
    super(message);
    this.name = 'EmailException';
  }
}
