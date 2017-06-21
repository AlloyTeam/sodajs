import Soda from './../soda';

Soda.directive('include',  {
    priority: 8,
    link({scope, el, parseSodaExpression, expression}) {
        const VALUE_OUT_REG = /\{\{([^\}]*)\}\}/g;

        var result = expression.replace(VALUE_OUT_REG, function(item, $1){
            return parseSodaExpression($1, scope); 
        });

        result = result.split(":")

        var name = result[0];

        var args = result.slice(1);

        var template = Soda.getTmpl(name, args);
        if (template) {
            el.outerHTML = this.run(template, scope);
        }

    }
});
