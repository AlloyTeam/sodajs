;(function(){
    var valueoutReg = /\{\{([^\}]*)\}\}/g;

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

    var getValue = function(data, attrStr){
        var dotIndex = attrStr.indexOf(".");

        if(dotIndex > -1){
            var attr = attrStr.substr(0, dotIndex);
            attrStr = attrStr.substr(dotIndex + 1);

            if(data[attr]){
                return getValue(data[attr], attrStr);
            }else{
                return "";
            }
        }else{
            return (typeof data[attrStr] !== "undefined") ? data[attrStr] : "";
        }
    };

    // 注释node
    var commentNode = function(node){
    };

    // 标识符
    var IDENTOR_REG = /[a-zA-Z_\$]+[\w\$]*/g;
    var STRING_REG = /"([^"]*)"|'([^']*)'/g
    var NUMBER_REG = /\d+|\d*\.\d+/g;

    var OBJECT_REG = /[a-zA-Z_\$]+[\w\$]*(?:\s*\.\s*(?:[a-zA-Z_\$]+[\w\$]*|\d+))*/g;
    var ATTR_REG = /\[([^\[\]]*)\]/g;
    var ATTR_REG_DOT = /\.([a-zA-Z_\$]+[\w\$]*)/g;

    var NOT_ATTR_REG = /[^\.|]([a-zA-Z_\$]+[\w\$]*)/g;

    var OR_REG = /\|\|/g;

    var OR_REPLACE = "OR_OPERATOR\x1E";

    var getRandom = function(){
        return "$$" + ~~ (Math.random() * 1E6);
    };

    var parseSodaExpression = function(str, scope){
        // 对filter进行处理
        str = str.replace(OR_REG, OR_REPLACE).split("|");

        for(var i = 0; i < str.length; i ++){
            str[i] = (str[i].replace(new RegExp(OR_REPLACE, 'g'), "||") || '').trim();
        }

        var expr = str[0] || "";
        var filters = str.slice(1);

        expr = expr.replace(STRING_REG, function(r, $1, $2){
            var key = getRandom();
            scope[key] = $1 || $2;
            return key;
        });

        while(ATTR_REG.test(expr)){
            ATTR_REG.lastIndex = 0;

            //对expr预处理
            expr = expr.replace(ATTR_REG, function(r, $1){
                return "." + parseSodaExpression($1, scope);
            });
        }

        expr = expr.replace(OBJECT_REG, function(value){
            return "getValue(scope,'" + value.trim() + "')";
        });


        var parseFilter = function(){
            var filterExpr = filters.shift();

            if(! filterExpr){
                return;
            }

            var filterExpr = filterExpr.split(":");
            var args = filterExpr.slice(1) || [];
            var name = filterExpr[0] || "";

            var stringReg = /^'.*'$|^".*"$/;
            for(var i = 0; i < args.length; i ++){
                //这里根据类型进行判断
                if(OBJECT_REG.test(args[i])){
                    args[i] =  "getValue(scope,'" + args[i] + "')";
                }else{
                }
            }

            if(sodaFilterMap[name]){
                args.unshift(expr);

                args = args.join(",");

                expr = "sodaFilterMap['" + name + "'](" + args + ")";
            }

            parseFilter();
        };

        parseFilter();

        var evalFunc = new Function("getValue", "sodaFilterMap", "return function sodaExp(scope){ return " + expr + "}")(getValue, sodaFilterMap);

        return evalFunc(scope);
    };

    var parseChild = function(parent, scope){
        [].map.call([].slice.call(parent.childNodes, []), function(child){
            if(child.nodeType === 3){
                child.nodeValue = child.nodeValue.replace(valueoutReg, function(item, $1){
                    return parseSodaExpression($1, scope); 
                });
            }

            if(child.attributes){
                // 优先处理 soda-repeat
                if(/in/.test(child.getAttribute("soda-repeat") || "")){
                    sodaDirectiveMap['soda-repeat'].link(scope, child, child.attributes);

                //ng-if优先处理
                }else{
                    if((child.getAttribute("soda-if") || '').trim()){
                        sodaDirectiveMap['soda-if'].link(scope, child, child.attributes);

                        if(child.getAttribute("removed") === "removed"){
                            return;
                        }
                    }
                    
                    var childDone;
                    [].map.call(child.attributes, function(attr){
                        if(attr.name !== 'soda-if'){
                            if(/^soda-/.test(attr.name)){
                                if(sodaDirectiveMap[attr.name]){
                                    var dire = sodaDirectiveMap[attr.name]

                                    var msg = dire.link(scope, child, child.attributes);

                                    if(msg && msg.command === "childDone"){
                                        childDone = 1;
                                    }
                                }

                            // 对其他属性里含expr 处理
                            }else{
                                attr.value = attr.value.replace(valueoutReg, function(item, $1){
                                    return parseSodaExpression($1, scope); 
                                });
                            }
                        }
                    });

                    if(! childDone){
                        parseChild(child, scope);
                    }
                }
            }
        });
    };

    var sodaDirectiveMap = {
    };

    var sodaFilterMap = {
    };

    var sodaDirective = function(name, func){
        sodaDirectiveMap['soda-' + name] = func();
    };

    var sodaFilter = function(name, func){
        sodaFilterMap[name] = func;
    };

    sodaFilter("date", function(input, lenth){
        return lenth;
    });

    sodaDirective('repeat', function(){
        return {
            compile: function(scope, el, attrs){
                
            },
            link: function(scope, el, attrs){
                var opt = el.getAttribute('soda-repeat');
                var itemName;
                var valueName;

                var trackReg = /\s+track\s+by\s+([^\s]+)$/;

                var trackName;
                opt = opt.replace(trackReg, function(item, $1){
                    if($1){
                        trackName = ($1 || '').trim();
                    }

                    return '';
                });

                trackName = trackName || '$index';

                var inReg = /([^\s]+)\s+in\s+([^\s]+)/;

                var r = inReg.exec(opt);
                if(r){
                    itemName = (r[1] || '').trim();
                    valueName = (r[2] || '').trim();

                    if(! (itemName && valueName)){
                        return;
                    }
                }else{
                    return;
                }

                // 这里要处理一下
                var repeatObj = getValue(scope, valueName);
                var lastNode = el;

                for(var i = 0; i < repeatObj.length; i ++){
                    var itemNode = el.cloneNode();

                    var itemScope = {};
                    itemScope[trackName] = i;

                    itemScope[itemName] = repeatObj[i];

                    itemScope.__proto__ = scope;

                    itemNode.innerHTML = el.innerHTML;

                    if((itemNode.getAttribute("soda-if") || '').trim()){
                          sodaDirectiveMap['soda-if'].link(itemScope, itemNode, itemNode.attributes);

                          if(itemNode.getAttribute("removed") === "removed"){
                            continue;
                          }
                    }

                    // 依次分析该节点上的其他属性
                    [].map.call(itemNode.attributes, function(attr){
                        if(itemNode.getAttribute("removed") === "removed"){
                            return;
                        }

                        if(attr.name.trim() !== "soda-repeat" && attr.name.trim() !== "soda-if"){
                            if(/^soda-/.test(attr.name)){
                                if(sodaDirectiveMap[attr.name]){
                                    var dire = sodaDirectiveMap[attr.name]

                                    dire.link(itemScope, itemNode, itemNode.attributes);

                                }
                            }else{
                                attr.value = attr.value.replace(valueoutReg, function(item, $1){
                                    return parseSodaExpression($1, itemScope); 
                                });
                            }
                        }
                    });

                    if(itemNode.getAttribute("removed") !== "removed"){
                        parseChild(itemNode, itemScope);

                        el.parentNode.insertBefore(itemNode, lastNode.nextSibling);

                        lastNode = itemNode;
                    }
                }

                el.parentNode.removeChild(el);

            }
        };
    });

    sodaDirective('if', function(){
        return {
            link: function(scope, el, attrs){
                var opt = el.getAttribute('soda-if');

                var expressFunc = parseSodaExpression(opt, scope);

                if(expressFunc){
                }else{
                    el.setAttribute("removed", "removed");
                    el.parentNode && el.parentNode.removeChild(el);
                }
            }
        };
    });

    sodaDirective('class', function(){
        return {
            link: function(scope, el, attrs){
                var opt = el.getAttribute("soda-class");

                var expressFunc = parseSodaExpression(opt, scope);

                if(expressFunc){
                    addClass(el, expressFunc);
                }else{
                }
            }
        };
    });

    sodaDirective('src', function(){
        return {
            link: function(scope, el, attrs){
                var opt = el.getAttribute("soda-src");

                var expressFunc = opt.replace(valueoutReg, function(item, $1){
                    return parseSodaExpression($1, scope); 
                });

                if(expressFunc){
                    el.setAttribute("src", expressFunc);
                }else{
                }
            }
        };
    });

    sodaDirective('bind-html', function(){
        return {
            link: function(scope, el, attrs){
                var opt = el.getAttribute("soda-bind-html");
                var expressFunc = parseSodaExpression(opt, scope);

                if(expressFunc){
                    el.innerHTML = expressFunc;

                    return {
                        command: "childDone"
                    };
                }
            }
        };
    });

    var sodaRender = function(str, data){
        // 解析模板DOM
        var div = document.createElement("div");

        div.innerHTML = str;

        parseChild(div, data);

        var frament = document.createDocumentFragment();
        frament.innerHTML = div.innerHTML;

        var child;
        while(child = div.childNodes[0]){
            frament.appendChild(child);
        }
        

        return frament;
    };

    // 预先编译
    var compile = function(str, data){
    };

    window.sodaRender = sodaRender;
    window.sodaFilter = sodaFilter;
})();
