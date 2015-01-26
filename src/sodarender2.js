;(function(){
    var valueoutReg = /\{\{([^\}]*)\}\}/;

    var getValue = function(data, attrStr){
        var dotIndex = attrStr.indexOf(".");

        if(dotIndex > -1){
            var attr = attrStr.substr(0, dotIndex)
            attrStr = attrStr.substr(dotIndex + 1);

            if(data[attr]){
                return getValue(data[attr], attrStr);
            }else{
                return "";
            }
        }else{
            return data[attrStr] || "";
        }
    };

    // 注释node
    var commentNode = function(node){
    };

    var parseChild = function(parent, scope){
        [].map.call(parent.childNodes, function(child){
            if(child.nodeType === 3){
                child.nodeValue = child.nodeValue.replace(valueoutReg, function(item, $1){
                    return getValue(scope, $1); 
                });
            }

            if(child.attributes){
                [].map.call(child.attributes, function(attr){
                    if(/^soda-/.test(attr.name)){
                        if(sodaDirectiveMap[attr.name]){
                            var dire = sodaDirectiveMap[attr.name]

                            dire.link(scope, child, child.attributes);
                        }
                    }
                });
            }
        });
    };

    var sodaDirectiveMap = {
    };

    var sodaDirective = function(name, func){
        sodaDirectiveMap['soda-' + name] = func();
    };

    sodaDirective('repeat', function(){
        return {
            compile: function(scope, el, attrs){
                
            },
            link: function(scope, el, attrs){
                var opt = el.getAttribute('soda-repeat');
                var itemName;
                var valueName;

                if(/in/.test(opt)){
                    opt = opt.split("in");

                    itemName = opt[0].trim();
                    valueName = opt[1].trim();
                }else{
                    return;
                }

                // 这里要处理一下
                var repeatObj = getValue(scope, valueName);
                var lastNode = el;

                for(var i = 0; i < repeatObj.length; i ++){
                    var itemNode = el.cloneNode();

                    var itemScope = {$index: i};
                    itemScope[itemName] = repeatObj[i];

                    itemScope.__proto__ = scope;

                    itemNode.innerHTML = el.innerHTML;

                    parseChild(itemNode, itemScope);

                    el.parentNode.insertBefore(itemNode, lastNode.nextSibling);

                    lastNode = itemNode;
                }

                el.parentNode.removeChild(el);

            }
        };
    });

    sodaDirective('if', function(){
        return {
            link: function(scope, el, attrs){
                var opt = el.getAttribute('soda-if');

                if(getValue(scope, opt)){
                }else{
                }
            }
        };
    });

    var sodaRender = function(str, data){
        // 解析模板DOM
        var div = document.createElement("div");

        div.innerHTML = str;


        parseChild(div, data);

        console.log(div);
        console.log(div.innerHTML);
    };

    window.sodaRender = sodaRender;
})();
