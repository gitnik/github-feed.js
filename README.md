github-feed.js
==============

A simple and pretty small script that fetches a users github activity feed and outputs it.

Key features are:
* highly customizable
* small size
* no dependencies (expect for parts of [promise.js](https://github.com/stackp/promisejs), which are included)
* speed (thanks to caching and script templates) 


### getting the script running

```html
<!DOCTYPE html>
<head>
	<meta charset="utf-8">
</head>
<body>
	<div id="githubContainer">
	</div>

	<!--- template for the currently only supported event. more will be added later on -->
 	<script type="text/html" id="PushEvent-tmpl">
		<h5><small><div id="time" class="time"></div></h5></small>
		<div id="msg">
			<a href="#" id="user" class="user"></a> pushed to 
			<a href="#" id="head" class="head"></a> at <a href="#" id="repo" class="repo"></a>
		</div>
		<div id="commitTmpl" class="commitTmpl">
			<a href="#" id="commit" class="commit"></a>
		</div>
  	</script>
  	<script src="promise.js"></script>
  	<script src="github-feed.js"></script>
  	<script type="text/javascript">
  	
  	// In order to make the usage of the script as easy as possible, 
	// there's only a single publicly available function, called "FEED"
	
  	var options = {
  		// your github name
  		'user': 'gitnik', 
  		
  		// how many events do you want to show (default: 5)
		'numberOfEvents': 5,
		
		// the container for the feed
		'container': 'githubContainer', 
		
		// here you can specify classes that you want to be added to the templates
		'containerClasses': '',  
		
		// which of events do you want to see? currently supported events are: "PushEvent"
		'typeOfEvents': ["PushEvent"], 
		
		// how long (how many seconds) do you want to store the feed in user's cache? (default: one day)
		cacheTime(60*60*24) 
	}
  	
  	
  	GITHUB.FEED(options);
  	</script>
</body>
