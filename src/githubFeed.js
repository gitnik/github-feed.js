function GithubFeed(config) {

    this._events = ["PushEvent", "CreateEvent", "IssueCommentEvent", "WatchEvent"];

    var self = this;

    this._config = {
        // internal config options
        'debug':            false,

        //defined by the user
        'user':             'gitnik',
        'numberOfEvents':   5,
        'container':        'githubContainer', // the container for the feed
        'containerClasses': [], // want to have any classes added to your container?
        'typeOfEvents':     ["PushEvent", "CreateEvent", "IssueCommentEvent", "WatchEvent"], // which of events do you want to see?
        'cache':            86400,
        cacheTime:          function () {
            return (self._config.debug) ? 0 : self._config.cache; // default cacheTime is one day, unless we're in active development
        }
    };

    this._prepareConfig(config);

    // fetch the feed
    var feedPromise = this._getFeed();
    feedPromise.then(function (feed) {
        self._process(feed);
    });
}

GithubFeed.prototype._prepareConfig = function (options) {
    // substitute the default config with the user-given options
    for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
            this._config[prop] = options[prop];
        }
    }
}


GithubFeed.prototype._getFeed = function () {

    var self = this;

    var promise = new Promise();

    // check if the json data was loaded before and if so, return it right away
    if (cacheFeed = this._feedInCache()) {
        promise.resolve(JSON.parse(cacheFeed));
        return promise;
    }

    var feed_url = "https://api.github.com/users/" + this._config.user + "/events";

    // ajax without jQuery. Yes, it DOES exist
    this._ajax(feed_url, 'json',
        function (feed) {
            self._putFeedInCache(feed);
            promise.resolve(JSON.parse(feed));
        }, function (errorMessage, errorThrown) {
            // if the ajax request fails, pass it down to the (global) error handler
            self._errorHandler(errorMessage, errorThrown);
        });

    return promise;
}

GithubFeed.prototype._feedInCache = function () {
    // we make "user" part of the definition because some people might use this for more than one user
    if (localStorage["feed_" + this._config.user] == undefined) {
        return false;
    }

    // if the the cached feed is older than "this._config.cacheTime()", we'll return false and reload it from github
    if ((JSON.parse(localStorage["feed_" + this._config.user])[0].fetched_at + this._config.cacheTime() * 1000) > Date.now()) {
        // feed is too old
        return false;
    }

    return localStorage["feed_" + this._config.user];
}


GithubFeed.prototype._putFeedInCache = function (feed) {
    var newFeed = JSON.parse(feed);
    // localstorage doesn't provide a native way to limit the lifetime of the cache
    // and therefore we'll just attach the current time to the feed
    newFeed[0].fetched_at = Date.now();
    localStorage["feed_" + this._config.user] = JSON.stringify(newFeed);
}

GithubFeed.prototype._ajax = function (url, format, doneFcn, failFcn) {
    var http_request = new XMLHttpRequest();

    if (http_request.overrideMimeType)
        http_request.overrideMimeType('text/' + format);

    if (!http_request) {
        this._errorHandler("Couldn't initiate XMLHttpRequest", "Error");
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

GithubFeed.prototype._process = function (feed) {
    // only the elements that: 1.are supported by the script 2.wanted by the user, are relevant
    var relevantEvents = 0;

    for (var i = 0; i < feed.length; ++i) {
        // only continue if the event type is supported
        if ((this._events.indexOf(feed[i].type) != -1) &&
            // the user specified the event in the options
            (this._config.typeOfEvents.toString().indexOf(feed[i].type) != -1) &&
            // and we haven't reached the maximum number of events yet
            (relevantEvents < this._config.numberOfEvents)) {

            // let's polish up the data
            var event = new EventFactory(feed[i], this._config);
            var eventTemplate = event.getTemplate();

            // append compiled template to container element
            document.getElementById(this._config.container).appendChild(eventTemplate);

            ++relevantEvents;
        }
    }
}


GithubFeed.prototype._errorHandler = function (errorMessage, errorThrown) {
    // errorMessage in an actual message and errorThrown is the error in the http response
    if (this._config.debug) {
        alert("errorMessage: " + errorMessage + "\n" +
            "errorThrown: " + errorThrown);
    } else {
        console.log("errorMessage: " + errorMessage);
        console.log("errorThrown: " + errorThrown);
    }
}
