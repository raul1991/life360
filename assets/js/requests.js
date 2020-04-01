var requests = (function (logger) {
    var send = function (config, action, error) {
        fetch("https://pomber.github.io/covid19/timeseries.json")
            .then(response => response.json())
            .then(data => action(data))
            .catch((error) => {
                logger.error('Error:', error);
            });
    };
    return {
        sendRequest: send
    }
}(logger));