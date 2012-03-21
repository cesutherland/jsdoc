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
            methodTemplate = Haml(fs.readFileSync(base + 'method.haml')),
            first = true;

        docs.forEach(function (element, i) {
            if (element.kind === 'class') {
                element.summary = element.summary || false;

                if (first) {
                    first = false;
                } else {
                    console.log('</div>'); // Closes class-description
                }

                console.log(classTemplate(element));
            } else
            if (element.kind === 'function' && !element.undocumented) {
                console.log(methodTemplate(element));
            } else {
            }
        });
        console.log('</div>'); // Closes class-description
    }
})();

