import {
    IDENTOR_REG,
    STRING_REG,
    NUMBER_REG,
    OBJECT_REG,
    OBJECT_REG_NG,
    ATTR_REG,
    ATTR_REG_NG,
    ATTR_REG_DOT,
    NOT_ATTR_REG,
    OR_REG,
    OR_REPLACE,
    CONST_PRIFIX,
    CONST_REG,
    CONST_REGG,
    VALUE_OUT_REG
} from './const';

import {
    getAttrVarKey,
    getRandom,
    exist,
    nodes2Arr
} from './util';

var doc = typeof document !== 'undefined' ? document : {};

export default class Soda{
    static sodaDirectives = [];
    static sodaFilterMap = {};
    static template = {};

    constructor(prefix = 'soda-'){
        this._prefix = prefix;
    }

    setDocument(_doc){
        doc = _doc;
    }


    run(str, data){
        // 解析模板DOM
        var div = doc.createElement("div");

        // 必须加入到body中去，不然自定义标签不生效
        if (doc.documentMode < 9) {
            div.style.display = 'none';
            doc.body.appendChild(div);
        }

        div.innerHTML = str;


        nodes2Arr(div.childNodes).map(child => {
            this.compileNode(child, data);
        });

        var innerHTML = div.innerHTML;
        if (doc.documentMode < 9) {
            doc.body.removeChild(div);
        }

        return innerHTML;
    }

    prefix(prefix){
        this._prefix = prefix;
    }

    _getPrefixReg(){
        return new RegExp('^' + this._prefix);
    }

    _getPrefixedDirectiveMap(){
        var map = {};
        Soda.sodaDirectives.map(item => {
            var prefixedName = this._prefix + item.name;

            map[prefixedName] = item;
        });

        return map;
    }

    _removeSodaMark(node, name){
        node.removeAttribute(name);
    }

    compileNode(node, scope){
        let prefixReg = this._getPrefixReg();

        let {
            sodaDirectives
        } = Soda;

        let prefixedDirectiveMap = this._getPrefixedDirectiveMap();

        let compile = (node, scope) => {

             // 如果只是文本
            // parseTextNode
            if (node.nodeType === node.TEXT_NODE) {
                node.nodeValue = node.nodeValue.replace(VALUE_OUT_REG, (item, $1) => {
                    var value = this.parseSodaExpression($1, scope);
                    if (typeof value === "object") {
                        value = JSON.stringify(value, null, 2)
                    }
                    return value;
                });
            }

            // parse Attributes
            if (node.attributes && node.attributes.length) {
                // 指令优先处理
                sodaDirectives.map(item => {
                    let {
                        name,
                        opt
                    } = item;

                    let prefixedName = this._prefix + name;

                    // 这里移除了对parentNode的判断
                    // 允许使用无值的指令
                    if (exist(node.getAttribute(prefixedName))) {
                        let expression = node.getAttribute(prefixedName);

                        opt.link.bind(this)({
                            expression,
                            scope,
                            el: node,
                            parseSodaExpression: this.parseSodaExpression.bind(this),
                            getValue: this.getValue.bind(this),
                            compileNode: this.compileNode.bind(this),
                            document: doc
                        });

                        // 移除标签
                        this._removeSodaMark(node, prefixedName);

                    }
                });

                // 处理输出 包含 prefix-*
                nodes2Arr(node.attributes)
                    // 过滤掉指令里包含的属性
                    .filter(
                        attr => 
                            ! prefixedDirectiveMap[attr.name]
                    )
                    .map(attr => {
                        if (prefixReg.test(attr.name)) {
                            var attrName = attr.name.replace(prefixReg, '');

                            if (attrName && exist(attr.value)) {
                                var attrValue = attr.value.replace(VALUE_OUT_REG, (item, $1) => {
                                    return this.parseSodaExpression($1, scope);
                                });

                                node.setAttribute(attrName, attrValue);

                                this._removeSodaMark(node, attr.name);
                            }

                            // 对其他属性里含expr 处理
                        } else {
                            if (exist(attr.value)) {
                                attr.value = attr.value.replace(VALUE_OUT_REG, (item, $1) => {
                                    return this.parseSodaExpression($1, scope);
                                });
                            }
                        }
                    });

            }

            // parse childNodes
            nodes2Arr(node.childNodes).map(child => {
                compile(child, scope);
            });
        };

        compile(node, scope);

    }

    getEvalFunc(expr){
       var evalFunc = new Function("getValue", "sodaFilterMap", "return function sodaExp(scope){ return " + expr + "}")(this.getValue, Soda.sodaFilterMap);

       return evalFunc;
    }

