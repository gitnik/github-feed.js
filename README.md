github-feed.js
==============

A simple and pretty small script that fetches a users github activity feed and outputs it.

A [demo](http://technik.io) is available on my website

### getting the script running
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
  	<meta name="viewport" content="width=device-width">
  	<style type="text/css">
  		#myContainer #msg {
  		 	font-weight: bold;
  			font-size: 15px;
  		 }

  		 #myContainer #commitTmpl {
  		 	padding-top: 5px;
  		 	font-size: 11px;
  		 	font-style: italic;
  		 }

  		 #myContainer .panel {
  		 	font-family: "Helvetica Neue", sans-serif;
  			padding: 0.8em;
  			margin-bottom: 0.5em;
  			border-radius: 7px;
  			border-style: solid;
  			border-width: 1px;
  			border-color: #d9d9d9;
  			margin-bottom: 1.25em;
  			padding: 1.25em;
  			background: #f2f2f2;
  			width: 200px;
  		 }
  	</style>

    <link rel="import" href="templates.html">
  	<title>github feed</title>
</head>
<body>
	<div id="myContainer">
	</div>

    <script src="dist/polymeer-platform.js"></script>
    <script src="dist/githubFeed.min.js"></script>

	<script type="text/javascript">
        window.addEventListener('HTMLImportsLoaded', function() {
            // all imports loaded
            var options = {
                "user": 'gitnik',
                "numberOfEvents": 10,
                "container": 'myContainer',
                "containerClasses": ["panel"]
            };

            new GithubFeed(options);
        });
	</script>
</body>
</html>



