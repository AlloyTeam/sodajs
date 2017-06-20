import Sodajs from './../sodajs';

Sodajs.directive('html',{
    link({expression, scope, el, parseSodaExpression}) {
        var result = parseSodaExpression(expression, scope);

        if (result) {
            el.innerHTML = result;
        }
    }
});

