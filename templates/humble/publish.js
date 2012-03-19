(function() {

    var fs = require('fs'),
        Haml = require('haml/lib/haml');

    /**
        @global
        @param {TAFFY} data
        @param {object} opts
     */
    publish = function(data, opts) {

        var docs = data.get(),
            base = __dirname + '/templates/humble/',
            classTemplate = Haml(fs.readFileSync(base + 'class.haml'), { optimize : false }),
            methodTemplate = Haml(fs.readFileSync(base + 'method.haml'));

        docs.forEach(function (element, i) {
            if (element.kind === 'class') {
                element.summary = element.summary || false;
                console.log(classTemplate(element));
            } else
            if (element.kind === 'function' && !element.undocumented) {
                console.log(methodTemplate(element));
            } else {
            }
        });
    }
})();

