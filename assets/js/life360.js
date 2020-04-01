var life360 = (function (db, loc, logger, map, uc1, uc2, uc3, uc4) {
    var config = {
        "uc1": {
            "country": "India"
        },
        "uc2": {
            "country": "India"
        },
        "uc3": {
            "country": "India"
        },
        "uc4": {
            "country": "India"
        }
    };
    var timeoutId = -1;
    var USE_CASES = [
        {
            "name": "CORONA_VIRUS_STATS",
            "run": uc1.run,
            "config": config.uc1
        },
        {
            "name": "USER_DAILY_VISITS",
            "run": uc2.run,
            "config": config.uc2
        },
        {
            "name": "USER_INTERACTS_WITH_PEOPLE_EXCHANGES_INFORMATION",
            "run": uc3.run,
            "config": config.uc3
        },
        {
            "name": "USER_IS_TESTED_POSITIVE_SEND_SMS_TO_PEOPLE",
            "run": uc4.run,
            "config": config.uc4
        }
    ];

    var run = function (usecase) {
        logger.info("Running use case [" + usecase.name.toLocaleLowerCase().replace(/_/g, " ") + "]");
        usecase.run(usecase.config);
    };

    var runUsecases = function () {
        for (let i = 0; i < USE_CASES.length; i++) {
            timeoutId = setTimeout(function timer() {
                run(USE_CASES[i]);
                // stop the use cases when done.
                // todo: add an external trigger for iterating into the usecases
                if (i == USE_CASES.length - 1) clearTimeout(timeoutId);
            }, i * 3000);
        }
    };

    var startDemo = function () {
        runUsecases();
    };

    var init = (function (config) {
        map.init(config.map);
    });

    return {
        init: init,
        start: startDemo,
        db: db,
        location: loc
    };
}(datastore, loc, logger, components.map, uc1, uc2, uc3, uc4));
