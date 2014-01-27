describe("PushEvent", function() {

    it("should return the correct data", function() {

        var data = {"id":"1957240279","type":"PushEvent","actor":{"id":996623,"login":"gitnik","gravatar_id":"8f8cea41a793aec95da53e83cb91ec71","url":"https://api.github.com/users/gitnik","avatar_url":"https://gravatar.com/avatar/8f8cea41a793aec95da53e83cb91ec71?d=https%3A%2F%2Fa248.e.akamai.net%2Fassets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png&r=x"},"repo":{"id":16259934,"name":"gitnik/assert","url":"https://api.github.com/repos/gitnik/assert"},"payload":{"push_id":297164247,"size":1,"distinct_size":1,"ref":"refs/heads/master","head":"72187180fe96714cdc7bf4291f5a6364a263078b","before":"0e4cdfbb67bdf43738038d3b78affcb72c67b122","commits":[{"sha":"72187180fe96714cdc7bf4291f5a6364a263078b","author":{"email":"vagrant@packer-virtualbox.vagrantup.com","name":"Vagrant User"},"message":"renamed assertions","distinct":true,"url":"https://api.github.com/repos/gitnik/assert/commits/72187180fe96714cdc7bf4291f5a6364a263078b"}]},"public":true,"created_at":"2014-01-26T22:12:28Z"};
        var config = {};

        var expected = {
            "type":    "PushEvent",
            "commits": '<a href="https://github.com/gitnik/assert/commits/72187180fe96714cdc7bf4291f5a6364a263078b" id="commit" class="commit">renamed assertions</a><br>',
            "ref":     "master",
            "repo":    "assert",
            "repoUrl": "https://github.com/gitnik/assert",
            "user":    "gitnik"
        };

        var pushEvent = new PushEvent(data, config);
        var eventData = pushEvent.getData();

        for(key in expected) {
            expect(eventData[key]).toBe(expected[key]);
        }
    });
});
