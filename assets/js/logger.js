var logger = (function () {
    var LEVELS = {
        I: "info",
        E: "error"
    };
    var info = function (message) {
        log(LEVELS.I, message);
    };
    var error = function (message) {
        log(LEVELS.E, message);
    };
    var log = function (level, message) {
        switch (level) {
            case LEVELS.E:
                console.error(message);
                break;
            case LEVELS.I:
                console.info(message);
                break;
            default:
                console.info(message);
        }
    };

    return {
        info: info,
        error: error
    }
}());
