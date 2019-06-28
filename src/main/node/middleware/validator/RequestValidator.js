const joi = require("@hapi/joi");
const exceptionBuilder = require("../../error/WebErrorBuilder");
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
                const exception = exceptionBuilder.build("REQUEST_VALIDATOR", "Bad request", result.error.details.map(detail => detail.message), errorCode.BAD_REQUEST);
                return next(exception);
            } else {
                return next();
            }
        };
    }
}

module.exports = RequestValidator;