export class HttpError extends Error {
  status = 500;
  constructor(status: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
    this.status = status;
  }
}

export default HttpError;
