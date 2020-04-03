var uc2 = (function (logger, interactions, Handlebars) {
    var globalConfig = {};
    var run = function (config) {
        globalConfig = config;
        logger.info("Running uc2... in demo mode ? " + config.demo);
        showInteractions(config.interactions);
        if (config.demo === true) {
            // auto add points.
            components.map.plotPoints(5);
        }
    };

    // displays cards on the right side.
    var showInteractions = function (data) {
        interactions.add(data);
    };

    return {
        "run": run
    }
}(logger, components.interactions, Handlebars));
