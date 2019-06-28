const ErrorBuilder = require("leap-core").ErrorBuilder;

class WebErroBuilder {
    
    static build(source, message, details, errorCode) {
        const error = ErrorBuilder.build(source, message, details);
        error.type = "WEB";
        error.errorCode = errorCode;
        return error;
    }
}

module.exports = WebErroBuilder;