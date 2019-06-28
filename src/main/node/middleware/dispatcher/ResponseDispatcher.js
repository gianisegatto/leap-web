class ResponseDispatcher {

    dispatch(req, res, next) {
        const response = res.locals.leapContext.response;
        res.status(response.statusCode).send(response.body);
    }
}

module.exports = ResponseDispatcher;