const errorBuilder = require("../../error/WebErrorBuilder");
const errorCode = require("../../error/ErrorCode");
const Logger = require("../../logger/Logger");

class ExceptionAdvice {

    static handleError(err, req, res, next) {

        let exception;

        if (err.type !== undefined && err.errorCode !== undefined) {
            exception = err;
        } else {
            exception = errorBuilder.build("ERROR_MIDDLEWARE", "Unexpected error", errorCode.INTERNAL_SERVER_ERROR, err);
        }

        Logger.log(req, res, exception);

        res.status(exception.errorCode.code).send(exception);
    }
}

module.exports = ExceptionAdvice;