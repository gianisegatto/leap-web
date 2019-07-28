const ContextCreator = require("../middleware/context/ContextCreator");
const bodyParser = require("body-parser");
const exceptionAdvice = require("../middleware/advice/ExceptionAdvice");

class AppBuilder {

    constructor(app) {
        this.app = app;
        this.routers = [];
    }

    addRouter(router) {
        this.routers.push(router);
        return this;
    }

    build() {

        this.app.use(new ContextCreator().create);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));

        this.routers.forEach(router => this.app.use(router));

        this.app.use(exceptionAdvice.handleError);

        return this.app;
    }
}

module.exports = AppBuilder;