const joi = require("joi");
const exceptionBuilder = require("../../error/ExceptionBuilder");
const errorCode = require("../../error/ErrorCode");

class RequestValidator {

    constructor(schemaValidation) {
        this.schema = schemaValidation;
        this.schema.options = {
            flatten: false
        };
        this.options = {context: {contextRequest: true}, abortEarly: false, allowUnknown: true};
    }

    validate() {

        return (req, res, next) => {

            const result = joi.validate(req, joi.object().keys(this.schema), this.options);

            if (result.error) {
                const exception = exceptionBuilder.build("REQUEST_VALIDATOR", "Bad request", errorCode.BAD_REQUEST, result.error.details.map(detail => detail.message));
                return next(exception);
            } else {
                return next();
            }
        };
    }
}

module.exports = RequestValidator;