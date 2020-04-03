var life360 = (function (db, logger, map, metrics, interactions, uc1, uc2, uc3, uc4) {
    var demo = false;
    var config = {
        "uc1": {
            "country": "India"
        },
        "uc2": {
            interactions: [
                {
                    "name": "Day 1",
                    "value": "5",
                    "meets": [
                    "John Doe",
                    "Marcus Polo",
                    "Friend Jonathan",
                    "Maria Sue",
                    "Jhia Shie"
                ]
                },
                {
                    "name": "Day 2",
                    "value": "16",
                    "meets": [
                    "John Doe",
                    "Marcus Polo",
                    "Friend Jonathan",
                    "Maria Sue",
                    "Jhia Shie"
                ]
                },
                {
                    "name": "Day 3",
                    "value": "7",
                    "meets": [
                    "John Doe",
                    "Marcus Polo",
                    "Friend Jonathan",
                    "Maria Sue",
                    "Jhia Shie"
                ]
                },
                {
                    "name": "Day 4",
                    "value": "15",
                    "meets": [
                    "John Doe",
                    "Marcus Polo",
                    "Friend Jonathan",
                    "Maria Sue",
                    "Jhia Shie"
                ]
                }
            ]
        },
        "uc3": {

        },
        "uc4": {

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
            "name": "USER_IS_TESTED_POSITIVE",
            "run": uc3.run,
            "config": config.uc3
        },
        {
            "name": "SEND_SMS_TO_PEOPLE_DISPLAY_INFORMATION_FOR_USER",
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
            }, i * 5 * 1000); // 5 seconds delay b/w usecases
        }
    };

    var startDemo = function () {
        window.setTimeout(function() {
            runUsecases();
        }, 5000);
    };

    var enableDemoMode = function () {
        USE_CASES.forEach(uc => uc.config['demo'] = true);
    };

    var checkAndStartIfDemo = function (config) {
        if (config.demo === true) {
            enableDemoMode();
            startDemo()
        }
    };

    var init = (function (config) {
        map.init(config.map);
        metrics.init(config.metrics);
        interactions.init(config.interactions);
        checkAndStartIfDemo(config);
    });

    return {
        init: init,
        start: startDemo,
        db: db,
    };
}(datastore, logger, components.map, components.metrics, components.interactions, uc1, uc2, uc3, uc4));
