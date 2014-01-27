describe("IssueCommentEvent", function() {

    it("should return the correct data", function() {

        var data = {"id":"1957240932","type":"IssueCommentEvent","actor":{"id":996623,"login":"gitnik","gravatar_id":"8f8cea41a793aec95da53e83cb91ec71","url":"https://api.github.com/users/gitnik","avatar_url":"https://gravatar.com/avatar/8f8cea41a793aec95da53e83cb91ec71?d=https%3A%2F%2Fa248.e.akamai.net%2Fassets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png&r=x"},"repo":{"id":4387220,"name":"beberlei/assert","url":"https://api.github.com/repos/beberlei/assert"},"payload":{"action":"created","issue":{"url":"https://api.github.com/repos/beberlei/assert/issues/49","labels_url":"https://api.github.com/repos/beberlei/assert/issues/49/labels{/name}","comments_url":"https://api.github.com/repos/beberlei/assert/issues/49/comments","events_url":"https://api.github.com/repos/beberlei/assert/issues/49/events","html_url":"https://github.com/beberlei/assert/pull/49","id":26321005,"number":49,"title":"Add isNot and isNotStrict assertions","user":{"login":"gitnik","id":996623,"avatar_url":"https://gravatar.com/avatar/8f8cea41a793aec95da53e83cb91ec71?d=https%3A%2F%2Fidenticons.github.com%2F0d17e1ffe622ac36e23f0aa2032b716f.png&r=x","gravatar_id":"8f8cea41a793aec95da53e83cb91ec71","url":"https://api.github.com/users/gitnik","html_url":"https://github.com/gitnik","followers_url":"https://api.github.com/users/gitnik/followers","following_url":"https://api.github.com/users/gitnik/following{/other_user}","gists_url":"https://api.github.com/users/gitnik/gists{/gist_id}","starred_url":"https://api.github.com/users/gitnik/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/gitnik/subscriptions","organizations_url":"https://api.github.com/users/gitnik/orgs","repos_url":"https://api.github.com/users/gitnik/repos","events_url":"https://api.github.com/users/gitnik/events{/privacy}","received_events_url":"https://api.github.com/users/gitnik/received_events","type":"User","site_admin":false},"labels":[],"state":"open","assignee":null,"milestone":null,"comments":3,"created_at":"2014-01-26T19:57:29Z","updated_at":"2014-01-26T22:13:55Z","closed_at":null,"pull_request":{"html_url":"https://github.com/beberlei/assert/pull/49","diff_url":"https://github.com/beberlei/assert/pull/49.diff","patch_url":"https://github.com/beberlei/assert/pull/49.patch"},"body":""},"comment":{"url":"https://api.github.com/repos/beberlei/assert/issues/comments/33332318","html_url":"https://github.com/beberlei/assert/pull/49#issuecomment-33332318","issue_url":"https://api.github.com/repos/beberlei/assert/issues/49","id":33332318,"user":{"login":"gitnik","id":996623,"avatar_url":"https://gravatar.com/avatar/8f8cea41a793aec95da53e83cb91ec71?d=https%3A%2F%2Fidenticons.github.com%2F0d17e1ffe622ac36e23f0aa2032b716f.png&r=x","gravatar_id":"8f8cea41a793aec95da53e83cb91ec71","url":"https://api.github.com/users/gitnik","html_url":"https://github.com/gitnik","followers_url":"https://api.github.com/users/gitnik/followers","following_url":"https://api.github.com/users/gitnik/following{/other_user}","gists_url":"https://api.github.com/users/gitnik/gists{/gist_id}","starred_url":"https://api.github.com/users/gitnik/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/gitnik/subscriptions","organizations_url":"https://api.github.com/users/gitnik/orgs","repos_url":"https://api.github.com/users/gitnik/repos","events_url":"https://api.github.com/users/gitnik/events{/privacy}","received_events_url":"https://api.github.com/users/gitnik/received_events","type":"User","site_admin":false},"created_at":"2014-01-26T22:13:55Z","updated_at":"2014-01-26T22:13:55Z","body":"alright I renamed the functions (even tho I doesn't show my for some reasons, probably a vagrant issue)\r\n\r\nand yes those annotations were generated via the php script"}},"public":true,"created_at":"2014-01-26T22:13:55Z"};        var config = {};
        var config = {
            "maxMessageLength": 17
        };

        var expected = {
            "type":       "IssueCommentEvent",
            "issue":      "beberlei/assert/#49",
            "issueUrl":   "https://github.com/beberlei/assert/pull/49",
            "commentUrl": "https://github.com/beberlei/assert/pull/49#issuecomment-33332318",
            "comment":    "alright I renamed..."
        };

        var issueCommentEvent = new IssueCommentEvent(data, config);
        var eventData = issueCommentEvent.getData();

        for(key in expected) {
            expect(eventData[key]).toBe(expected[key]);
        }
    });
});
