(function() {
    var filters = {
        toFixed: function(input, number) {
            input = Number(input)
            if (isNaN(input)) {
                return 0;
            }
            return input.toFixed(number)
        },
        date: function(input, fmt) {
            var type = typeof input
            if (type == 'number' || (type == 'string' && new Date(input))) {
                return new Date(input).Format(fmt)
            } else if (type == 'object' && input.getTime) {
                return input.Format(fmt)
            } else {
                return '无效的日期参数'
            }
        }
    }
    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = filters;
    } else if (typeof define === 'function' && define.amd)
        define(function() {
            return filters;
        });
    else if (typeof exports === 'object')
        exports["filters"] = filters;
    else
        window.filters = filters;
})();