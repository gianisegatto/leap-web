class PromiseHandler {

    /**
     * Handle a promise and apply the especified status code in case of success and send the payload
     * to the client. In case of error call next passing the error
     * @param {promise} promisse to be handled
     * @param {res} express response object
     * @param {next} callback if something wrong happens
     * @param {okHttpStatus} Success http status when the promise gives a good response
     */
    static handle(promise, res, next, okHttpStatus) {
        promise
            .then(result => {
                const response = {
                    statusCode: okHttpStatus ? okHttpStatus : 200,
                    body: result
                };
                res.locals.nanoContext.response = response;
                return next();
            })
            .catch(exception => next(exception));
    }
}

module.exports = PromiseHandler;