function EventFactory(eventData, config)
{
    this.eventData = eventData;
    this.config = config;
}

EventFactory.prototype.getTemplate = function()
{
    var event = this.getEventDataByType();

    var element = document.createElement('div');
    element.id = event['type'];
    element.className = this.config.containerClasses.join(" ");
    var template = document.getElementById(event.type + "-tmpl").textContent;

    return this.compileTemplate(element, template, event);
}

EventFactory.prototype.compileTemplate = function(element, template, event) {

    element.innerHTML = template.replace(/{{(.*?)}}/g,
        function(string, found) {
            return event[found];
        });

    return element;
}

EventFactory.prototype.getEventDataByType = function() {
    var type = this.eventData.type;
    var event = new window[type](this.eventData, this.config); // dynamic class loading
    return event.getData();
}
