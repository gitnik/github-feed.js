function EventFactory(eventData, config)
{
    this.eventData = eventData;
    this.config = config;
}

EventFactory.prototype.getTemplate = function()
{
    var event = this.getEventDataByType();
    var element = document.createElement('div');
    var template = document.getElementById(event.type + "-tmpl").textContent;

    element.id = event['type'];
    element.className = this.config.containerClasses.join(" ");
    element.innerHTML = this.getCompiledTemplate(template, event);
    
    return element;
}

EventFactory.prototype.getCompiledTemplate = function(template, event) {

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

EventFactory.prototype.getEventDataByType = function() {
    var type = this.eventData.type;
    var event = new window[type](this.eventData, this.config); // dynamic class loading
    return event.getData();
}
