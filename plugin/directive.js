(function() {
    var directives = {};
    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = directives;
    } else if (typeof define === 'function' && define.amd)
        define(function() {
            return directives;
        });
    else if (typeof exports === 'object')
        exports["directives"] = directives;
    else
        window.directives = directives;
})();