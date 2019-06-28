const errorBuilder = require("../../error/ExceptionBuilder");
const errorCode = require("../../error/ErrorCode");

module.exports = {

    handleError: function (err, req, res, next) {

        let exception;

        if (err.error !== undefined && err.error.errorCode !== undefined) {
            exception = err;
        } else {
            exception = errorBuilder.build("ERROR_MIDDLEWARE", "Unexpected error", errorCode.INTERNAL_SERVER_ERROR, err);
        }

        res.locals.nanoContext.response = {
            statusCode: exception.error.errorCode,
            body: exception
        };

        next();

    }
};