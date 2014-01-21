function CreateEvent(data){
    this.data = data;
}

CreateEvent.prototype.getData = function() {
    var tmpData        = {};
    tmpData.type       = this.data.type;
    tmpData.date       = _formatTime(this.data.created_at);
    tmpData.user       = this.data.actor.login;
    tmpData.userUrl    = "https://github.com/" + tmpData.user;
    tmpData.actualText = this.handleHtmlBasedOnBranchOrRepository();

    return tmpData;
}


CreateEvent.prototype.handleHtmlBasedOnBranchOrRepository = function() {
    if(this.data.payload.ref == null)
        return this.handleHtmlRepository();
    else
        return this.handleHtmlBranch();
}

CreateEvent.prototype.handleHtmlBranch = function() {
    var repoUrl = _getRepoUrl(this.data.actor.login, this.data.repo.name);
    var branchUrl = repoUrl + '/tree/' + this.data.payload.ref;

    var html = 'branch <a href="' + branchUrl + '">' + this.data.payload.ref + '</a>';
    html += ' at <a href="' + repoUrl + '">' + _getRepo(this.data.actor.login, this.data.repo.name) + '</a>';

    return html;
}

CreateEvent.prototype.handleHtmlRepository = function() {

    var url = _getRepoUrl(this.data.actor.login, this.data.repo.name);
    var html = 'repository <a href="' + url + '">' + _getRepo(this.data.actor.login, this.data.repo.name) + '</a>';

    return html;
}
