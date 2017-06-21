import Soda from './../soda';

Soda.directive('style', {
    link({scope, el, expression, parseSodaExpression}) {
        var expressFunc = parseSodaExpression(expression, scope);

        var getCssValue = function(name, value) {
            var numberWithoutpx = /opacity|z-index/;
            if (numberWithoutpx.test(name)) {
                return parseFloat(value);
            }

            if (isNaN(value)) {
                return value;
            } else {
                return value + "px";
            }
        };

        if (expressFunc) {
            var stylelist = [];

            for (var i in expressFunc) {
                if (expressFunc.hasOwnProperty(i)) {
                    var provalue = getCssValue(i, expressFunc[i]);

                    stylelist.push([i, provalue].join(":"));
                }
            }

            var style = el.style;
            for (var i = 0; i < style.length; i++) {
                var name = style[i];
                if (expressFunc[name]) {} else {
                    stylelist.push([name, style[name]].join(":"));
                }
            }

            var styleStr = stylelist.join(";");

            el.setAttribute("style", styleStr);
        }
    }
});
