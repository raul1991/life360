// daily stats should be fetched from the following json
var uc1 = (function (logger, requests) {
    var run = function (config) {
        logger.info("Running uc1...");
        getCountryStats(config.country, function(lastDay) {
            logger.info("Total deaths till today: " + lastDay.deaths);
            // update the gui.
            components.metrics.add(lastDay);
        });
    };

    var getCountryStats = function (country, onStatsFetched) {
        var endpoint = 'https://pomber.github.io/covid19/timeseries.json';
        requests.sendRequest({
            url: endpoint
        }, function (response) {
            var allStats = response[country];
            var lastDay = response[country][allStats.length - 1];
            logger.info("Response received" + JSON.stringify(lastDay));
            onStatsFetched(lastDay);
        }, function (error) {
            logger.error("Response could not be retrieved" + error);
            onStatsFetched({"deaths": "N/A", "confirmed": "N/A", "recovered": "N/A"});
        });
    };

    return {
        "run": run
    }
}(logger, requests));
