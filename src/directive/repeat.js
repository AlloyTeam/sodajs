import Sodajs from './../sodajs';

Sodajs.directive('repeat', {
    priority: 10,
    link: function({scope, el, expression, getValue, parseSodaExpression, compileNode}){
        var itemName;
        var valueName;

        var trackReg = /\s+by\s+([^\s]+)$/;

        var trackName;
        var opt = expression.replace(trackReg, function(item, $1) {
            if ($1) {
                trackName = ($1 || '').trim();
            }

            return '';
        });


        var inReg = /([^\s]+)\s+in\s+([^\s]+)|\(([^,]+)\s*,\s*([^)]+)\)\s+in\s+([^\s]+)/;

        var r = inReg.exec(opt);
        if (r) {
            if (r[1] && r[2]) {
                itemName = (r[1] || '').trim();
                valueName = (r[2] || '').trim();

                if (!(itemName && valueName)) {
                    return;
                }
            } else if (r[3] && r[4] && r[5]) {
                trackName = (r[3] || '').trim();
                itemName = (r[4] || '').trim();
                valueName = (r[5] || '').trim();
            }
        } else {
            return;
        }

        trackName = trackName || '$index';

        // 这里要处理一下
        var repeatObj = getValue(scope, valueName) || [];

        var repeatFunc = (i) => {
            var itemNode = el.cloneNode(true);

            // 这里创建一个新的scope
            var itemScope = {};
            itemScope[trackName] = i;

            itemScope[itemName] = repeatObj[i];

            itemScope.__proto__ = scope;

            // REMOVE cjd6568358
            itemNode.removeAttribute(this.prefix + 'repeat');

            el.parentNode.insertBefore(itemNode, el);

            // 这里是新加的dom, 要单独编译
            compileNode(itemNode, itemScope);

        };

        if ('length' in repeatObj) {
            for (var i = 0; i < repeatObj.length; i++) {
                repeatFunc(i);
            }
        } else {
            for (var i in repeatObj) {
                if (repeatObj.hasOwnProperty(i)) {
                    repeatFunc(i);
                }
            }
        }

        el.parentNode.removeChild(el);
    }
});
