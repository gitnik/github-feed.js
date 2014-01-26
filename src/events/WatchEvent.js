function WatchEvent(data, config){
    this.data = data;
    this.config = config;
}

WatchEvent.prototype.getData = function() {
    var tmpData       = {};
    tmpData.type      = this.data.type;
    tmpData.date      = _formatTime(this.data.created_at);
    tmpData.user      = this.data.actor.login;
    tmpData.userUrl   = "https://github.com/" + tmpData.user;

    tmpData.repo      = this.data.repo.name;
    tmpData.repoUrl   = _removeApiUrl(this.data.repo.url);

    return tmpData;
}
