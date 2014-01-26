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
        return Math.round(diff / 1000) + " seconds ago";

    if (diff < msPerHour)
        return Math.round(diff / msPerMinute) + " minutes ago";

    if (diff < msPerDay)
        return Math.round(diff / msPerHour) + " hours ago";

    if (diff < msPerMonth)
        return Math.round(diff / msPerDay) + " days ago";

    if (diff < msPerYear)
        return Math.round(diff / msPerMonth) + " months ago";

    return Math.round(diff / msPerYear) + " years ago";
}

function _getRef(ref) {
    return ref.split('/')[2];
}

function _getRepo(user, repo) {
    if (repo.split('/')[0] == user) {
        // it's their own repo, just return the repo name
        return repo.split('/')[1];
    } else {
        // return the full name
        return repo;
    }
}

function _getRepoUrl(user, repo) {
    if (repo.split('/')[0] == user) {
        return "https://github.com/" + user + "/" + repo.split('/')[1];
    } else {
        return "https://github.com/" + repo;
    }
}

function _removeApiUrl(url) {
    return url.replace('https://api.github.com/repos/', 'https://github.com/');
}

function _truncateMessage(message, limit) {
    if (message.length > limit) {
        return message.substring(0, limit) + "...";
    } else
        return message;

}
