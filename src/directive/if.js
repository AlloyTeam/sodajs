import Soda from './../soda';

Soda.directive('if', {
    priority: 9,
    link: function({expression, parseSodaExpression, scope, el}){
        var expressFunc = parseSodaExpression(expression, scope);

        if(expressFunc){
        }else{
            el.parentNode && el.parentNode.removeChild(el);
            el.innerHTML = '';
        }
    }
});
