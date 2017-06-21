import Soda from './../soda';

var classNameRegExp = function(className) {
    return new RegExp('(^|\\s+)' + className + '(\\s+|$)', 'g');
};

var addClass = function(el, className){
    if(! el.className){
        el.className = className;

        return;
    }

    if(el.className.match(classNameRegExp(className))){
    }else{
      el.className += " " + className;
    }
};

var removeClass = function(el, className){
    el.className = el.className.replace(classNameRegExp(className), "");
};

Soda.directive('class', {
    link: function({scope, el, expression, parseSodaExpression}){
        var expressFunc = parseSodaExpression(expression, scope);

        if(expressFunc){
            addClass(el, expressFunc);
        }else{
        }
    }
});
