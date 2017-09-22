(function() {
    var discribes = {};
    if (typeof exports === 'object' && typeof module === 'object') {
        var fs = require('fs');
        var path = require('path');
        discribes.nodeTplPath = function(htmlPath) {
            return fs.readFileSync(path.resolve(__dirname, '../../../../common/templates', htmlPath), 'utf-8');
        };
        module.exports = discribes;
    } else if (typeof define === 'function' && define.amd) {
        define(function() {
            return discribes;
        });
    } else if (typeof exports === 'object') {
    } else {
        window.discribes = discribes;
    }
})();