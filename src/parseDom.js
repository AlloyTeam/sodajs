/**
 * @author dorsywang(314416946@qq.com)
 * A simple dom tree parsor
 * 简单的DOM树解析器
 */
;(function(){
    var domEle = require("./dwindow/domelement");

    /**
     * 树结构
     * Tree Model
     */
    var Tree = function(){
        this._tree = [];
        this._idMap = {};
        this._allNode = [];

        this._currNodesArr = null;

        this._currNodesArr = this._tree;

        this._currNode;
    };

    Tree.prototype = {
        goNext: function(){
            if(! this._currNode.childNodes){
                this._currNode.childNodes = [];
            }

            this._currNodesArr = this._currNode.childNodes;

            this._currNodeParent = this._currNode;

        },

        push: function(node){
            this._currNodesArr.push(node);
            this._currNode = node;

            if(this._currNodeParent){
                node.parentNode = this._currNodeParent;
            }else{
                node.parentNode = {
                    name: "ROOT",
                    childNodes: this._tree
                };
            }
        },

        // 回溯
        backUp: function(){
            this._currNode = this._currNode.parentNode;
            this._currNodeParent = this._currNode.parentNode;
            this._currNodesArr = this._currNode.parentNode.childNodes;
        },

        getNodeById: function(id){
            return this._idMap[id] || null;
        },

        getAllNodes: function(){
            return this._allNode || [];
        }
    };




    //_DOM_._tree = Tree._tree;

    var parse = function(htmlStr, scopeSpace){

        // 预处理
        // 去掉注释
        // @todo 自封口
        var commentsReg = /<!--.*?-->/g;

        htmlStr = htmlStr.replace(commentsReg, "");


        var docTree = new Tree();

        scopeSpace.DOMTREE = docTree;

        var _idMap = docTree._idMap; 
        var _allNode = docTree._allNode;

        var tagReg = /\s*<(\/?)([^>\s]+)([^>]*)>/g;

        // 这里的reg要优化
        //var textReg = /.*(?=<\/?[^>]*>)/g;
        var textReg = /^[^<]*/g;
        // 这里只做了 ""  还要加上'
        var attrReg = /([^=\s]+)=(?:"([^\"]*)"|'([^\']*)')/g;

        var selfCloseTagReg = /br|hr|img|link|meta/;

        /**
         * 分析元素树
         */
        var tagResult, attrResult, attrsObj;
        var lastIndex = 0;

        // 先检查是不是只有纯文本
        if(! tagReg.test(htmlStr)){
            if(textReg.test(htmlStr)){
               var text = htmlStr;

                if(text){
                    var textNode = new domEle.Element();
                    textNode.nodeType = textNode.TEXT_NODE;
                    textNode.nodeValue = text;

                    docTree.push(textNode);
                }
            }
        }

        tagReg.lastIndex = 0;

        while(tagResult = tagReg.exec(htmlStr)){
            var isEndTag = tagResult[1] === "/";
            var tagName = tagResult[2];
            // 这里是未分析的属性
            var attrs = tagResult[3].trim();
            var isSelfEnd = 0;

            // 对自封口的标签进行封口
            if(selfCloseTagReg.test(tagName)){
                console.log(tagName);
                isSelfEnd = 1;
            }

            // 检查是不是自封闭的
            if(/\/>/.test(tagResult[0])){
                isSelfEnd = 1;
            }

            var start = lastIndex;
            var len = tagReg.lastIndex - tagResult[0].length - start;

            var text = htmlStr.substr(start, len);

            if(text){
                var textNode = new domEle.Element();
                textNode.nodeType = textNode.TEXT_NODE;
                textNode.nodeValue = text;

                docTree.push(textNode);
            }


            // 如果不是preTag
            if(! isEndTag){

                // 先将此结点压入
                var node = new domEle.Element();
                node.tagName = tagName;
                node.nodeType = node.ELEMENT_NODE;

                // 这里分析属性
                attrsObj = {};
                while(attrResult = attrReg.exec(attrs)){
                    var attrName = attrResult[1].trim();
                    var attrValue = (attrResult[2] || attrResult[3] || "").trim();

                    if(attrName === "class"){
                        attrName = "className";
                    }

                    attrsObj[attrName] = attrValue;
                    node[attrName] = attrValue;
                }

                if(attrsObj.id){
                    _idMap[attrsObj.id] = node;
                }


                docTree.push(node);
                _allNode.push(node);

                if(tagName === "head"){
                    document.head = node;
                }

                if(tagName === "body"){
                    document.body = node;
                }

                if(tagName === "html"){
                    document.documentElement = node;
                }

                if(tagName === "script"){
                    if(attrsObj.src){
                        var content = drequire(attrsObj.src);
                        for(var i in content){
                            global[i] = content[i];
                        }
                    }
                }


                if(! isSelfEnd){
                    // 向下遍历
                    // 走向子结点
                    docTree.goNext();

                    /*
                    textReg.lastIndex = tagReg.lastIndex;

                    // 查找文字节点
                    var textResult = textReg.exec(htmlStr);

                    console.log(tagResult[0]);
                    console.log(tagReg.lastIndex);

                    if(textResult && textResult.length){
                        var text = textResult[0];
                        console.log(text);

                        var node = new domEle.Element();
                        node.nodeType = 3;
                        node.nodeValue = text;

                        docTree.push(node);
                    }

                    console.log(textReg.lastIndex);
                    textReg.lastIndex > 0 && (tagReg.lastIndex = textReg.lastIndex);
                    */

                }else{
                }

            }else{
                // 如果是一个endTag 将一个空结点做为tag的子结点
                var node = new domEle.Element();
                node.nodeType = 3;
                docTree.push(node);

                // 回溯到该子结点的级别
                docTree.backUp();
            }

            lastIndex = tagReg.lastIndex;
        }

        /**
         * 渲染树结构方法
         */
        var html = "";
        var renderTree = function(tree){
            var render = function(parent){
                html += "<ul>";
                for(var i = 0; i < parent.childNodes.length; i ++){
                    html += "<li>" + parent.childNodes[i].tagName + "|" + parent.childNodes[i].attrs + "</li>";

                    if(parent.childNodes[i].childNodes){
                        render(parent.childNodes[i]);
                    }
                }

                html += "</ul>";
            };

            render(tree);

            document.body.innerHTML = html;

        };

        //console.log(docTree._tree[0].getElementsByTagName("div"));
        /*

        // 渲染树结构
        renderTree({childNodes: docTree._tree});


        // 将原始dom用浏览器解析进行对比
        var iframe = document.createElement("iframe");
        iframe.onload = function(){
            iframe.contentDocument.getElementsByTagName("html")[0].innerHTML = htmlStr;
        };
        document.body.appendChild(iframe);
        iframe.src = "http://localhost/";

        // 点击可以消除元素
        var uls = document.getElementsByTagName("ul");
        for(var i = 0; i < uls.length; i ++){
            uls[i].onclick = function(e){
                this.style.display = "none";

                e.stopPropagation();

            };
        }
        */
    };

    var parseDocument = function(htmlStr){
        parse(htmlStr, global);
    };

    module.exports = {
        parse: parse,
        parseDocument: parseDocument
    };
})();
