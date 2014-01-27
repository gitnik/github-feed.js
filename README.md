github-feed.js
==============

A simple and pretty small script that fetches a users github activity feed and outputs it.

Key features are:
* highly customizable
* no dependencies (expect for parts of [promise.js](https://github.com/stackp/promisejs), which are included)
* speed (thanks to caching and script templates)


A [demo](https://justnik.io) is available on my website


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
  	<title>github feed</title>
</head>
<body>
	<div id="myContainer">
	</div>


	<script type="text/html" id="PushEvent-tmpl">
        <h5><small><div class="time">{{=date}}</div></small></h5>
        <div class="msg">
            <a href="{{=userUrl}}">{{=user}}</a> pushed to
            <a href="{{=refUrl}}">{{=ref}}</a> at <a href="{{=repoUrl}}">{{=repo}}</a>
        </div>
        <div class="commitTmpl">
            {{=commits}}
        </div>
    </script>
    <script type="text/html" id="CreateEvent-tmpl">
        <h5><small><div class="time">{{=date}}</div></small></h5>
        <div class="msg">
            {{ if( payloadRefType == "branch") { }}
                <a href="{{=userUrl}}">{{=user}}</a> created branch <a href="{{=branchUrl}}">{{=branch}}</a>
                at <a href="{{=repoUrl}}">{{=repo}}</a>
            {{ } else if(payloadRefType == "repository") { }}
                <a href="{{=userUrl}}">{{=user}}</a> created repository <a href="{{=repoUrl}}">{{=repo}}</a>
            {{ } }}

        </div>
    </script>
    <script type="text/html" id="IssueCommentEvent-tmpl">
        <h5><small><div class="time">{{=date}}</div></small></h5>
        <div class="msg">
            <a href="{{=userUrl}}">{{=user}}</a> commented on <a href="{{=issueUrl}}">{{=issue}}</a>
        </div>
        <div class="issueCommentTmpl">
            <a href="{{=commentUrl}}">{{=comment}}</a>
        </div>
    </script>
    <script type="text/html" id="WatchEvent-tmpl">
        <h5><small><div class="time">{{=date}}</div></small></h5>
        <div class="msg">
            <a href="{{=userUrl}}">{{=user}}</a> starred <a href="{{=repoUrl}}">{{=repo}}</a>
        </div>
    </script>
	<script src="src/promise.js"></script>
    <script src="src/events/functions.js"></script>
    <script src="src/events/PushEvent.js"></script>
    <script src="src/events/CreateEvent.js"></script>
    <script src="src/events/IssueCommentEvent.js"></script>
    <script src="src/events/WatchEvent.js"></script>
    <script src="src/eventFactory.js"></script>
    <script src="src/githubFeed.js"></script>
	<script type="text/javascript">
		var options = {
			user: 'gitnik',
			numberOfEvents: 10,
			container: 'myContainer',
			containerClasses: ["panel"]
		};

		GITHUB.FEED(options);
	</script>
</body>
</html>

