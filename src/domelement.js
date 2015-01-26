/**
 * @author dorsywang(314416946@qq.com)
 */

var eventEmitter = require('events').EventEmitter;


var emptyFuc = function(returnVal){
    if(returnVal){
        return function(){
            return returnVal;
        };
    }else{
        return function(){};
    }
};

var Element = function(opt){
    this.childNodes = [];
    this.style = {};
};

Element.prototype = {
    blur: function(){
    },

    get ownerDocument(){
        return document;
    },

    get children(){
        var els = [];
        for(var i = 0; i < this.childNodes.length; i ++){
            if(this.childNodes[i].nodeType === 1){
                els.push(this.childNodes[i]);
            }
        }

        return els;
    },

    get nodeName(){
        return (this.tagName || "").toUpperCase();
    },

    focus: function(){
    },

    removeChild: function(node){
        console.log("removeChild", node.tagName);
        for(var i = 0; i < this.childNodes.length; i ++){
            if(this.childNodes[i] === node){
                this.childNodes.splice(i, 1);
                break;
            }
        }
    },

    appendChild: function(node){
        //console.log("append Child", node);
        //
        return this.insertBefore(node);

    },

    addEventListener: function(type, handler, isCapture){
        var emitter;
        if(this._emitter){
            emitter = this._emitter;
        }else{
            emitter = new eventEmitter();
            this._emitter = emitter;
        }

        //console.log('addListener', handler.handleEvent || handler);

        emitter.addListener(type, handler.handleEvent || handler, isCapture);
    },

    dispatchEvent: function(event){
        var e = {
            preventDefault: function(){
            },

            stopPropagation: function(){
            },

            target: this,

            srcElement: this
        };

        if(this._emitter){
            this._emitter.emit(event.type, e);
        }
    },

    getAttribute: function(attr){
        //console.log('get attribute', attr);
        return this[attr];
    },
    setAttribute: function(attr, val){
        this[attr] = val;
    },

    insertBefore: function(newNode, oldNode){
        for(var i = 0; i < this.childNodes.length; i ++){
            if(this.childNodes[i] === oldNode){
                break;
            }
        }

        var checkInDocument = function(n){
            var flag = 0;
            var checkNode = function(node){
                if(node === DOMTREE._tree[0]){
                    flag = 1;

                    return;
                }

                if(node.parentNode){
                    checkNode(node.parentNode);
                }
            }

            checkNode(n);

            return flag;
        };

        var isInDocument = checkInDocument(this);

        // 如果是frament 则将子元素添加进去
        if(newNode.tagName === "fragment"){
            Array.prototype.splice.apply(this.childNodes, [i, 0].concat(newNode.childNodes));

            for(var i = 0; i < newNode.childNodes.length; i ++){
                newNode.childNodes[i].parentNode = this;

                // 这里有待完善
                if(isInDocument){
                    newNode.childNodes[i].getIdMap(DOMTREE._idMap);
                }
            }

            // 置空子元素
            newNode.childNodes = [];
        }else{
            // 从原来的父元素中删除掉
            if(newNode.parentNode){
                newNode.parentNode.removeChild(newNode);
            }

            newNode.parentNode = this;

            this.childNodes.splice(i, 0, newNode);

            // 这里有待完善
            if(isInDocument){
                newNode.getIdMap(DOMTREE._idMap);
            }
        }

        if(newNode.tagName === "script"){
            if(newNode.src){
                var content = drequire(newNode.src, function(){
                    newNode.onload && newNode.onload.call(newNode);
                });
                for(var i in content){
                    global[i] = content[i];
                }
            }
        }

        return newNode;

    },

    // 这里实现有待进一步验证
    getAttributeNode: function(attr){
        return {
            value: this[attr],
            specified: true
        };
    },

    // 把id 挂到命名空间下
    getIdMap: function(scopeSpace){
        if(! scopeSpace) return;

        if(this.id){
            scopeSpace[this.id] = this;
        }
        if(this.childNodes.length){
            for(var i = 0; i < this.childNodes.length; i ++){
                this.childNodes[i].getIdMap(scopeSpace);
            }

        }
    },

    getElementsByClassName: function(className){
        var result = [];
        if(this.childNodes.length){
            for(var i = 0; i < this.childNodes.length; i ++){
                if(this.childNodes[i].className == className){
                    result.push(this.childNodes[i]);
                }
                result = result.concat(this.childNodes[i].getElementsByClassName(tagName));
            }

        }

        return result;
    },

    getBoundingClientRect: emptyFuc({top: 0, left: 0}),
    getClientRects: emptyFuc({top: 0, left: 0}),
    getElementsByTagName: function(tagName){
        var result = [];
        if(this.childNodes.length){
            for(var i = 0; i < this.childNodes.length; i ++){
                if(this.childNodes[i].tagName == tagName){
                    result.push(this.childNodes[i]);
                }
                result = result.concat(this.childNodes[i].getElementsByTagName(tagName));
            }

            /*
            var find = function(parent){
                if(parent.tagName == tagName){
                    result.push(parent);
                }

                for(var i = 0; i < parent.childNodes.length; i ++){
                    find(parent.childNodes[i]);
                }
            }

            find(this);
            */
        }

        return result;
    },

    querySelector: function(selector, content){
        var sizzle = require("./../sizzle/sizzle");
        return sizzle(selector, content)[0];
    },

    querySelectorAll: function(selector, content){
        //console.log("using queryAll single node:", selector);
        var sizzle = require("./../sizzle/sizzle");
        var els =  sizzle(selector, content);

        //console.log(els);

        return els;
    },

    scrollTop: 0,
    clientHeight: 640,


    get outerHTML(){
        var tagName = this.tagName;
        if(this.nodeType === 3 || ! tagName){
            return this.nodeValue || "";
        }

        var attrArr = [];

        for(var i in this){
            if(this.hasOwnProperty(i) && (typeof this[i] === "string" || typeof this[i] === "number" || typeof this[i] === "boolean")){
                if(i === "tagName" || i === "nodeType"){
                    continue;
                }

                var attrName = i;
                if(i === "className"){
                    attrName = 'class';
                }

                attrArr.push(attrName + "=\"" + this[i] + "\"");
            }else if(i === "style"){
                //console.log('style');
                var styleCode = [];
                for(var i in this.style){
                    styleCode.push(i + ":" + this.style[i]);
                }
                if(styleCode.length){
                    attrArr.push("style=\"" + styleCode.join(";") + "\"");
                }
            }
        }

        var attrStr = attrArr.join(" ");
        if(attrStr){
            attrStr = " " + attrStr;
        }
        
        var html = "<" + tagName + attrStr + ">";
        if(this.childNodes){
            for(var i = 0; i < this.childNodes.length; i ++){
                html += this.childNodes[i].outerHTML;
            }
        }

        html += "</" + tagName + ">";

        return html;
    },

    get innerHTML(){
        var tagName = this.tagName;
        var html = "";

        if(this.childNodes && this.childNodes.length){
            for(var i = 0; i < this.childNodes.length; i ++){
                html += this.childNodes[i].outerHTML;
            }
        }else{
        }

        return html;
    },

    set innerHTML(val){
        var parseDom = require("./../parseDom");

        var dom = {};
        parseDom.parse(val, dom);

        this.childNodes = dom.DOMTREE._tree;
        for(var i = 0; i < this.childNodes.length; i ++){
            this.childNodes[i].parentNode = this;
        }
    },

    // 常用的nodeType 常量
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11
};

module.exports = {
    Element: Element
};
