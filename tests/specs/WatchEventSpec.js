describe("WatchEvent", function() {

    it("should return the correct data", function() {

        var data = {"id":"1957183461","type":"WatchEvent","actor":{"id":996623,"login":"gitnik","gravatar_id":"8f8cea41a793aec95da53e83cb91ec71","url":"https://api.github.com/users/gitnik","avatar_url":"https://gravatar.com/avatar/8f8cea41a793aec95da53e83cb91ec71?d=https%3A%2F%2Fa248.e.akamai.net%2Fassets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png&r=x"},"repo":{"id":4387220,"name":"beberlei/assert","url":"https://api.github.com/repos/beberlei/assert"},"payload":{"action":"started"},"public":true,"created_at":"2014-01-26T20:12:55Z"};        var config = {};
        var config = {};

        var expected = {
            "type":    "WatchEvent",
            "user":    "gitnik",
            "userUrl": "https://github.com/gitnik",
            "repo":    "beberlei/assert",
            "repoUrl": "https://github.com/beberlei/assert"
        };

        var watchEvent = new WatchEvent(data, config);
        var eventData = watchEvent.getData();

        for(key in expected) {
            expect(eventData[key]).toBe(expected[key]);
        }
    });
});
