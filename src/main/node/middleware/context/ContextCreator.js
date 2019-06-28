class ContextCreator {

    create(req, res, next) {
        res.locals.leapContext = {
            startTime: new Date()
        };
        next();
    }

}

module.exports = ContextCreator;