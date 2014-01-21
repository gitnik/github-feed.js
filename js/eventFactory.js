function EventFactory(eventData, containerClasses)
{
    this.eventData = eventData;
    this.containerClasses = containerClasses;
}

EventFactory.prototype.getTemplate = function()
{
    var eventData = this.getEventDataByType();

    var element = document.createElement('div');
    element.id = eventData['type'];
    element.className = this.containerClasses.join(" ");
    var template = document.getElementById(eventData.type + "-tmpl").textContent;
    element.innerHTML = template.replace(/{{(.*?)}}/g,
        function(string, found) {
            return eventData[found];
        });

    return element;
}

EventFactory.prototype.getEventDataByType = function() {
    var type = this.eventData.type;
    var event = new window[type](this.eventData); // dynamic class loading
    return event.getData();
}
