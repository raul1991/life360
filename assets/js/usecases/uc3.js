var uc3 = (function (logger) {
    var run = function (config) {
        logger.info("Running uc3...");
        doActions();
        window.setTimeout(function(){
            undoActions();
        }, 60*1000);
    };
    var startDangerAnimation = function (elementName, animationClass) {
        logger.info("Starting animation");
        $(elementName).addClass(animationClass);
    };

    var stopAnimation = function (elementName, animationClass) {
        logger.info("Stopping animation");
        $(elementName).removeClass(animationClass);
    };

    var doActions = function() {
        startDangerAnimation("body", "danger-animation");
        $("#main-content-title-bar").addClass("text-white");
    };

    var undoActions = function() {
        logger.info("Undoing animations");
        stopAnimation("body", "danger-animation");
        $("#main-content-title-bar").removeClass("text-white");
    };
    
    return {
        "run": run
    }
}(logger));
