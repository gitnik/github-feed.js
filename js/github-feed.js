var GITHUB = function () {

    var _events = ["PushEvent", "CreateEvent"];

    var _config = {
        // internal config options
        'debug':            false,

        //defined by the user
        'user':             'gitnik',
        'numberOfEvents':   5,
        'container':        'githubContainer', // the container for the feed
        'containerClasses': [], // want to have any classes added to your container?
        'typeOfEvents':     ["PushEvent", "CreateEvent"], // which of events do you want to see?
        cacheTime:          function (seconds) {
            var seconds = seconds || 86400;
            return (_config.debug) ? 0 : seconds; // default cacheTime is one day, unless we're in active development
        }
    };

    // the main method
    function feed(options) {

        // substitude the default config with the user-given options
        for (var prop in options) {
            if (options.hasOwnProperty(prop)) {
                _config[prop] = options[prop];
            }
        }

        var feedPromise = _getFeed();
        feedPromise.then(function (feed) {
            _format(feed);
        });
    }

    function _getFeed() {

        var promise = new Promise();

        // check if the json data was loaded before and if so, return it right away
        if (_feedInCache()) {
            promise.resolve(JSON.parse(_getFeedFromCache()));
            return promise;
        }

        var feed_url = "https://api.github.com/users/" + _config.user + "/events";

        // ajax without jQuery. Yes, it DOES exist
        _ajax(feed_url, 'json',
            function (feed) {
                _putFeedInCache(feed);
                promise.resolve(JSON.parse(feed));
            }, function (errorMessage, errorThrown) {
                // if the ajax request fails, pass it down to the (global) error handler
                _errorHandler(errorMessage, errorThrown);
            });

        return promise;
    }

    function _feedInCache() {
        // we make "user" part of the definition because some people might use this for more than one user
        if (localStorage["feed_" + _config.user] == undefined) {
            return false;
        }

        // if the the cached feed is older than "_config.cacheTime()", we'll return false and reload it from github
        return JSON.parse(localStorage["feed_" + _config.user])[0].fetched_at + _config.cacheTime() * 1000 > Date.now();
    }

    function _getFeedFromCache() {
        return localStorage["feed_" + _config.user];
    }

    function _putFeedInCache(feed) {
        var newFeed = JSON.parse(feed);
        // localstorage doesn't provide a native way to limit the lifetime of the cache
        // and therefore we'll just attach the current time to the feed
        newFeed[0].fetched_at = Date.now();
        localStorage["feed_" + _config.user] = JSON.stringify(newFeed);
    }

    function _ajax(url, format, doneFcn, failFcn) {

        var http_request = new XMLHttpRequest();

        if (http_request.overrideMimeType)
            http_request.overrideMimeType('text/' + format);

        if (!http_request) {
            errorHandler("Couldn't initiate XMLHttpRequest", "Error");
        }

        http_request.onreadystatechange = function () {
            if (http_request.readyState == 4) {
                // ajax request on a local file system return 0 because there is no server running that might return any code
                if (http_request.status == 200) {
                    doneFcn(http_request.responseText);
                } else {
                    failFcn("AJAX Request failed.", "Error " + http_request.status);
                }
            }
        };
        http_request.open('GET', url, true);
        http_request.send(null);
    }

    function _format(data) {

        // only the elements that: 1.are supported by the script 2.wanted by the user, are relevant
        var relevantEvents = 0;

        for (var i = 0; i < data.length; ++i) {
            // only continue if the event type is supported
            if ((_events.indexOf(data[i].type) != -1) &&
                // the user specified the event in the options
                (_config.typeOfEvents.toString().indexOf(data[i].type) != -1) &&
                // and we haven't reached the maximum number of events yet
                (relevantEvents < _config.numberOfEvents)) {

                // let's polish up the data
                var event = new EventFactory(data[i], _config.containerClasses);
                var eventTemplate = event.getTemplate();

                // and fill the template with them
                _appendToTemplate(eventTemplate);

                ++relevantEvents;
            }
        }
    }

    function _appendToTemplate(eventTemplate) {
        document.getElementById(_config.container).appendChild(eventTemplate);
    }

    function _errorHandler(errorMessage, errorThrown) {
        // errorMessage in an actual message and errorThrown is the error in the http response
        if (_config.debug) {
            alert("errorMessage: " + errorMessage + "\n" +
                "errorThrown: " + errorThrown);
        } else {
            console.log("errorMessage: " + errorMessage);
            console.log("errorThrown: " + errorThrown);
        }
    }

    // declare which methods and properties are supposed to be public
    return {
        FEED: feed
    };
}();
