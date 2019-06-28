class Logger {

    start(req, res, next) {
        res.locals.nanoContext.startTime
        next();
    }

    log(req, res, next) {

        console.log("Logger called");

        const nanoContext = res.locals.nanoContext;
        const elapsedTime = Date.now() - nanoContext.startTime;

        if (req.query.DEBUG === "true") {
            console.info("PayloadLogger", {
                correlationId: req.headers["client-id"],
                url: req.url,
                headers: JSON.stringify(req.headers),
                urlParams: req.params,
                urlQuery: req.query,
                requestBody: JSON.stringify(req.body),
                responseBody: JSON.stringify(nanoContext.response.body),
                elapsedTime: elapsedTime
            });
        } else {
            console.info("Logger", {correlationId: req.headers["client-id"], url: req.url, urlParams: req.params, urlQuery: req.query, elapsedTime: elapsedTime});
        }
        next();
    }
}

module.exports = Logger;

