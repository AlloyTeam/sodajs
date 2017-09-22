(function() {
    function init(soda, filters, discribes, directives) {
        filters = filters || {};
        discribes = discribes || {};
        directives = directives || {};
        soda.prefix('ng-');
        for (var key in filters) {
            soda.filter(key, filters[key])
        }
        for (var key in discribes) {
            soda.discribe(key, discribes[key])
        }
        for (var key in directives) {
            soda.directive(key, directives[key])
        }
        return soda;
    }
    if (typeof exports === 'object' && typeof module === 'object') {
        // CMD
        var soda = require('sodajs/node');
        // var soda_old = require('../lib/soda.old');
        var filters = require('./filter');
        var discribes = require('./discribe');
        var directives = require('./directive');
        var ngTemplate = init(soda, filters, discribes, directives);
        module.exports = ngTemplate;
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define([], function() {
            var engine = null;
            var ngTemplate = {
                render: function(str, scope) {
                    var dfd = $.Deferred();
                    getTemplateEngine().then(function(engine) {
                        dfd.resolve(engine(str, scope))
                    }, function(e) {
                        console.log(e)
                    })
                    return dfd.promise();
                }
            };
            // 获取模版引擎
            function getTemplateEngine() {
                var dfd = $.Deferred();
                if (engine) {
                    dfd.resolve(engine)
                } else {
                    require(['soda', 'filters', 'discribes', 'directives'], function(soda, filters, discribes, directives) {
                        if (soda) {
                            engine = init(soda, filters, discribes, directives);
                            dfd.resolve(engine)
                        } else {
                            dfd.reject('加载失败')
                        }
                    }, function(e) {
                        console.log(e)
                        dfd.reject('加载失败')
                    })
                }
                return dfd.promise();
            }
            window.ngTemplate = ngTemplate;
            return ngTemplate;
        });
    } else if (typeof exports === 'object') {
        // ES6
    } else {
        window.ngTemplate = init(soda, filters, discribes, directives);
    }
})();