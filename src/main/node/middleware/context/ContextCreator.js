class ContextCreator {

    create(req, res, next) {
        res.locals.nanoContext = {
            startTime: new Date()
        };
        next();
    }

}

module.exports = ContextCreator;