    getValue(_data, _attrStr) {
        CONST_REGG.lastIndex = 0;
        var realAttrStr = _attrStr.replace(CONST_REGG, function(r) {
            if (typeof _data[r] === "undefined") {
                return r;
            } else {
                return _data[r];
            }
        });

        if (_attrStr === 'true') {
            return true;
        }

        if (_attrStr === 'false') {
            return false;
        }

        var _getValue = function(data, attrStr) {
            var dotIndex = attrStr.indexOf(".");

            if (dotIndex > -1) {
                var attr = attrStr.substr(0, dotIndex);
                attrStr = attrStr.substr(dotIndex + 1);

                // 检查attrStr是否属于变量并转换
                if (typeof _data[attr] !== "undefined" && CONST_REG.test(attr)) {
                    attr = _data[attr];
                }

                if (typeof data[attr] !== "undefined") {
                    return _getValue(data[attr], attrStr);
                } else {
                    var eventData = {
                        name: realAttrStr,
                        data: _data
                    };


                    // 如果还有
                    return "";
                }
            } else {
               attrStr = attrStr.trim();

                // 检查attrStr是否属于变量并转换
                if (typeof _data[attrStr] !== "undefined" && CONST_REG.test(attrStr)) {
                    attrStr = _data[attrStr];
                }

                var rValue;
                if (typeof data[attrStr] !== "undefined") {
                    rValue = data[attrStr];
                } else {
                    var eventData = {
                        name: realAttrStr,
                        data: _data
                    };

                    rValue = "";
                }

                return rValue;
            }
        };

        return _getValue(_data, _attrStr);
    }

    
    parseSodaExpression(str, scope) {
        // 将字符常量保存下来
        str = str.replace(STRING_REG, function(r, $1, $2) {
            var key = getRandom();
            scope[key] = $1 || $2;
            return key;
        });

        // 对filter进行处理
        str = str.replace(OR_REG, OR_REPLACE).split("|");

        for (var i = 0; i < str.length; i++) {
            str[i] = (str[i].replace(new RegExp(OR_REPLACE, 'g'), "||") || '').trim();
        }


        var expr = str[0] || "";
        var filters = str.slice(1);


        while (ATTR_REG_NG.test(expr)) {
            ATTR_REG.lastIndex = 0;

            //对expr预处理
            expr = expr.replace(ATTR_REG, (r, $1) => {
                var key = getAttrVarKey();
                // 属性名称为字符常量
                var attrName = this.parseSodaExpression($1, scope);

                // 给一个特殊的前缀 表示是属性变量

                scope[key] = attrName;

                return "." + key;
            });
        }

        expr = expr.replace(OBJECT_REG, function(value) {
            return "getValue(scope,'" + value.trim() + "')";
        });

        expr = this.parseFilter(filters, expr);

        return this.getEvalFunc(expr)(scope);
    }

    parseFilter(filters, expr) {
        let {sodaFilterMap} = Soda;

        var parse = () => {
            var filterExpr = filters.shift();

            if (!filterExpr) {
                return;
            }


            var filterExpr = filterExpr.split(":");
            var args = filterExpr.slice(1) || [];
            var name = (filterExpr[0] || "").trim();

            for (var i = 0; i < args.length; i++) {
                //这里根据类型进行判断
                if (OBJECT_REG_NG.test(args[i])) {
                    args[i] =  "getValue(scope,'" + args[i] + "')";
                } else {}
            }

            if (sodaFilterMap[name]) {
                args.unshift(expr);

                args = args.join(",");

                expr = "sodaFilterMap['" + name + "'](" + args + ")";
            }

            parse();
        }

        parse();

        return expr;
    }

    static filter(name, func) {
        this.sodaFilterMap[name] = func;
    }

    static getFilter(name){
         return this.sodaFilterMap[name];
    }

    static directive(name, opt) {
        // 按照顺序入
        let {priority = 0} = opt;
        let i;

        for(i = 0; i < this.sodaDirectives.length; i ++){
            let item = this.sodaDirectives[i];
            let {priority: itemPriority = 0} = item.opt;

            // 比他小 继续比下一个
            if(priority < itemPriority){

            // 发现比它大或者相等 就插大他前面
            }else if(priority >= itemPriority){
                break;
            }
        }

        this.sodaDirectives.splice(i, 0, {
            name,
            opt
        });
    }

    static discribe(name, funcOrStr){
        this.template[name] = funcOrStr;
    }

    static getTmpl(name, args){
        let funcOrStr = this.template[name];
        let result;

        if(typeof funcOrStr === 'function'){
            result = funcOrStr.apply(null, args);
        }else{
            result = funcOrStr;
        }

        return result;
    }
}
