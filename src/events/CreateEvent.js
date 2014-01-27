function CreateEvent(data, config){
    this.data = data;
    this.config = config;
}

CreateEvent.prototype.getData = function() {
    var tmpData            = {};
    tmpData.type           = this.data.type;
    tmpData.date           = _formatTime(this.data.created_at);
    tmpData.user           = this.data.actor.login;
    tmpData.userUrl        = "https://github.com/" + tmpData.user;
    tmpData.payloadRefType = this.data.payload.ref_type;
    tmpData.repo           = _getRepo(this.data.actor.login, this.data.repo.name)
    tmpData.repoUrl        = _getRepoUrl(this.data.actor.login, this.data.repo.name);
    tmpData.branch         = this.data.payload.ref;
    tmpData.branchUrl      = tmpData.repoUrl + '/tree/' + tmpData.branch;

    return tmpData;
}
