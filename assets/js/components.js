var components = (function (logger, datastore) {
    var ids = ["#map", "#interactions"];
    var refs = [];
    ids.forEach(i => refs.push({
        i: $(i)
    }));

    var map = (function (logger) {
        var isInitialised = false;
        var el = refs[ids['#map']];
        var addMarker = function (marker, map) {
            // add marker
            // add to model's properties
            logger.info("Arg: marker" + JSON.stringify(marker));
            logger.info("Adding a marker at [" + marker.position.lat + marker.position.lng + "]");
            // The marker, positioned at Uluru
            var marker = new google.maps.Marker({
                position: marker.position,
                map: map
            });
        };
        var init = (function (config) {
            logger.info("Initialising map with " + JSON.stringify(config));
            if (!isInitialised) {
                // The location of home
                var home = config.home;
                // The map, centered at my home
                var map = new google.maps.Map(
                    document.getElementById(config.elementId), {
                        zoom: config.zoom,
                        center: config.center
                    });
                addMarker(config.marker, map);
                isInitialised = true;
                logger.info("Map initialisation completed" + JSON.stringify(config));
                return;
            }
        });
        return {
            init: init,
            addMarker: addMarker
        }
    }(logger));

    var metrics = (function (logger) {
        var add = function (meterics) {
            metrics.forEach(metric => {
                // todo: make card with information on gui
            });
        };

        return {
            add: add
        }
    });

    var interactions = (function (logger) {
        var el = refs[ids['#interactions']];
        var doThis = function () {

        };

        var doThat = function () {

        };
        return {
            doThis: doThis,
            doThat: doThat
        }
    }(logger));

    return {
        map: map,
        interactions: interactions,
        meterics: metrics
    }
}(logger, datastore));
