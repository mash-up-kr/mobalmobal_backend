function HttpError(status, message) {
  this.status = status;
  this.message = message;
}

HttpError.prototype = new Error();

module.exports = HttpError;
