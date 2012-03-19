(function() {

    var fs = require('fs'),
        _ = require('underscore/underscore');

    /**
        @global
        @param {TAFFY} data
        @param {object} opts
     */
    publish = function(data, opts) {

        // Mustache
        _.templateSettings = {
            interpolate : /\{\{(.+?)\}\}/g
        };

        var docs = data.get(),
            base = __dirname + '/templates/markdown/',
            tClass              = _.template('### Class `{{memberof}}.{{name}}`'),
            tClassSummary       = _.template('_{{summary}}_'),
            tClassDescription   = _.template('{{description}}'),
            tClassParams        = _.template('{{description}}'),
            tClassParam         = _.template('* `{{name}}` {{description}}'),
            tClassOptional      = _.template('* `[{{name}}]` {{description}}'),
            tMethod             = _.template('##### `{{name}}'),
            tMethodParam        = _.template('{{name}}'),
            tMethodParams       = _.template(' ({{params}})`'),
            tMethodOptional     = _.template('[{{param}}]'),
            tDescription        = _.template('{{description}}'),
            t;

        docs.forEach(function (element, i) {
            if (element.kind === 'class') {
                t = tClass(element);
                console.log(t);
                if (element.summary) {
                    t = tClassSummary(element);
                    console.log(t);
                    console.log();
                }
                t = tClassDescription(element);
                console.log(t);
                console.log();
                if (element.params) {
                    console.log('#### Configuration:\n');
                    console.log('An object is submitted to the constructor for configuration.\n');
                    _.each(element.params, function (param) {
                        param.description = param.description || '';
                        if (param.optional) {
                            console.log(tClassParam(param));
                        } else {
                            console.log(tClassOptional(param));
                        }
                    });
                    console.log();
                }

                console.log('#### Methods:\n');
            } else
            if (element.kind === 'function' && !element.undocumented) {
                var params = '';
                t = tMethod(element);
                if (element.params) {
                    _.each(element.params, function (param) {
                        var t = tMethodParam({
                            name : param.name
                        })
                        if (param.optional) {
                            t = tMethodOptional({param : t});
                        }
                        params += t;
                    });
                }
                t += tMethodParams({params : params});
                console.log(t);
                console.log(tDescription(element));
                console.log();
                //console.log(element);
            } else {
                //console.log(element);
            }
        });
    }
})();

