const ContextCreator = require("../middleware/context/ContextCreator");
const bodyParser = require("body-parser");
const exceptionAdvice = require("../middleware/advice/ExceptionAdvice");
const Logger = require("../middleware/logger/Logger");
const ResponseDispatcher = require("../middleware/dispatcher/ResponseDispatcher");

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

        this.app.use(new Logger().log);

        this.app.use(new ResponseDispatcher().dispatch);

        return this.app;
    }
}

module.exports = AppBuilder;