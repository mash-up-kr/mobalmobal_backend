const statusCode = require('../module/statusCode');

const ERROR_MESSAGE = '올바르지 않은 인자값입니다.';

function InvalidParameterError(status, message) {
  this.status = statusCode.BAD_REQUEST;
  this.message = ERROR_MESSAGE;
}

InvalidParameterError.prototype = new Error();

module.exports = InvalidParameterError;
