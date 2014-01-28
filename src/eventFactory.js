function EventFactory(eventData, config)
{
    this.eventData = eventData;
    this.config = config;
}

EventFactory.prototype.getTemplate = function()
{
    var event = this._getEventDataByType();
    var element = document.createElement('div');
    var template = this._getTemplateHtmlFromLink(event.type);

    element.id = event['type'];
    element.className = this.config.containerClasses.join(" ");
    element.innerHTML = this._getCompiledTemplate(template, event);

    return element;
}

EventFactory.prototype._getTemplateHtmlFromLink = function(templateId) {
    var link = document.querySelector('link[rel="import"]');
    var content = link.import;
    return content.querySelector('#' + templateId + "-tmpl").innerHTML;
}

EventFactory.prototype._getCompiledTemplate = function(template, event) {

    // taken from http://ejohn.org/blog/javascript-micro-templating
    var fn = new Function("obj",
        "var p=[];" +

            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +

            // Convert the template into pure JavaScript
            template
                .replace(/[\r\t\n]/g, " ")
                .split("{{").join("\t")
                .replace(/((^|}})[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)}}/g, "',$1,'")
                .split("\t").join("');")
                .split("}}").join("p.push('")
                .split("\r").join("\\'")
            + "');}return p.join('');");

    return fn(event);;
}

EventFactory.prototype._getEventDataByType = function() {
    var type = this.eventData.type;
    var event = new window[type](this.eventData, this.config); // dynamic class loading
    return event.getData();
}
