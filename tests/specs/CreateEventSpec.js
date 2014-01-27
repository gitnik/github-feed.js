describe("CreateEvent", function() {

    it("should return the correct data", function() {

        var data = {"id":"1956982765","type":"CreateEvent","actor":{"id":996623,"login":"gitnik","gravatar_id":"8f8cea41a793aec95da53e83cb91ec71","url":"https://api.github.com/users/gitnik","avatar_url":"https://gravatar.com/avatar/8f8cea41a793aec95da53e83cb91ec71?d=https%3A%2F%2Fa248.e.akamai.net%2Fassets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png&r=x"},"repo":{"id":16252131,"name":"gitnik/server-setup","url":"https://api.github.com/repos/gitnik/server-setup"},"payload":{"ref":null,"ref_type":"repository","master_branch":"master","description":"This is where I store my bash scripts that provision new servers into a useable state. "},"public":true,"created_at":"2014-01-26T11:41:39Z"};
        var config = {};

        var expected = {
            "type":           "CreateEvent",
            "branch":         null,
            "payloadRefType": "repository",
            "repo":           "server-setup",
            "repoUrl":        "https://github.com/gitnik/server-setup"
        };

        var createEvent = new CreateEvent(data, config);
        var eventData = createEvent.getData();

        for(key in expected) {
            expect(eventData[key]).toBe(expected[key]);
        }
    });
});
