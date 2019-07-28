class Logger {

    static log(req, res, responseBody) {

        const leapContext = res.locals.leapContext;
        const elapsedTime = Date.now() - leapContext.startTime;

        if (req.query.DEBUG === "true" || req.headers["debug"] === "true") {
            console.info("PayloadLogger", {
                correlationId: req.headers["client-id"],
                url: req.url,
                headers: JSON.stringify(req.headers),
                urlParams: req.params,
                urlQuery: req.query,
                requestBody: JSON.stringify(req.body),
                responseBody: JSON.stringify(responseBody),
                elapsedTime: elapsedTime
            });
        } else {
            console.info("Logger", { correlationId: req.headers["client-id"], url: req.url, urlParams: req.params, urlQuery: req.query, elapsedTime: elapsedTime });
        }
    }
}

module.exports = Logger;