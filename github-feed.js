var GITHUB = function(){

	var _events = ["PushEvent"]; // we only support this single event at the moment
				     // more might be added later on

	var _config = {
		// internal config options
		'debug': false,

		//defined by the user
		'user': 'gitnik',
		'numberOfEvents': 5,
		'container': 'githubContainer', // the container for the feed
		'containerClasses': '',  // here you can specify classes that you want to be added to the templates
		'typeOfEvents': ["PushEvent"], // which of events do you want to see?
		cacheTime: function(seconds) {
			var seconds = seconds || 86400;
			return (_config.debug)? 0 : seconds; // default cacheTime is one day, unless we're in active development
		}
	};

	// the main method
	function feed(options) {

		// substitude the default config with the user-given options
		for(var prop in options) {
        	if(options.hasOwnProperty(prop)){
            	_config[prop] = options[prop];
        	}
    	}

		var feedPromise = _getFeed();
		feedPromise.then(function(feed){
			_format(feed);
		});
	}

	function _getFeed() {
		
		var promise = new Promise();

		// check if the json data was loaded before and if so, return it right away
		if(_feedInCache()){
			promise.resolve(JSON.parse(_getFeedFromCache()));
			return promise;
		}

		var feed_url = "https://api.github.com/users/" + _config.user + "/events";

		// ajax without jQuery. Yes, it DOES exist
		_ajax( feed_url, 'json', 
		function(feed){
			promise.resolve(JSON.parse(feed));
			_putFeedInCache(feed);
		}, function(errorMessage, errorThrown) {
			// if the ajax request fails, pass it down to the (global) error handler
			_errorHandler(errorMessage, errorThrown);
		});

		return promise;
	}

	function _feedInCache() {
		// we make "user" part of the definition because some people might use this for more than one user
		if(localStorage["feed_"+_config.user] == undefined) {
			return false;
		}

		// if the the cached feed is older than "_config.cacheTime()", we'll return false and reload it from github
		return JSON.parse(localStorage["feed_"+_config.user])[0].fetched_at + _config.cacheTime()*1000 > Date.now();
	}

	function _getFeedFromCache() {
		return localStorage["feed_"+_config.user];
	}

	function _putFeedInCache(feed) {
		var newFeed = JSON.parse(feed);
		// localstorage doesn't provide a native way to limit the lifetime of the cache
		// and therefore we'll just attach the current time to the feed
		newFeed[0].fetched_at = Date.now();
		localStorage["feed_"+_config.user] = JSON.stringify(newFeed); 
	}

	function _ajax(url, format, doneFcn, failFcn) {

		var http_request = new XMLHttpRequest();

        if (http_request.overrideMimeType)
        	http_request.overrideMimeType('text/'+format);

        if(!http_request) {
        	errorHandler("Couldn't initiate XMLHttpRequest", "Error");
        }

        http_request.onreadystatechange = function() {
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

		for (var i = 0; i < data.length ; ++i) {
			// only continue if the event type is supported
			if(	(_events.indexOf(data[i].type) != -1) &&
				// the user specified the event in the options 
				(_config.typeOfEvents.toString().indexOf(data[i].type) != -1) &&
				// and we haven't reached the maximum number of events yet
				(relevantEvents < _config.numberOfEvents)) {

				// let's polish up the data
				var eventData = _sanitizeEventData(data[i]);

				// and fill the template with them
				_populateTemplate(eventData);

				++relevantEvents;
			}
		}
	}

	function _sanitizeEventData(data) {

		var eventData     = {};

		eventData.date    = _formatTime( data.created_at ); // iso8601 format
		eventData.type    = data.type, // event type
		eventData.user    = data.actor.login,
		eventData.userUrl = "http://github.com/" + eventData.user,
		eventData.head    = _getBranch( data.payload.ref ), 
		eventData.repo    = _getRepo( data.repo.name ),
		eventData.repoUrl = "http://github.com/" + eventData.user + "/" + eventData.repo,
		eventData.headUrl = eventData.repoUrl + "/tree/" + eventData.head;

		// one push can have multiple commits
		eventData.commits = [];

		for (var i = 0; i < data.payload.commits.length; ++i) {
			eventData.commits.push( 
				{ "msg": data.payload.commits[i].message,
				  "url": _getCommitUrl(data.payload.commits[i].url)
				});
		}

		return eventData;
	}

	function _populateTemplate(event) {

		var rootElement = document.createElement('div');
		rootElement.id = event.type;
		rootElement.className = _config.containerClasses; 
		rootElement.innerHTML = document.getElementById(event.type + "-tmpl").textContent;

		var clone = rootElement.cloneNode(true); 

		// because the following elements all have the same nodea and only use different classes
		// we'll be using currying
		byClassAndNode = _byClass(clone);

		byClassAndNode("time").textContent = event.date

		byClassAndNode("user").textContent = event.user;
		byClassAndNode("user").href = event.userUrl;

		byClassAndNode("head").textContent = event.head;
		byClassAndNode("head").href = event.headUrl;

		byClassAndNode("repo").textContent = event.repo;
		byClassAndNode("repo").href = event.repoUrl;

		var commitRoot = byClassAndNode("commitTmpl");

		// commitRoot will be modified in _populateCommitTemplate
		// thanks to JS passing arguments as references by default
		_populateCommitTemplate( commitRoot, event.commits );

		document.getElementById(_config.container).appendChild(clone);

	}

	function _populateCommitTemplate(commitRoot, commits) {

		for (var i = 0; i < commits.length; ++i) {

			var commitNode = document.createElement('a');
			commitNode.innerHTML = commitRoot.innerHTML; // commitRoot.innerHTML is used as a template
			commitRoot.innerHTML = ""; // and therefore we'll unset it once we copied the template

			commitNode.href = commits[i].url;
			commitNode.innerHTML = commits[i].msg.replace('\n', '<br>'); // textContent doesn't work because we may encounter <br>s

			commitRoot.appendChild(commitNode);
		}
	}

	function _byClass(el) {
		return function(className) {
			return el.getElementsByClassName( className )[0];
		}
	}

	function _getBranch(ref) {
		return ref.replace(/^refs\/(heads\/|remotes\/)/, "");
	}

	function _getRepo(repo) {
		return repo.split('/')[1];
	}

	function _formatTime(datetime) {
		var current = Date.now();
		var past = Date.parse(datetime);
		var diff = current - past;

		var msPerMinute = 60 * 1000,
    	msPerHour = msPerMinute * 60,
    	msPerDay = msPerHour * 24,
    	msPerWeek = msPerDay * 7,
    	msPerMonth = msPerWeek * 4.3,
    	msPerYear = msPerDay * 365;

    	if (diff < msPerMinute) 
         	return Math.round(diff/1000) + " seconds ago";   
    	
    	if (diff < msPerHour) 
        	return Math.round(diff/msPerMinute) + " minutes ago";

    	if (diff < msPerDay) 
        	return Math.round(diff/msPerHour ) + " hours ago";   

    	if (diff < msPerMonth) 
        	return Math.round(diff/msPerDay) + " days ago";

    	if (diff < msPerYear) 
        	return Math.round(diff/msPerMonth) + " months ago";       	

        return Math.round(diff/msPerYear ) +  " years ago";
	}

	function _getCommitUrl(url) {
		return url.replace('https://api.github.com/repos/', 'https://github.com/');
	}

	function _errorHandler(errorMessage, errorThrown) {
		// errorMessage in an actual message and errorThrown is the error in the http response
		if(_config.debug) {
			alert("errorMessage: " + errorMessage + "\n" +
				  "errorThrown: " + errorThrown);
		} else {
			console.log("errorMessage: " + errorMessage);
			console.log("errorThrown: " + errorThrown);
		}
	}

	// declare which methods and propertiers are supposed to be public
	return {
		FEED: feed
	};
}();
