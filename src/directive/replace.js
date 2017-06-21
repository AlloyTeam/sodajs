import Soda from './../soda';

Soda.directive('replace', { 
    link({scope, el, expression, parseSodaExpression, document}) {
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
