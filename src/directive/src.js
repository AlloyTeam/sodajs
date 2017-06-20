import Sodajs from './../sodajs';

Sodajs.directive('src', {
    link: function({scope, el, expression, parseSodaExpression}){
        const VALUE_OUT_REG = /\{\{([^\}]*)\}\}/g;

        var expressFunc = expression.replace(VALUE_OUT_REG, function(item, $1){
            return parseSodaExpression($1, scope); 
        });

        if(expressFunc){
            el.setAttribute("src", expressFunc);
        }else{
        }
    }
});

