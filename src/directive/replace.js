import Sodajs from './../sodajs';

Sodajs.directive('replace', { 
    link({scope, el, expression, parseSodaExpression}) {
        var result = parseSodaExpression(expression, scope);

        if (result) {
            var div = document.createElement('div');
            div.innerHTML = result;

            if (el.parentNode) {
                while (div.childNodes[0]) {
                    el.parentNode.insertBefore(div.childNodes[0], el);
                }
            }
        }

        el.parentNode && el.parentNode.removeChild(el);
    }
});
