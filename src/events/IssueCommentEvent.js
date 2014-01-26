function IssueCommentEvent(data, config){
    this.data = data;
    this.config = config;
}

IssueCommentEvent.prototype.getData = function() {
    var tmpData       = {};
    tmpData.type      = this.data.type;
    tmpData.date      = _formatTime(this.data.created_at);
    tmpData.user      = this.data.actor.login;
    tmpData.userUrl   = "https://github.com/" + tmpData.user;
    tmpData.issue     = _getRepo(this.data.actor.login, this.data.repo.name) + "/#" + this.data.payload.issue.number;
    tmpData.issueUrl  = this.data.payload.issue.html_url;
    tmpData.comment   = _truncateMessage(this.data.payload.comment.body, this.config.maxMessageLength);
    tmpData.commentUrl= this.data.payload.comment.html_url;

    return tmpData;
}
