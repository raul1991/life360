var uc4 = (function (logger) {
    var run = function (config) {
        logger.info("Running uc4...");
        $('#information-modal').modal('show');
    };

    return {
        "run": run
    }
}(logger));
