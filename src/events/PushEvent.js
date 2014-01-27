function PushEvent(data, config){
    this.data = data;
    this.config = config;
}

PushEvent.prototype.getData = function() {
    var tmpData     = {};
    tmpData.type    = this.data.type;
    tmpData.date    = _formatTime(this.data.created_at);
    tmpData.user    = this.data.actor.login;
    tmpData.userUrl = "https://github.com/" + tmpData.user;
    tmpData.ref     = _getRef(this.data.payload.ref);
    tmpData.refUrl  = "https://github.com/" + this.data.repo.name;
    tmpData.repo    = _getRepo(tmpData.user, this.data.repo.name);
    tmpData.repoUrl = _removeApiUrl(this.data.repo.url);
    tmpData.commits = this.processCommits();

    return tmpData;
}

PushEvent.prototype.processCommits = function() {

    var commits = "";

    for (var i = 0; i < this.data.payload.commits.length; ++i) {
        commits += '<a href="' + _removeApiUrl(this.data.payload.commits[i].url) + '" id="commit" class="commit">';
        commits += _truncateMessage(this.data.payload.commits[i].message, this.config.maxMessageLength);
        commits += '</a><br>';
    }

    return commits;
}


