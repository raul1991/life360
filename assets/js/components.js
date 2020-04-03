var components = (function (logger, datastore, loc, Handlebars) {
    var map = (function (logger, loc) {
        var templateId = "";
        var isInitialised = false;
        var globalConfig = {};
        var map = {};
        var paths = []; // contains all the markers other than my own location.
        var connector = {} // polyline connector
        var addMarker = function (marker, map) {
            // add marker
            // add to model's properties
            logger.info("Arg: marker" + JSON.stringify(marker));
            logger.info("Adding a marker at [" + marker.position.lat + marker.position.lng + "]");
            return new google.maps.Marker({
                position: marker.position,
                map: map,
                icon: marker.icon,
                animation: google.maps.Animation.DROP
            });
        };

        function connectMarkers() {
            connector = new google.maps.Polygon({
                paths: getOnlyCoords(paths),
                strokeColor: '#FF0000',
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2,
                map: map
            });
        }

        var plotPoints = function (howMany) {
            if (paths.length > 0) clearOverlays();
            var points = loc.get(globalConfig.center, globalConfig.radius, howMany);
            points.forEach(p => {
                var pos = {
                    lat: p.lat,
                    lng: p.lng
                };
                paths.push(addMarker({
                    position: pos,
                    icon: "assets/img/friend.png"
                }, map)); // adding all my friends' markers to the array.
            });
            // join the points
            connectMarkers();
        };
        var getOnlyCoords = function (markers) {
            var coords = [];
            markers.map(m => {
                return {
                    lat: m.getPosition().lat(),
                    lng: m.getPosition().lng()
                }
            }).forEach(p => coords.push(p));
            return coords;
        };
        var clearOverlays = function () {
            paths.forEach(marker => marker.setMap(null));
            paths = []; //clear the array
            connector.setMap(null); // clear the connector
        };

        var init = (function (config) {
            logger.info("Initialising map with " + JSON.stringify(config));
            if (!isInitialised) {
                globalConfig = config;
                templateId = config.elementId;
                // The location of home
                var home = config.home;
                // The map, centered at my home
                map = new google.maps.Map(
                    document.getElementById(templateId), {
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
            addMarker: addMarker,
            plotPoints: plotPoints
        }
    }(logger, loc));

    var metrics = (function (logger) {
        var elementId = "";
        var templateId = "";
        var template = "";
        var isInitialised = false;
        var init = function (config) {
            if (isInitialised) {
                logger.info("Metrics already initialised");
                return;
            }
            templateId = config.templateId || "";
            elementId = config.elementId || "";
            template = Handlebars.compile($(templateId).html());
            logger.info("Metrics initialised" + template);
        };
        var add = function (metrics) {
            metrics.forEach(metric => {
                // todo: make card with information on gui
                $(elementId).append(template(metric));
            });
        };

        return {
            add: add,
            init: init
        }
    }(logger));

    var interactions = (function (logger) {
        var templateId = "";
        var elementId = "";
        var template = "";
        var add = function (interactions) {
            interactions.forEach(i => {
                $(elementId).append(template(i));
            });
        };

        var doThat = function () {

        };
        var init = function (config) {
            var isInitialised = false;
            if (isInitialised) return;
            elementId = config.elementId;
            templateId = config.templateId;
            template = Handlebars.compile($(templateId).html());
            isInitialised = true;
        };
        return {
            add: add,
            doThat: doThat,
            init: init
        }
    }(logger));

    return {
        map: map,
        interactions: interactions,
        metrics: metrics
    }
}(logger, datastore, loc, Handlebars));
