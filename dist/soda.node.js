(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["soda"] = factory();
	else
		root["soda"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventTarget = __webpack_require__(6);

var Node = function (_EventTarget) {
    _inherits(Node, _EventTarget);

    function Node() {
        _classCallCheck(this, Node);

        var _this = _possibleConstructorReturn(this, (Node.__proto__ || Object.getPrototypeOf(Node)).call(this));

        _this.ELEMENT_NODE = 1;
        _this.ATTRIBUTE_NODE = 2;
        _this.TEXT_NODE = 3;
        _this.CDATA_SECTION_NODE = 4;
        _this.ENTITY_REFERENCE_NODE = 5; // historical
        _this.ENTITY_NODE = 6; // historical
        _this.PROCESSING_INSTRUCTION_NODE = 7;
        _this.COMMENT_NODE = 8;
        _this.DOCUMENT_NODE = 9;
        _this.DOCUMENT_TYPE_NODE = 10;
        _this.DOCUMENT_FRAGMENT_NODE = 11;
        _this.NOTATION_NODE = 12; // historical


        _this.childNodes = [];
        _this.nodeValue = '';
        _this.ownerDocument = null;
        _this.parentNode = null;
        _this.textContent = '';
        return _this;
    }

    _createClass(Node, [{
        key: 'appendChild',
        value: function appendChild(node) {
            return this.insertBefore(node);
        }

        // @todo 这个参数有问题

    }, {
        key: 'cloneNode',
        value: function cloneNode(deep) {
            if (this.nodeType === this.TEXT_NODE) {
                var node = this.ownerDocument.createTextNode(this.nodeValue);
                return node;
            }

            if (this.nodeType === this.COMMENT_NODE) {
                var node = this.ownerDocument.createComment(this.nodeValue);
                return node;
            }

            var node = this.ownerDocument.createDocumentFragment();

            var tagName = this.tagName && this.tagName.toLowerCase();

            if (deep) {
                node.innerHTML = "<" + tagName + " " + this._getAttributeString() + ">" + this.innerHTML + "</" + tagName + ">";
            } else {
                node.innerHTML = "<" + tagName + " " + this._getAttributeString() + "></" + tagName + ">";
            }

            return node.childNodes[0];
        }
    }, {
        key: 'getRootNode',
        value: function getRootNode() {
            var getParentNode = function getParentNode(node) {
                if (node.parentNode) {
                    return getParentNode(node.parentNode);
                } else {
                    return node;
                }
            };

            return getParentNode(this);
        }
    }, {
        key: 'contains',
        value: function contains(node) {
            if (node === this) {
                return true;
            }

            var flag = false;

            for (var i = 0; i < this.childNodes.length; i++) {
                var child = this.childNodes[i];

                if (child.contains(node)) {
                    flag = true;
                    break;
                }
            }

            return flag;
        }
    }, {
        key: 'compareDocumentPosition',
        value: function compareDocumentPosition(node) {
            function comparePosition(a, b) {
                (a != b && a.contains(b) && 16) + (a != b && b.contains(a) && 8) + (a.sourceIndex >= 0 && b.sourceIndex >= 0 ? (a.sourceIndex < b.sourceIndex && 4) + (a.sourceIndex > b.sourceIndex && 2) : 1);
            }
        }
    }, {
        key: 'hasChildNodes',
        value: function hasChildNodes() {
            return this.childNodes.length;
        }
    }, {
        key: 'removeChild',
        value: function removeChild(node) {

            for (var i = 0; i < this.childNodes.length; i++) {
                if (this.childNodes[i] === node) {
                    this.childNodes.splice(i, 1);

                    node.parentNode = null;
                    break;
                }
            }
        }
    }, {
        key: 'insertBefore',
        value: function insertBefore(newNode, oldNode) {
            for (var i = 0; i < this.childNodes.length; i++) {
                if (this.childNodes[i] === oldNode) {
                    break;
                }
            }

            var checkInDocument = function checkInDocument(n) {
                var flag = 0;
                var checkNode = function checkNode(node) {
                    if (node === window.DOMTREE._tree[0]) {
                        flag = 1;

                        return;
                    }

                    if (node.parentNode) {
                        checkNode(node.parentNode);
                    }
                };

                checkNode(n);

                return flag;
            };

            //   var isInDocument = checkInDocument(this);

            // 如果是frament 则将子元素添加进去
            if ((newNode.tagName || '').toLowerCase() === "fragment") {
                Array.prototype.splice.apply(this.childNodes, [i, 0].concat(newNode.childNodes));

                for (var i = 0; i < newNode.childNodes.length; i++) {
                    newNode.childNodes[i].parentNode = this;

                    // 这里有待完善
                    /*
                    if(isInDocument){
                        newNode.childNodes[i].getIdMap(window.DOMTREE._idMap);
                    }
                    */
                }

                // 置空子元素
                newNode.childNodes = [];
            } else {
                // 从原来的父元素中删除掉
                if (newNode.parentNode) {
                    newNode.parentNode.removeChild(newNode);
                }

                newNode.parentNode = this;

                this.childNodes.splice(i, 0, newNode);

                // 这里有待完善
                /*
                if(isInDocument){
                    newNode.getIdMap(window.DOMTREE._idMap);
                }
                */
            }

            /*
            if(newNode.tagName === "script"){
                if(newNode.src){
                    var content = window.drequire(newNode.src, function(){
                        newNode.onload && newNode.onload.call(newNode);
                          // 注意这里 把新加的脚本执行后就删除了
                        newNode.parentNode.removeChild(newNode);
                    });
                    for(var i in content){
                        global[i] = content[i];
                    }
                }
            }
            */

            return newNode;
        }
    }, {
        key: 'parentNodeElement',
        get: function get() {
            if (this.parentNode.nodeType === this.ELEMENT_NODE) {
                return this.parentNode;
            } else {
                return null;
            }
        }
    }, {
        key: 'previousSibling',
        get: function get() {}
    }, {
        key: 'firstChild',
        get: function get() {
            return this.childNodes[0];
        }
    }, {
        key: 'lastChild',
        get: function get() {
            return this.childNodes[this.childNodes.length - 1];
        }
    }, {
        key: 'nextSibling',
        get: function get() {}
    }, {
        key: 'nodeName',
        get: function get() {
            return this.tagName;
        }
    }]);

    return Node;
}(EventTarget);

module.exports = Node;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = __webpack_require__(0);

var Text = function (_Node) {
    _inherits(Text, _Node);

    function Text(text) {
        _classCallCheck(this, Text);

        var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this));

        _this.nodeType = _this.TEXT_NODE;
        _this.nodeValue = text || '';
        return _this;
    }

    _createClass(Text, [{
        key: '_getEnscapeValue',
        value: function _getEnscapeValue(value) {
            return value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
    }]);

    return Text;
}(Node);

module.exports = Text;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Document = __webpack_require__(3);

var Window = function () {
    function Window(browserEnv) {
        _classCallCheck(this, Window);

        this.document = new Document(this);
        this.setGlobalVars();
    }

    _createClass(Window, [{
        key: 'setGlobalVars',
        value: function setGlobalVars() {
            this.setTimeout = setTimeout;
            this.clearTimeout = clearTimeout;
            this.setInterval = setInterval;
            this.clearInterval = clearInterval;
            this.parseInt = parseInt;
            this.parseFloat = parseFloat;

            this.console = {
                log: function log(val) {
                    console.log(val);
                },

                info: function info() {},

                debug: function debug() {},

                dir: function dir() {}
            };
        }
    }]);

    return Window;
}();

module.exports = Window;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//var Event = require('./event');
//var CanvasEl = require('./canvsel');

var HTMLElement = __webpack_require__(4);
var Node = __webpack_require__(0);
var Text = __webpack_require__(1);
var Comment = __webpack_require__(10);

var ElementClassDeclaredMap = {
    canvas: 'HTMLCanvasElement'
};

var Document = function (_Node) {
    _inherits(Document, _Node);

    function Document(defaultView) {
        _classCallCheck(this, Document);

        var _this = _possibleConstructorReturn(this, (Document.__proto__ || Object.getPrototypeOf(Document)).call(this));

        _this.__defaultView = defaultView;
        return _this;
    }

    _createClass(Document, [{
        key: 'createElement',
        value: function createElement(tagName) {
            /*
            if(tagName === "canvas"){
                return new CanvasEl();
            }
              var node = new domEle.Element();
            node.tagName = tagName;
            */

            var node;

            tagName = (tagName || '').toUpperCase();
            if (ElementClassDeclaredMap[tagName]) {
                var elementClass = __webpack_require__(34)("./" + ElementClassDeclaredMap[tagName].toLowerCase());
                node = new elementClass(tagName);
            } else {
                node = new HTMLElement(tagName);
            }

            node.ownerDocument = this;

            return node;
        }
    }, {
        key: 'createDocumentFragment',
        value: function createDocumentFragment() {
            var node = this.createElement('fragment');

            return node;
        }
    }, {
        key: 'createTextNode',
        value: function createTextNode(text) {
            return new Text(text);
        }
    }, {
        key: 'createComment',
        value: function createComment(text) {
            return new Comment(text);
        }
    }, {
        key: 'getElementById',
        value: function getElementById(id) {
            var result;
            var findChild = function findChild(node) {
                if (result) {
                    return;
                }

                for (var i = 0; i < node.childNodes.length; i++) {
                    var _node = node.childNodes[i];
                    var _id = _node.id;

                    if (_id == id) {
                        result = node.childNodes[i];
                        break;
                    }

                    if (_node.childNodes && _node.childNodes.length) {
                        findChild(_node);
                    }
                }
            };

            findChild(this);

            return result;
        }
    }, {
        key: 'getElementsByClassName',
        value: function getElementsByClassName(className) {
            return this.documentElement.getElementsByClassName(className);
        }
    }, {
        key: 'getElementsByTagName',
        value: function getElementsByTagName(tagName) {
            return this.documentElement.getElementsByTagName(tagName);
        }
    }, {
        key: 'defaultView',
        get: function get() {
            return this.__defaultView;
        }
    }]);

    return Document;
}(Node);

module.exports = Document;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = __webpack_require__(5);
var CSSStyleDeclaration = __webpack_require__(9);

var HTMLElement = function (_Element) {
    _inherits(HTMLElement, _Element);

    function HTMLElement(tagName) {
        _classCallCheck(this, HTMLElement);

        var _this = _possibleConstructorReturn(this, (HTMLElement.__proto__ || Object.getPrototypeOf(HTMLElement)).call(this, tagName));

        _this.style = new CSSStyleDeclaration();
        return _this;
    }

    _createClass(HTMLElement, [{
        key: 'blur',
        value: function blur() {
            console.warn('blur is not realised');
        }
    }, {
        key: 'unblur',
        value: function unblur() {}
    }, {
        key: 'click',
        value: function click() {}
    }, {
        key: 'focus',
        value: function focus() {}
    }, {
        key: 'forceSpellCheck',
        value: function forceSpellCheck() {}
    }]);

    return HTMLElement;
}(Element);

module.exports = HTMLElement;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = __webpack_require__(0);
var NamedNodeMap = __webpack_require__(7);
var DOMTokenList = __webpack_require__(8);

var parseCssText = function parseCssText(style, val) {
    // 解析css
    if (val) {
        val = val.split(";");

        val.map(function (item, index) {
            if (item) {
                var exp = item.split(":");
                var name = exp[0];
                var v = exp[1] || '';

                style[name] = v;
            }
        });
    }
};

var getEnscapeValue = function getEnscapeValue(value) {
    return value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

var donotEnscapeTagReg = /script|pre|code/;

var Element = function (_Node) {
    _inherits(Element, _Node);

    function Element(tagName) {
        _classCallCheck(this, Element);

        var _this2 = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this));

        _this2.tagName = tagName;

        _this2.nodeType = _this2.ELEMENT_NODE;

        _this2.attributes = new NamedNodeMap(_this2);

        _this2.classList = new DOMTokenList(_this2);
        return _this2;
    }

    _createClass(Element, [{
        key: '_getAttributeString',
        value: function _getAttributeString() {
            var attrArr = [];

            for (var i = 0; i < this.attributes.length; i++) {
                if (this.attributes[i].nodeType && this.attributes[i].nodeType === this.ATTRIBUTE_NODE) {
                    var attrName = this.attributes[i].name;
                    if (attrName === "className") {
                        attrName = 'class';
                    }

                    if (attrName === "style") {
                        continue;
                    }

                    attrArr.push(attrName + "=\"" + (this.attributes[i].value || '') + "\"");
                }
            }

            //console.log('style');
            var styleCode = [];
            for (var i in this.style) {
                if (this.style[i]) {
                    styleCode.push(i + ":" + this.style[i]);
                }
            }

            if (styleCode.length) {
                attrArr.push("style=\"" + styleCode.join(";") + "\"");
            }

            var attrStr = attrArr.join(" ");
            if (attrStr) {
                attrStr = " " + attrStr;
            }

            return attrStr;
        }
    }, {
        key: 'getAttribute',


        /*=====================method=======================*/
        value: function getAttribute(attr) {
            var item = this.attributes.getNamedItem(attr);

            if (item) {
                return item.value || null;
            } else {
                return null;
            }
        }
    }, {
        key: 'setAttribute',
        value: function setAttribute(attr, val) {
            var _this = this;

            if (attr === "style") {
                parseCssText(this.style, val);
            }

            this.attributes.setNamedItem(attr, val);
        }
    }, {
        key: 'removeAttribute',
        value: function removeAttribute(attr) {
            this.attributes.removeNamedItem(attr);
        }
    }, {
        key: 'getElementsByClassName',
        value: function getElementsByClassName(className) {
            var result = [];
            if (this.childNodes.length) {
                for (var i = 0; i < this.childNodes.length; i++) {
                    var _node = this.childNodes[i];

                    if (_node.nodeType === _node.ELEMENT_NODE) {
                        if (_node.classList && _node.classList.contains(className)) {
                            result.push(_node);
                        }

                        result = result.concat(_node.getElementsByClassName(className));
                    }
                }
            }

            return result;
        }
    }, {
        key: 'getElementsByTagName',
        value: function getElementsByTagName(tagName) {
            if (typeof tagName !== 'string') {
                throw new Error('getElementsByTagName first argument to be string!');
            }

            var result = [];

            tagName = tagName.toLowerCase();

            if (this.childNodes.length) {
                for (var i = 0; i < this.childNodes.length; i++) {
                    var _node = this.childNodes[i];

                    if (_node.nodeType === _node.ELEMENT_NODE) {
                        var nodeTagName = (_node.tagName || '').toLowerCase();
                        if (nodeTagName === tagName || tagName === "*") {
                            result.push(_node);
                        }

                        result = result.concat(_node.getElementsByTagName(tagName));
                    }
                }
            }

            return result;
        }
    }, {
        key: 'className',
        get: function get() {
            return this.getAttribute('className');
        },
        set: function set(val) {
            this.setAttribute('className', val);
        }

        // @ready only

    }, {
        key: 'clientWidth',
        get: function get() {}
    }, {
        key: 'clientHeight',
        get: function get() {}
    }, {
        key: 'clientLeft',
        get: function get() {}
    }, {
        key: 'clientTop',
        get: function get() {}
    }, {
        key: 'computedName',
        get: function get() {}
    }, {
        key: 'computedRole',
        get: function get() {}
    }, {
        key: 'id',
        get: function get() {
            return this.getAttribute('id');
        },
        set: function set(val) {
            this.setAttribute(id);
        }
    }, {
        key: 'innerHTML',
        get: function get() {

            var tagName = (this.tagName || '').toLowerCase();
            var html = "";

            if (this.childNodes && this.childNodes.length) {
                for (var i = 0; i < this.childNodes.length; i++) {
                    var child = this.childNodes[i];

                    if (child.nodeType === this.TEXT_NODE) {
                        if (donotEnscapeTagReg.test(tagName)) {
                            html += child.nodeValue;
                        } else {
                            html += getEnscapeValue(child.nodeValue);
                        }
                    } else {
                        html += child.outerHTML;
                    }
                }
            } else {}

            return html;
        },
        set: function set(val) {
            var ParseDom = __webpack_require__(12);

            var document = this.ownerDocument;
            var window = document.defaultView || {};

            var result = new ParseDom().parseHTMLFragment(val, window);
            var docTree = result.docTree;

            this.childNodes = docTree._tree.childNodes;
            for (var i = 0; i < this.childNodes.length; i++) {
                this.childNodes[i].parentNode = this;
            }
        }
    }, {
        key: 'localName',
        get: function get() {
            return this.tagName || '';
        }
    }, {
        key: 'outerHTML',
        set: function set(val) {
            var document = this.ownerDocument;
            var div = document.createElement('div');

            div.innerHTML = val;

            if (this.parentNode) {
                while (div.childNodes[0]) {
                    this.parentNode.insertBefore(div.childNodes[0], this);
                }

                this.parentNode.removeChild(this);
            }
        },
        get: function get() {
            var tagName = (this.tagName || '').toLowerCase();
            var selfCloseTagReg = /br|hr|img|link|meta/;

            var isSelfEnd = selfCloseTagReg.test(tagName);

            if (this.nodeType === this.TEXT_NODE || !tagName) {
                return this.nodeValue || "";
            }

            var attrStr = this._getAttributeString();

            var html;
            if (isSelfEnd) {
                html = "<" + tagName + attrStr + " />";
            } else {
                html = "<" + tagName + attrStr + ">";
                if (this.childNodes) {
                    for (var i = 0; i < this.childNodes.length; i++) {
                        var child = this.childNodes[i];

                        if (child.nodeType === this.TEXT_NODE) {
                            if (donotEnscapeTagReg.test(tagName)) {
                                html += child.nodeValue;
                            } else {
                                html += getEnscapeValue(child.nodeValue);
                            }
                        } else {
                            html += child.outerHTML;
                        }
                    }
                }

                html += "</" + tagName + ">";
            }

            return html;
        }
    }, {
        key: 'scrollTop',
        get: function get() {
            return this.__scrollTop || 0;
        },
        set: function set(val) {
            this.__scrollTop = val;
        }
    }]);

    return Element;
}(Node);

module.exports = Element;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = __webpack_require__(20);

var EventTarget = function () {
    function EventTarget() {
        _classCallCheck(this, EventTarget);

        this.listeners = {};

        this._emitter = new EventEmitter();
    }

    _createClass(EventTarget, [{
        key: 'addEventListener',
        value: function addEventListener(type, handler, isCapture) {
            this._emitter.addListener(type, handler.handleEvent || handler, isCapture);
        }
    }, {
        key: 'removeEventListener',
        value: function removeEventListener(type, callback) {}
    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent(event) {
            var e = {
                preventDefault: function preventDefault() {},

                stopPropagation: function stopPropagation() {},

                target: this,

                srcElement: this
            };

            if (this._emitter) {
                this._emitter.emit(event.type, e);
            }
        }
    }]);

    return EventTarget;
}();

module.exports = EventTarget;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Text = __webpack_require__(1);

var NamedNodeMap = function () {
    function NamedNodeMap(node) {
        _classCallCheck(this, NamedNodeMap);

        this.length = 0;
        this.ownerElment = node;
    }

    _createClass(NamedNodeMap, [{
        key: 'removeNamedItem',
        value: function removeNamedItem(name) {
            var index = -1;
            for (var i in this) {
                if (this.hasOwnProperty(i)) {
                    var item = this[i];

                    if (item.name == name) {
                        index = Number(i);
                        break;
                    }
                }
            }

            if (!isNaN(index) && index > -1) {
                delete this[index];
                this.length--;

                for (var i = index; i < this.length; i++) {
                    this[i] = this[i + 1];
                }

                delete this[name];
            }
        }
    }, {
        key: 'setNamedItem',
        value: function setNamedItem(name, value) {
            var attr = this.getNamedItem(name);
            var _this = this;

            if (attr) {
                attr.name = name;
                attr.nodeValue = value || '';
                attr.value = value || '';

                attr.firstChild.value = value || '';
                attr.firstChild.nodeValue = value || '';
            } else {

                this[this.length++] = {
                    name: name,
                    value: value || '',
                    ownerElment: this.ownerElment,
                    nodeType: this.ownerElment.ATTRIBUTE_NODE,
                    nodeValue: value || '',
                    childNodes: function () {
                        var node = _this.ownerElment.ownerDocument.createTextNode();
                        return [node];
                    }(),

                    get lastChild() {
                        return this.childNodes[this.childNodes.length - 1];
                    },

                    get firstChild() {
                        return this.childNodes[0];
                    }
                };

                this[name] = this[this.length - 1];
            }
        }
    }, {
        key: 'getNamedItem',
        value: function getNamedItem(name) {
            for (var i in this) {
                if (this.hasOwnProperty(i)) {
                    var item = this[i];

                    if (item.name == name) {
                        return item;
                    }
                }
            }
        }
    }]);

    return NamedNodeMap;
}();

module.exports = NamedNodeMap;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DOMTokenList = function () {
    function DOMTokenList(ownElement) {
        _classCallCheck(this, DOMTokenList);

        this.ownElement = ownElement;
    }

    _createClass(DOMTokenList, [{
        key: 'item',
        value: function item(index) {
            return this.__class[index];
        }
    }, {
        key: 'contains',
        value: function contains(className) {
            return this.__class.indexOf(className) > -1;
        }
    }, {
        key: 'add',
        value: function add(className) {
            if (this.contains(className)) {} else {
                var classList = this.__class;

                classList.push(className);
                this.ownElement.className = classList.join(' ');
            }
        }
    }, {
        key: 'remove',
        value: function remove(className) {
            var classList = this.__class;
            var index = classList.indexOf(className);

            if (index > -1) {
                classList.splice(index, 1);

                this.ownElement.className = classList.join(' ');
            }
        }
    }, {
        key: 'toggle',
        value: function toggle(className) {
            this.contains(className) ? this.remove(className) : this.add(className);
        }
    }, {
        key: 'keys',
        value: function keys() {
            return this.__class.keys();
        }
    }, {
        key: 'values',
        value: function values() {
            return this.__class[Symbol.iterator]();
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.value;
        }
    }, {
        key: '__class',
        get: function get() {
            var className = this.ownElement.className || '';

            if (className.trim()) {
                var nameArr = (this.ownElement.className || '').trim().split(/ +/);
                return nameArr;
            } else {
                return [];
            }
        }
    }, {
        key: 'length',
        get: function get() {
            return this.__class.length;
        }
    }, {
        key: 'value',
        get: function get() {
            return this.__class.join(' ');
        }
    }]);

    return DOMTokenList;
}();

module.exports = DOMTokenList;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parseCssText = function parseCssText(style, val) {
    // 解析css
    if (val) {
        val = val.split(";");

        val.map(function (item, index) {
            if (item) {
                var exp = item.split(":");
                var name = exp[0];
                var v = exp[1] || '';

                style[name] = v;
            }
        });
    }
};

var CSSStyleDeclaration = function () {
    function CSSStyleDeclaration() {
        _classCallCheck(this, CSSStyleDeclaration);
    }

    _createClass(CSSStyleDeclaration, [{
        key: "cssText",
        set: function set(val) {
            parseCssText(this, val);
        }
    }]);

    return CSSStyleDeclaration;
}();

module.exports = CSSStyleDeclaration;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = __webpack_require__(0);

var Comment = function (_Node) {
    _inherits(Comment, _Node);

    function Comment(text) {
        _classCallCheck(this, Comment);

        var _this = _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this));

        _this.nodeType = _this.COMMENT_NODE;
        _this.nodeValue = text || '';
        _this.tagName = '#comment';
        return _this;
    }

    // non-standard method


    _createClass(Comment, [{
        key: 'outerHTML',
        get: function get() {
            return "<!--" + (this.nodeValue || '') + "-->";
        }

        // non-standard method

    }, {
        key: 'innerHTML',
        get: function get() {
            return this.nodeValue || '';
        }
    }]);

    return Comment;
}(Node);

module.exports = Comment;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tree = __webpack_require__(21);
var compileCode = __webpack_require__(22);

var preParsedMap = {};

var ParseDom = function () {
    function ParseDom() {
        _classCallCheck(this, ParseDom);
    }

    _createClass(ParseDom, [{
        key: 'parse',
        value: function parse(html, window) {
            return this.parseHTML(html, window);
        }
    }, {
        key: 'parseHTMLFragment',
        value: function parseHTMLFragment(htmlStr, window) {
            var document = window.document;

            var docTree = new Tree();

            var currNode;
            var preParedQueue;
            if (preParsedMap[htmlStr]) {} else {
                preParsedMap[htmlStr] = this.preParse(htmlStr);
            }

            preParedQueue = preParsedMap[htmlStr];

            var headNode, bodyNode, htmlNode;

            for (var i = 0; i < preParedQueue.length; i++) {
                var item = preParedQueue[i];

                var tagType = item.tagType;

                var tagName = item.tagName;

                if (tagType === "startTag") {
                    var node = document.createElement(tagName);

                    if (tagName === "head") {
                        headNode = node;
                    }

                    if (tagName === "body") {
                        bodyNode = node;
                    }

                    if (tagName === "html") {
                        htmlNode = node;
                    }

                    currNode = node;

                    docTree.push(node);
                    //_allNode.push(node);
                } else if (tagType === "attrs") {

                    var match = item.match;
                    if (match === ">") {
                        if (currNode.getAttribute('type') && (currNode.getAttribute("type") + '').toLowerCase() !== "text/javascript") {} else {
                            if (currNode.getAttribute("src") && currNode.tagName === 'script') {
                                // @这里注释掉是直出不希望再执行, 使用sodajs会碰到
                                // var attrValue = currNode.getAttribute("src");
                                // var content = windowSpace.drequire(attrValue);

                            }
                        }

                        if (item.goNext) {
                            docTree.goNext();
                        }
                    } else if (match === "/>") {} else {
                        var attrName = item.attrName;
                        var attrValue = item.attrValue;

                        if (attrName === "id") {
                            // _idMap[attrValue] = currNode;
                        }

                        currNode.setAttribute(attrName, attrValue);
                    }
                } else if (tagType === "textTag") {
                    var text = item.nodeValue;
                    var node = document.createTextNode(text);
                    docTree.push(node);

                    currNode = node;

                    if (item.checkParentScript) {
                        if (node.parentNode.tagName === "script") {
                            if (node.parentNode.getAttribute('type') && (node.parentNode.getAttribute("type") + '').toLowerCase() !== "text/javascript") {} else {
                                try {
                                    compileCode.runCode(text, window);
                                } catch (e) {}
                            }
                        }
                    }

                    if (item.backUp) {
                        docTree.backUp();
                    }
                } else if (tagType === "commentTag") {
                    var text = item.nodeValue;
                    var node = document.createComment(text);

                    docTree.push(node);

                    currNode = node;

                    if (item.backUp) {
                        docTree.backUp();
                    }
                } else if (tagType === "endTag") {
                    // 如果是一个endTag 将一个空结点做为tag的子结点
                    var node = document.createElement();
                    docTree.push(node);

                    currNode = node;

                    if (item.backUp) {
                        docTree.backUp();
                    }
                }
            }

            return {
                headNode: headNode,
                bodyNode: bodyNode,
                htmlNode: htmlNode,
                docTree: docTree
            };
        }
    }, {
        key: 'parseHTMLDocument',
        value: function parseHTMLDocument(htmlStr, window) {
            var document = window.document;

            var result = this.parseHTMLFragment(htmlStr, window);

            var docTree = result.docTree;

            var headNode = result.headNode || document.createElement('head');

            var bodyNode, htmlNode;

            if (result.bodyNode) {
                bodyNode = result.bodyNode;
            } else {
                var bodyNode = document.createElement('body');
                bodyNode.childNodes = docTree._tree.childNodes;

                bodyNode.childNodes.map(function (item) {
                    item.parentNode = bodyNode;
                });
            }

            if (!result.htmlNode) {
                htmlNode = document.createElement('html');

                htmlNode.childNodes.push(headNode);
                htmlNode.childNodes.push(bodyNode);
            } else {
                htmlNode = result.htmlNode;
            }

            var tree = new Tree();
            tree.push(document);
            tree.goNext();

            tree.push(htmlNode);

            document.documentElement = htmlNode;
            document.head = headNode;
            document.body = bodyNode;

            // check docTree

            return document;

            //console.log(docTree);
        }
    }, {
        key: 'preParse',
        value: function preParse(htmlStr) {
            // 预处理
            // 去掉注释
            // @todo 自封口
            // var commentsReg = /<!--[\s\S]*?-->/g;


            //htmlStr = htmlStr.replace(commentsReg, "");

            // 对转义字符的处理
            var escapeCharReg = /\\(.)/g;

            var escapeCount = 0;
            var escapeCharTable = {};

            var codeProcessQueue = [];

            var codeProcessed;

            // 预处理
            /*
            str = str.replace(escapeCharReg, function(result, $1){
                if(escapeCharTable[$1]){
                }else{
                    escapeCount ++;
                      escapeCharTable[$1] = escapeCount;
                }
                  var index = escapeCharTable[$1];
                  var escapeChar = "__fire__" + index;
                  return escapeChar;
            });
            */

            //var docTree = new Tree();

            //scopeSpace.DOMTREE = docTree;

            //var _idMap = docTree._idMap; 
            //var _allNode = docTree._allNode;

            //var tagReg = /\s*<(\/?)([^>\s]+)([^>]*)>/g;

            var tagReg = /<\!\-\-|<([^\s\/>]+)|<(\/)([^\s>]+)>|([^<]+)/g;

            var attrReg = />|\/>|([^\s=]+)=(?:"([^"]*)"|'([^']*)'|([^\s"']+))/g;

            var selfCloseTagReg = /br|hr|img|link|meta/;

            // 可能里面允许出现</div这样的东西的tag
            var mixableTagReg = /script|code|pre/;

            var getCloseTagReg = function getCloseTagReg(tagName) {
                var reg = new RegExp("</(" + tagName + ")>", "g");
                reg.type = "mixableTagCloseReg";

                return reg;
            };

            /**
             * 分析元素树
             */
            var result, attrResult, attrsObj;
            var lastIndex = 0,
                lastTagName = "";
            var text, textNode;

            var currReg = tagReg;

            // 先检查是不是只有纯文本
            /*
            if(! currTagReg.test(htmlStr)){
                if(textReg.test(htmlStr)){
                   text = htmlStr;
                      if(text){
                        textNode = new domEle.Element();
                        textNode.nodeType = textNode.TEXT_NODE;
                        textNode.nodeValue = text;
                          docTree.push(textNode);
                    }
                }
            }
            */

            currReg.lastIndex = 0;

            var currNode,
                attrsObj = {};

            var setCurrTag = function setCurrTag(tag) {
                lastIndex = currReg.lastIndex;

                currReg = tag;
                currReg.lastIndex = lastIndex;
            };

            while (result = currReg.exec(htmlStr)) {
                var tagType;

                var tagName = result[1] || result[3];
                var node;

                // 如果是tag 判断type
                if (currReg === tagReg) {
                    if (result[0] === '<!--') {
                        tagType = "commentTag";
                    } else if (result[1]) {
                        tagType = "startTag";
                    } else if (result[2] === "/") {
                        tagType = "endTag";
                    } else {
                        tagType = "textTag";
                    }
                } else if (currReg === attrReg) {
                    tagType = "attrs";
                } else if (currReg.type === "mixableTagCloseReg") {
                    tagType = "mixableTagCloseReg";
                } else if (currReg.type === "commentEndTag") {
                    tagType = "commentEndTag";
                }

                if (tagType === "startTag") {
                    codeProcessed = {
                        tagType: "startTag",
                        tagName: tagName
                    };

                    currNode = codeProcessed;
                    attrsObj = {};

                    codeProcessQueue.push(codeProcessed);

                    // 开始进入属性分析进程
                    setCurrTag(attrReg);

                    // 属性分析进程
                } else if (tagType === "attrs") {
                    if (result[0] === ">") {

                        codeProcessed = {
                            tagType: "attrs",
                            match: ">"
                        };

                        // 开始寻找开始、结束标签
                        setCurrTag(tagReg);

                        // 属于自封口的是不会继续深入的
                        if (selfCloseTagReg.test(currNode.tagName)) {} else {
                            //docTree.goNext();

                            codeProcessed.goNext = 1;
                        }

                        // 如果是script等 不在寻找标签
                        if (mixableTagReg.test(currNode.tagName)) {

                            setCurrTag(getCloseTagReg(currNode.tagName));
                        }

                        codeProcessQueue.push(codeProcessed);

                        // 自封口了
                    } else if (result[0] === "/>") {
                        // 开始寻找开始、结束标签
                        setCurrTag(tagReg);

                        codeProcessQueue.push({
                            tagType: "attrs",
                            match: "/>"
                        });

                        // 这里分析属性
                    } else {
                        var attrName = (result[1] + '').trim();
                        var attrValue = result[2] || result[3] || result[4];

                        if (attrName === "class") {
                            attrName = "className";
                        }

                        codeProcessQueue.push({
                            tagType: "attrs",
                            attrName: attrName,
                            attrValue: attrValue
                        });
                    }
                } else if (tagType === "textTag") {
                    var text = result[4];

                    codeProcessQueue.push({
                        tagType: "textTag",
                        nodeValue: text || ''
                    });

                    currNode = node;
                } else if (tagType === "endTag") {

                    codeProcessed = {
                        tagType: "endTag"
                    };

                    // 自封口没有深入 也不会回溯
                    if (selfCloseTagReg.test(tagName)) {

                        // 回溯到该子结点的级别
                    } else {
                        //docTree.backUp();

                        codeProcessed.backUp = 1;
                    }

                    codeProcessQueue.push(codeProcessed);
                } else if (tagType === "commentTag") {
                    var closeReg = /\-\->/g;
                    closeReg.type = "commentEndTag";

                    setCurrTag(closeReg);
                } else if (tagType === "commentEndTag") {
                    var start = lastIndex;
                    var len = currReg.lastIndex - result[0].length - start;

                    var text = htmlStr.substr(start, len);

                    codeProcessed = {
                        tagType: "commentTag",
                        checkParentScript: false,
                        nodeValue: text,
                        backUp: 0
                    };

                    currNode = codeProcessed;

                    setCurrTag(tagReg);

                    codeProcessQueue.push(codeProcessed);
                } else if (tagType === "mixableTagCloseReg") {
                    var start = lastIndex;
                    var len = currReg.lastIndex - result[0].length - start;

                    var text = htmlStr.substr(start, len);

                    codeProcessed = {
                        tagType: "textTag",
                        checkParentScript: 1,
                        nodeValue: text,
                        backUp: 1
                    };

                    currNode = codeProcessed;

                    setCurrTag(tagReg);

                    codeProcessQueue.push(codeProcessed);
                }
            }

            return codeProcessQueue;
        }
    }]);

    return ParseDom;
}();

module.exports = ParseDom;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
    function Event(eventType) {
        _classCallCheck(this, Event);

        this._eventType = eventType;
        this._type = null;
        this._bubbles = null;
        this._cancelable = null;
        this._target = null;
        this._currentTarget = null;
        this._eventPhase = 0;
        this._timeStamp = null;
        this._preventDefault = false;
        this._stopPropagation = false;

        this.NONE = 0;
        this.CAPTURING_PHASE = 1;
        this.AT_TARGET = 2;
        this.BUBBLING_PHASE = 3;
    }

    _createClass(Event, [{
        key: "initEvent",
        value: function initEvent(type, bubbles, cancelable) {
            this._type = type;
            this._bubbles = bubbles;
            this._cancelable = cancelable;
        }
    }, {
        key: "preventDefault",
        value: function preventDefault() {
            if (this._cancelable) {
                this._preventDefault = true;
            }
        }
    }, {
        key: "stopPropagation",
        value: function stopPropagation() {
            this._stopPropagation = true;
        }
    }, {
        key: "eventType",
        get: function get() {
            return this._eventType;
        }
    }, {
        key: "type",
        get: function get() {
            return this._type;
        }
    }, {
        key: "bubbles",
        get: function get() {
            return this._bubbles;
        }
    }, {
        key: "cancelable",
        get: function get() {
            return this._cancelable;
        }
    }, {
        key: "target",
        get: function get() {
            return this._target;
        }
    }, {
        key: "currentTarget",
        get: function get() {
            return this._currentTarget;
        }
    }, {
        key: "eventPhase",
        get: function get() {
            return this._eventPhase;
        }
    }, {
        key: "timeStamp",
        get: function get() {
            return this._timeStamp;
        }
    }]);

    return Event;
}();

module.exports = Event;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalStorage = function () {
    function LocalStorage(window) {
        _classCallCheck(this, LocalStorage);
    }

    _createClass(LocalStorage, [{
        key: "clear",
        value: function clear() {}
    }, {
        key: "setItem",
        value: function setItem() {}
    }, {
        key: "getItem",
        value: function getItem() {}
    }, {
        key: "removeItem",
        value: function removeItem() {}
    }]);

    return LocalStorage;
}();

module.exports = LocalStorage;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var soda = __webpack_require__(18);

if (typeof document === 'undefined') {
    var NodeWindow = __webpack_require__(19);
    var nodeWindow = new NodeWindow();

    var win = nodeWindow.runHTML("", {}, {});

    var document = win.document;

    soda.setDocument(document);
}

module.exports = soda;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
    if (( false ? 'undefined' : _typeof2(exports)) === 'object' && ( false ? 'undefined' : _typeof2(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof2(exports)) === 'object') exports["soda"] = factory();else root["soda"] = factory();
})(undefined, function () {
    return (/******/function (modules) {
            // webpackBootstrap
            /******/ // The module cache
            /******/var installedModules = {};
            /******/
            /******/ // The require function
            /******/function __webpack_require__(moduleId) {
                /******/
                /******/ // Check if module is in cache
                /******/if (installedModules[moduleId]) {
                    /******/return installedModules[moduleId].exports;
                    /******/
                }
                /******/ // Create a new module (and put it into the cache)
                /******/var module = installedModules[moduleId] = {
                    /******/i: moduleId,
                    /******/l: false,
                    /******/exports: {}
                    /******/ };
                /******/
                /******/ // Execute the module function
                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                /******/
                /******/ // Flag the module as loaded
                /******/module.l = true;
                /******/
                /******/ // Return the exports of the module
                /******/return module.exports;
                /******/
            }
            /******/
            /******/
            /******/ // expose the modules object (__webpack_modules__)
            /******/__webpack_require__.m = modules;
            /******/
            /******/ // expose the module cache
            /******/__webpack_require__.c = installedModules;
            /******/
            /******/ // define getter function for harmony exports
            /******/__webpack_require__.d = function (exports, name, getter) {
                /******/if (!__webpack_require__.o(exports, name)) {
                    /******/Object.defineProperty(exports, name, {
                        /******/configurable: false,
                        /******/enumerable: true,
                        /******/get: getter
                        /******/ });
                    /******/
                }
                /******/
            };
            /******/
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/__webpack_require__.n = function (module) {
                /******/var getter = module && module.__esModule ?
                /******/function getDefault() {
                    return module['default'];
                } :
                /******/function getModuleExports() {
                    return module;
                };
                /******/__webpack_require__.d(getter, 'a', getter);
                /******/return getter;
                /******/
            };
            /******/
            /******/ // Object.prototype.hasOwnProperty.call
            /******/__webpack_require__.o = function (object, property) {
                return Object.prototype.hasOwnProperty.call(object, property);
            };
            /******/
            /******/ // __webpack_public_path__
            /******/__webpack_require__.p = "";
            /******/
            /******/ // Load entry module and return exports
            /******/return __webpack_require__(__webpack_require__.s = 3);
            /******/
        }(
        /************************************************************************/
        /******/[
        /* 0 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });

            var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
                return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
            } : function (obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
            };

            var _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
                };
            }();

            var _const = __webpack_require__(1);

            var _util = __webpack_require__(2);

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }

            var doc = typeof document !== 'undefined' ? document : {};

            var Soda = function () {
                function Soda() {
                    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'soda-';

                    _classCallCheck(this, Soda);

                    this._prefix = prefix;
                }

                _createClass(Soda, [{
                    key: 'setDocument',
                    value: function setDocument(_doc) {
                        doc = _doc;
                    }
                }, {
                    key: 'run',
                    value: function run(str, data) {
                        var _this = this;

                        // 解析模板DOM
                        var div = doc.createElement("div");

                        // 必须加入到body中去，不然自定义标签不生效
                        if (doc.documentMode < 9) {
                            div.style.display = 'none';
                            doc.body.appendChild(div);
                        }

                        div.innerHTML = str;

                        (0, _util.nodes2Arr)(div.childNodes).map(function (child) {
                            _this.compileNode(child, data);
                        });

                        var innerHTML = div.innerHTML;

                        if (doc.documentMode < 9) {
                            doc.body.removeChild(div);
                        }

                        return innerHTML;
                    }
                }, {
                    key: 'prefix',
                    value: function prefix(_prefix) {
                        this._prefix = _prefix;
                    }
                }, {
                    key: '_getPrefixReg',
                    value: function _getPrefixReg() {
                        return new RegExp('^' + this._prefix);
                    }
                }, {
                    key: '_getPrefixedDirectiveMap',
                    value: function _getPrefixedDirectiveMap() {
                        var _this2 = this;

                        var map = {};
                        Soda.sodaDirectives.map(function (item) {
                            var prefixedName = _this2._prefix + item.name;

                            map[prefixedName] = item;
                        });

                        return map;
                    }
                }, {
                    key: '_removeSodaMark',
                    value: function _removeSodaMark(node, name) {
                        node.removeAttribute(name);
                    }
                }, {
                    key: 'compileNode',
                    value: function compileNode(node, scope) {
                        var _this3 = this;

                        var prefixReg = this._getPrefixReg();

                        var sodaDirectives = Soda.sodaDirectives;

                        var prefixedDirectiveMap = this._getPrefixedDirectiveMap();

                        var compile = function compile(node, scope) {

                            // 如果只是文本
                            // parseTextNode
                            if (node.nodeType === (node.TEXT_NODE || 3)) {
                                node.nodeValue = node.nodeValue.replace(_const.VALUE_OUT_REG, function (item, $1) {
                                    var value = _this3.parseSodaExpression($1, scope);
                                    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object") {
                                        value = JSON.stringify(value, null, 2);
                                    }
                                    return value;
                                });
                            }

                            // parse Attributes
                            if (node.attributes && node.attributes.length) {

                                // 指令优先处理
                                sodaDirectives.map(function (item) {
                                    var name = item.name,
                                        opt = item.opt;

                                    var prefixedName = _this3._prefix + name;

                                    // 这里移除了对parentNode的判断
                                    // 允许使用无值的指令
                                    if ((0, _util.exist)(node.getAttribute(prefixedName))) {
                                        var expression = node.getAttribute(prefixedName);

                                        opt.link.bind(_this3)({
                                            expression: expression,
                                            scope: scope,
                                            el: node,
                                            parseSodaExpression: _this3.parseSodaExpression.bind(_this3),
                                            getValue: _this3.getValue.bind(_this3),
                                            compileNode: _this3.compileNode.bind(_this3),
                                            document: doc
                                        });

                                        // 移除标签
                                        _this3._removeSodaMark(node, prefixedName);
                                    }
                                });

                                // 处理输出 包含 prefix-*
                                (0, _util.nodes2Arr)(node.attributes)
                                // 过滤掉指令里包含的属性
                                .filter(function (attr) {
                                    return !prefixedDirectiveMap[attr.name];
                                }).map(function (attr) {
                                    if (prefixReg.test(attr.name)) {
                                        var attrName = attr.name.replace(prefixReg, '');

                                        if (attrName && (0, _util.exist)(attr.value)) {
                                            var attrValue = attr.value.replace(_const.VALUE_OUT_REG, function (item, $1) {
                                                return _this3.parseSodaExpression($1, scope);
                                            });

                                            if ((0, _util.exist)(attrValue)) {
                                                node.setAttribute(attrName, attrValue);
                                            }

                                            _this3._removeSodaMark(node, attr.name);
                                        }

                                        // 对其他属性里含expr 处理
                                    } else {
                                        if ((0, _util.exist)(attr.value)) {
                                            attr.value = attr.value.replace(_const.VALUE_OUT_REG, function (item, $1) {
                                                return _this3.parseSodaExpression($1, scope);
                                            });
                                        }
                                    }
                                });
                            }

                            // parse childNodes
                            (0, _util.nodes2Arr)(node.childNodes).map(function (child) {
                                compile(child, scope);
                            });
                        };

                        compile(node, scope);
                    }
                }, {
                    key: 'getEvalFunc',
                    value: function getEvalFunc(expr) {
                        var evalFunc = new Function("getValue", "sodaFilterMap", "return function sodaExp(scope){ return " + expr + "}")(this.getValue, Soda.sodaFilterMap);

                        return evalFunc;
                    }
                }, {
                    key: 'getValue',
                    value: function getValue(_data, _attrStr) {
                        _const.CONST_REGG.lastIndex = 0;
                        var realAttrStr = _attrStr.replace(_const.CONST_REGG, function (r) {
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

                        var _getValue = function _getValue(data, attrStr) {
                            var dotIndex = attrStr.indexOf(".");

                            if (dotIndex > -1) {
                                var attr = attrStr.substr(0, dotIndex);
                                attrStr = attrStr.substr(dotIndex + 1);

                                // 检查attrStr是否属于变量并转换
                                if (typeof _data[attr] !== "undefined" && _const.CONST_REG.test(attr)) {
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
                                if (typeof _data[attrStr] !== "undefined" && _const.CONST_REG.test(attrStr)) {
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
                }, {
                    key: 'parseSodaExpression',
                    value: function parseSodaExpression(str, scope) {
                        var _this4 = this;

                        // 将字符常量保存下来
                        str = str.replace(_const.STRING_REG, function (r, $1, $2) {
                            var key = (0, _util.getRandom)();
                            scope[key] = $1 || $2;
                            return key;
                        });

                        // 对filter进行处理
                        str = str.replace(_const.OR_REG, _const.OR_REPLACE).split("|");

                        for (var i = 0; i < str.length; i++) {
                            str[i] = (str[i].replace(new RegExp(_const.OR_REPLACE, 'g'), "||") || '').trim();
                        }

                        var expr = str[0] || "";
                        var filters = str.slice(1);

                        while (_const.ATTR_REG_NG.test(expr)) {
                            _const.ATTR_REG.lastIndex = 0;

                            //对expr预处理
                            expr = expr.replace(_const.ATTR_REG, function (r, $1) {
                                var key = (0, _util.getAttrVarKey)();
                                // 属性名称为字符常量
                                var attrName = _this4.parseSodaExpression($1, scope);

                                // 给一个特殊的前缀 表示是属性变量

                                scope[key] = attrName;

                                return "." + key;
                            });
                        }

                        expr = expr.replace(_const.OBJECT_REG, function (value) {
                            return "getValue(scope,'" + value.trim() + "')";
                        });

                        expr = this.parseFilter(filters, expr);

                        return this.getEvalFunc(expr)(scope);
                    }
                }, {
                    key: 'parseFilter',
                    value: function parseFilter(filters, expr) {
                        var sodaFilterMap = Soda.sodaFilterMap;

                        var parse = function parse() {
                            var filterExpr = filters.shift();

                            if (!filterExpr) {
                                return;
                            }

                            var filterExpr = filterExpr.split(":");
                            var args = filterExpr.slice(1) || [];
                            var name = (filterExpr[0] || "").trim();

                            for (var i = 0; i < args.length; i++) {
                                //这里根据类型进行判断
                                if (_const.OBJECT_REG_NG.test(args[i])) {
                                    args[i] = "getValue(scope,'" + args[i] + "')";
                                } else {}
                            }

                            if (sodaFilterMap[name]) {
                                args.unshift(expr);

                                args = args.join(",");

                                expr = "sodaFilterMap['" + name + "'](" + args + ")";
                            }

                            parse();
                        };

                        parse();

                        return expr;
                    }
                }], [{
                    key: 'filter',
                    value: function filter(name, func) {
                        this.sodaFilterMap[name] = func;
                    }
                }, {
                    key: 'getFilter',
                    value: function getFilter(name) {
                        return this.sodaFilterMap[name];
                    }
                }, {
                    key: 'directive',
                    value: function directive(name, opt) {
                        // 按照顺序入
                        var _opt$priority = opt.priority,
                            priority = _opt$priority === undefined ? 0 : _opt$priority;

                        var i = void 0;

                        for (i = 0; i < this.sodaDirectives.length; i++) {
                            var item = this.sodaDirectives[i];
                            var _item$opt$priority = item.opt.priority,
                                itemPriority = _item$opt$priority === undefined ? 0 : _item$opt$priority;

                            // 比他小 继续比下一个

                            if (priority < itemPriority) {

                                // 发现比它大或者相等 就插大他前面
                            } else if (priority >= itemPriority) {
                                break;
                            }
                        }

                        this.sodaDirectives.splice(i, 0, {
                            name: name,
                            opt: opt
                        });
                    }
                }, {
                    key: 'discribe',
                    value: function discribe(name, funcOrStr) {
                        var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { compile: true };

                        this.template[name] = {
                            funcOrStr: funcOrStr,
                            option: option
                        };
                    }
                }, {
                    key: 'getTmpl',
                    value: function getTmpl(name, args) {
                        var template = this.template[name];
                        var funcOrStr = template.funcOrStr,
                            _template$option = template.option,
                            option = _template$option === undefined ? {} : _template$option;

                        var result = void 0;

                        if (typeof funcOrStr === 'function') {
                            result = funcOrStr.apply(null, args);
                        } else {
                            result = funcOrStr;
                        }

                        return {
                            template: result,
                            option: option
                        };
                    }
                }]);

                return Soda;
            }();

            Soda.sodaDirectives = [];
            Soda.sodaFilterMap = {};
            Soda.template = {};
            exports["default"] = Soda;

            /***/
        },
        /* 1 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            // 标识符
            var IDENTOR_REG = exports.IDENTOR_REG = /[a-zA-Z_\$]+[\w\$]*/g;
            var STRING_REG = exports.STRING_REG = /"([^"]*)"|'([^']*)'/g;
            var NUMBER_REG = exports.NUMBER_REG = /\d+|\d*\.\d+/g;

            var OBJECT_REG = exports.OBJECT_REG = /[a-zA-Z_\$]+[\w\$]*(?:\s*\.\s*(?:[a-zA-Z_\$]+[\w\$]*|\d+))*/g;

            // 非global 做test用
            var OBJECT_REG_NG = exports.OBJECT_REG_NG = /[a-zA-Z_\$]+[\w\$]*(?:\s*\.\s*(?:[a-zA-Z_\$]+[\w\$]*|\d+))*/;

            var ATTR_REG = exports.ATTR_REG = /\[([^\[\]]*)\]/g;
            var ATTR_REG_NG = exports.ATTR_REG_NG = /\[([^\[\]]*)\]/;
            var ATTR_REG_DOT = exports.ATTR_REG_DOT = /\.([a-zA-Z_\$]+[\w\$]*)/g;

            var NOT_ATTR_REG = exports.NOT_ATTR_REG = /[^\.|]([a-zA-Z_\$]+[\w\$]*)/g;

            var OR_REG = exports.OR_REG = /\|\|/g;

            var OR_REPLACE = exports.OR_REPLACE = "OR_OPERATOR\x1E";

            var CONST_PRIFIX = exports.CONST_PRIFIX = "_$C$_";
            var CONST_REG = exports.CONST_REG = /^_\$C\$_/;
            var CONST_REGG = exports.CONST_REGG = /_\$C\$_[^\.]+/g;
            var VALUE_OUT_REG = exports.VALUE_OUT_REG = /\{\{([^\}]*)\}\}/g;

            /***/
        },
        /* 2 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.assign = exports.nodes2Arr = exports.exist = exports.getRandom = exports.getAttrVarKey = undefined;

            var _const = __webpack_require__(1);

            var getAttrVarKey = exports.getAttrVarKey = function getAttrVarKey() {
                return _const.CONST_PRIFIX + ~~(Math.random() * 1E6);
            };

            var getRandom = exports.getRandom = function getRandom() {
                return "$$" + ~~(Math.random() * 1E6);
            };

            var exist = exports.exist = function exist(value) {
                return value !== null && value !== undefined && value !== "" && typeof value !== 'undefined';
            };

            var nodes2Arr = exports.nodes2Arr = function nodes2Arr(nodes) {
                var arr = [];

                for (var i = 0; i < nodes.length; i++) {
                    arr.push(nodes[i]);
                }

                return arr;
            };

            var getOwnPropertySymbols = Object.getOwnPropertySymbols;
            var hasOwnProperty = Object.prototype.hasOwnProperty;
            var propIsEnumerable = Object.prototype.propertyIsEnumerable;

            var toObject = function toObject(val) {
                if (val === null || val === undefined) {
                    throw new TypeError('Object.assign cannot be called with null or undefined');
                }

                return Object(val);
            };

            var assign = exports.assign = Object.assign || function (target, source) {
                var from;
                var to = toObject(target);
                var symbols;

                for (var s = 1; s < arguments.length; s++) {
                    from = Object(arguments[s]);

                    for (var key in from) {
                        if (hasOwnProperty.call(from, key)) {
                            to[key] = from[key];
                        }
                    }

                    if (getOwnPropertySymbols) {
                        symbols = getOwnPropertySymbols(from);
                        for (var i = 0; i < symbols.length; i++) {
                            if (propIsEnumerable.call(from, symbols[i])) {
                                to[symbols[i]] = from[symbols[i]];
                            }
                        }
                    }
                }

                return to;
            };

            /***/
        },
        /* 3 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var _soda = __webpack_require__(0);

            var _soda2 = _interopRequireDefault(_soda);

            var _util = __webpack_require__(2);

            __webpack_require__(4);

            __webpack_require__(5);

            __webpack_require__(6);

            __webpack_require__(7);

            __webpack_require__(8);

            __webpack_require__(9);

            __webpack_require__(10);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { "default": obj };
            }

            var sodaInstance = new _soda2["default"]();

            var init = function init(str, data) {
                return sodaInstance.run(str, data);
            };

            var mock = {
                prefix: function prefix(_prefix) {
                    sodaInstance.prefix(_prefix);
                },
                filter: function filter(name, func) {
                    _soda2["default"].filter(name, func);
                },
                directive: function directive(name, opt) {
                    _soda2["default"].directive(name, opt);
                },
                setDocument: function setDocument(document) {
                    sodaInstance.setDocument(document);
                },
                discribe: function discribe(name, str, option) {
                    _soda2["default"].discribe(name, str, option);
                },

                Soda: _soda2["default"]
            };

            var soda = (0, _util.assign)(init, mock);

            module.exports = soda;

            /***/
        },
        /* 4 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var _soda = __webpack_require__(0);

            var _soda2 = _interopRequireDefault(_soda);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { "default": obj };
            }

            _soda2["default"].directive('repeat', {
                priority: 10,
                link: function link(_ref) {
                    var _this = this;

                    var scope = _ref.scope,
                        el = _ref.el,
                        expression = _ref.expression,
                        getValue = _ref.getValue,
                        parseSodaExpression = _ref.parseSodaExpression,
                        compileNode = _ref.compileNode;

                    var itemName;
                    var valueName;

                    var trackReg = /\s+by\s+([^\s]+)$/;

                    var trackName;
                    var opt = expression.replace(trackReg, function (item, $1) {
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

                    var repeatFunc = function repeatFunc(i) {
                        var itemNode = el.cloneNode(true);

                        // 这里创建一个新的scope
                        var itemScope = Object.create(scope);
                        itemScope[trackName] = i;

                        itemScope[itemName] = repeatObj[i];

                        //itemScope.__proto__ = scope;

                        // REMOVE cjd6568358
                        itemNode.removeAttribute(_this._prefix + 'repeat');

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

                    // el 清理
                    el.parentNode.removeChild(el);

                    if (el.childNodes && el.childNodes.length) {
                        el.innerHTML = '';
                    }
                }
            });

            /***/
        },
        /* 5 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var _soda = __webpack_require__(0);

            var _soda2 = _interopRequireDefault(_soda);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { "default": obj };
            }

            _soda2["default"].directive('if', {
                priority: 9,
                link: function link(_ref) {
                    var expression = _ref.expression,
                        parseSodaExpression = _ref.parseSodaExpression,
                        scope = _ref.scope,
                        el = _ref.el;

                    var expressFunc = parseSodaExpression(expression, scope);

                    if (expressFunc) {} else {
                        el.parentNode && el.parentNode.removeChild(el);
                    }
                }
            });

            /***/
        },
        /* 6 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var _soda = __webpack_require__(0);

            var _soda2 = _interopRequireDefault(_soda);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { "default": obj };
            }

            var classNameRegExp = function classNameRegExp(className) {
                return new RegExp('(^|\\s+)' + className + '(\\s+|$)', 'g');
            };

            var addClass = function addClass(el, className) {
                if (!el.className) {
                    el.className = className;

                    return;
                }

                if (el.className.match(classNameRegExp(className))) {} else {
                    el.className += " " + className;
                }
            };

            var removeClass = function removeClass(el, className) {
                el.className = el.className.replace(classNameRegExp(className), "");
            };

            _soda2["default"].directive('class', {
                link: function link(_ref) {
                    var scope = _ref.scope,
                        el = _ref.el,
                        expression = _ref.expression,
                        parseSodaExpression = _ref.parseSodaExpression;

                    var expressFunc = parseSodaExpression(expression, scope);

                    if (expressFunc) {
                        addClass(el, expressFunc);
                    } else {}
                }
            });

            /***/
        },
        /* 7 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var _soda = __webpack_require__(0);

            var _soda2 = _interopRequireDefault(_soda);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { "default": obj };
            }

            _soda2["default"].directive('html', {
                link: function link(_ref) {
                    var expression = _ref.expression,
                        scope = _ref.scope,
                        el = _ref.el,
                        parseSodaExpression = _ref.parseSodaExpression;

                    var result = parseSodaExpression(expression, scope);

                    if (result) {
                        el.innerHTML = result;
                    }
                }
            });

            /***/
        },
        /* 8 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var _soda = __webpack_require__(0);

            var _soda2 = _interopRequireDefault(_soda);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { "default": obj };
            }

            _soda2["default"].directive('replace', {
                link: function link(_ref) {
                    var scope = _ref.scope,
                        el = _ref.el,
                        expression = _ref.expression,
                        parseSodaExpression = _ref.parseSodaExpression,
                        document = _ref.document;

                    var result = parseSodaExpression(expression, scope);

                    if (result) {
                        var div = document.createElement('div');
                        div.innerHTML = result;

                        if (el.parentNode) {
                            while (div.childNodes[0]) {
                                el.parentNode.insertBefore(div.childNodes[0], el);
                            }
                        }
                    }

                    el.parentNode && el.parentNode.removeChild(el);
                }
            });

            /***/
        },
        /* 9 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var _soda = __webpack_require__(0);

            var _soda2 = _interopRequireDefault(_soda);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { "default": obj };
            }

            _soda2["default"].directive('style', {
                link: function link(_ref) {
                    var scope = _ref.scope,
                        el = _ref.el,
                        expression = _ref.expression,
                        parseSodaExpression = _ref.parseSodaExpression;

                    var expressFunc = parseSodaExpression(expression, scope);

                    var getCssValue = function getCssValue(name, value) {
                        var numberWithoutpx = /opacity|z-index/;
                        if (numberWithoutpx.test(name)) {
                            return parseFloat(value);
                        }

                        if (isNaN(value)) {
                            return value;
                        } else {
                            return value + "px";
                        }
                    };

                    if (expressFunc) {
                        var stylelist = [];

                        for (var i in expressFunc) {
                            if (expressFunc.hasOwnProperty(i)) {
                                var provalue = getCssValue(i, expressFunc[i]);

                                stylelist.push([i, provalue].join(":"));
                            }
                        }

                        var style = el.style;
                        for (var i = 0; i < style.length; i++) {
                            var name = style[i];
                            if (expressFunc[name]) {} else {
                                stylelist.push([name, style[name]].join(":"));
                            }
                        }

                        var styleStr = stylelist.join(";");

                        el.setAttribute("style", styleStr);
                    }
                }
            });

            /***/
        },
        /* 10 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var _soda = __webpack_require__(0);

            var _soda2 = _interopRequireDefault(_soda);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { "default": obj };
            }

            _soda2["default"].directive('include', {
                priority: 8,
                link: function link(_ref) {
                    var scope = _ref.scope,
                        el = _ref.el,
                        parseSodaExpression = _ref.parseSodaExpression,
                        expression = _ref.expression;

                    var VALUE_OUT_REG = /\{\{([^\}]*)\}\}/g;

                    var result = expression.replace(VALUE_OUT_REG, function (item, $1) {
                        return parseSodaExpression($1, scope);
                    });

                    result = result.split(":");

                    var name = result[0];

                    var args = result.slice(1);

                    var templateOption = _soda2["default"].getTmpl(name, args);

                    var template = templateOption.template,
                        _templateOption$optio = templateOption.option,
                        option = _templateOption$optio === undefined ? {} : _templateOption$optio;

                    if (template) {
                        if (option.compile) {
                            el.outerHTML = this.run(template, scope);
                        } else {
                            el.outerHTML = template;
                        }
                    }
                }
            });

            /***/
        }]
        /******/)
    );
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)(module)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Window = __webpack_require__(2);
var ParseDom = __webpack_require__(12);

var fileCache = {};

var NodeWindow = function () {
    function NodeWindow() {
        _classCallCheck(this, NodeWindow);
    }

    _createClass(NodeWindow, [{
        key: 'run',
        value: function run(filepath, browserEnv, config) {
            var html;
            if (fileCache[filepath]) {} else {
                var fileContent = __webpack_require__(35).readFileSync(filepath, { encoding: "utf-8" });
                fileCache[filepath] = fileContent;
            }

            var window = new Window(browserEnv);
            var parsor = new ParseDom(window);

            parsor.parse(html);

            return window;
        }
    }, {
        key: 'runHTML',
        value: function runHTML(html, browserEnv, config) {
            var window = new Window(browserEnv);
            var parsor = new ParseDom(window);

            parsor.parseHTMLDocument(html, window);

            return window;
        }
    }]);

    return NodeWindow;
}();

module.exports = NodeWindow;
/*

var a = new nodeWindow();
var window = a.runHTML(`
    <body>
    <div>xxxxxxxxxxxxxxxxxx</div>
    <script type="text/javascript">console.log()</script>
    </body>
`, {}, {});

// test style
var d = window.document.body;
d.style.width = '12px';
d.style.display = "block";
//console.log(d.outerHTML);

// test cssText
window.document.body.style.cssText = "left: 0px; top: 0px;";

console.log(window.document.body.outerHTML);
*/

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function (n) {
  if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function (type) {
  var er, handler, len, args, i, listeners;

  if (!this._events) this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler)) return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++) {
      listeners[i].apply(this, args);
    }
  }

  return true;
};

EventEmitter.prototype.addListener = function (type, listener) {
  var m;

  if (!isFunction(listener)) throw TypeError('listener must be a function');

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener) this.emit('newListener', type, isFunction(listener.listener) ? listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function (type, listener) {
  if (!isFunction(listener)) throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function (type, listener) {
  var list, position, length, i;

  if (!isFunction(listener)) throw TypeError('listener must be a function');

  if (!this._events || !this._events[type]) return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener || isFunction(list.listener) && list.listener === listener) {
    delete this._events[type];
    if (this._events.removeListener) this.emit('removeListener', type, listener);
  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
        position = i;
        break;
      }
    }

    if (position < 0) return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener) this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function (type) {
  var key, listeners;

  if (!this._events) return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0) this._events = {};else if (this._events[type]) delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length) {
      this.removeListener(type, listeners[listeners.length - 1]);
    }
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function (type) {
  var ret;
  if (!this._events || !this._events[type]) ret = [];else if (isFunction(this._events[type])) ret = [this._events[type]];else ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function (type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener)) return 1;else if (evlistener) return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function (emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tree = function () {
    function Tree() {
        _classCallCheck(this, Tree);

        this._tree = {
            name: "ROOT",
            childNodes: []
        };

        this._idMap = {};
        this._allNode = [];

        this._currParentNode = this._tree;
    }

    _createClass(Tree, [{
        key: "goNext",
        value: function goNext() {
            var parentNode = this._currParentNode;

            var lastChild = parentNode.childNodes[parentNode.childNodes.length - 1];

            if (lastChild) {
                this._currParentNode = lastChild;
            } else {
                throw new Error('tree goNext has no child');
            }
        }
    }, {
        key: "push",
        value: function push(node) {
            node.parentNode = this._currParentNode;

            this._currParentNode.childNodes.push(node);
        }

        // 回溯

    }, {
        key: "backUp",
        value: function backUp() {
            this._currParentNode = this._currParentNode.parentNode;
        }
    }, {
        key: "getNodeById",
        value: function getNodeById(id) {
            return this._idMap[id] || null;
        }
    }, {
        key: "getAllNodes",
        value: function getAllNodes() {
            return this._allNode || [];
        }
    }]);

    return Tree;
}();

module.exports = Tree;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var vm = __webpack_require__(23);
var url = __webpack_require__(25);
var path = __webpack_require__(32);

// 这里require是由script标签触发的
var drequire = function drequire(filename, callback, isPreCompile) {
    var originPath = filename;

    //    filename = this.__toRealPath(filename);

    var urlpath = url.parse(filename);
    var search = urlpath.search;
    var query = querystring.parse((urlpath.search || "").replace(/^\?/, ""));

    // http请求
    if (urlpath.hostname) {
        /*
        var xhr = new this.XMLHttpRequest();
        xhr.open("GET", urlpath.href);
        xhr.onload = function(data){
            vm.runInThisContext(content, filename);
        };
          xhr.send(search);
        */

        // 本地文件
    } else {
        var filepath;
        //  if(/qqapi\.js/.test(filename)){
        //     filepath = filename;
        //}else{
        filepath = path.resolve(this.__basePath, urlpath.pathname);
        //}

        var content;

        if (fileReadMap[filename]) {} else {
            try {
                fileReadMap[filename] = fs.readFileSync(filepath, { encoding: "utf-8" });
            } catch (e) {
                console.log('file not found', filepath, originPath);

                throw e;
            }
        }

        content = fileReadMap[filename];

        if (fileCompiledMap[filename]) {} else {
            fileCompiledMap[filename] = new vm.Script(content, {
                filename: filename
            });
        }

        var compiledScript = fileCompiledMap[filename];

        if (isPreCompile) {
            return compiledScript;
        } else {
            try {
                var rs = compiledScript.runInNewContext(this);
            } catch (e) {
                console.log(e.stack);
            }

            for (var i in rs) {
                this[i] = rs[i];
            }

            ctx = null;
        }

        callback && callback();
    }
};

module.exports = {
    runCode: function runCode(code, window) {
        return vm.runInNewContext(code, window);
    }
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var indexOf = __webpack_require__(24);

var Object_keys = function Object_keys(obj) {
    if (Object.keys) return Object.keys(obj);else {
        var res = [];
        for (var key in obj) {
            res.push(key);
        }return res;
    }
};

var forEach = function forEach(xs, fn) {
    if (xs.forEach) return xs.forEach(fn);else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

var defineProp = function () {
    try {
        Object.defineProperty({}, '_', {});
        return function (obj, name, value) {
            Object.defineProperty(obj, name, {
                writable: true,
                enumerable: false,
                configurable: true,
                value: value
            });
        };
    } catch (e) {
        return function (obj, name, value) {
            obj[name] = value;
        };
    }
}();

var globals = ['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function', 'Infinity', 'JSON', 'Math', 'NaN', 'Number', 'Object', 'RangeError', 'ReferenceError', 'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape', 'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'undefined', 'unescape'];

function Context() {}
Context.prototype = {};

var Script = exports.Script = function NodeScript(code) {
    if (!(this instanceof Script)) return new Script(code);
    this.code = code;
};

Script.prototype.runInContext = function (context) {
    if (!(context instanceof Context)) {
        throw new TypeError("needs a 'context' argument.");
    }

    var iframe = document.createElement('iframe');
    if (!iframe.style) iframe.style = {};
    iframe.style.display = 'none';

    document.body.appendChild(iframe);

    var win = iframe.contentWindow;
    var wEval = win.eval,
        wExecScript = win.execScript;

    if (!wEval && wExecScript) {
        // win.eval() magically appears when this is called in IE:
        wExecScript.call(win, 'null');
        wEval = win.eval;
    }

    forEach(Object_keys(context), function (key) {
        win[key] = context[key];
    });
    forEach(globals, function (key) {
        if (context[key]) {
            win[key] = context[key];
        }
    });

    var winKeys = Object_keys(win);

    var res = wEval.call(win, this.code);

    forEach(Object_keys(win), function (key) {
        // Avoid copying circular objects like `top` and `window` by only
        // updating existing context properties or new properties in the `win`
        // that was only introduced after the eval.
        if (key in context || indexOf(winKeys, key) === -1) {
            context[key] = win[key];
        }
    });

    forEach(globals, function (key) {
        if (!(key in context)) {
            defineProp(context, key, win[key]);
        }
    });

    document.body.removeChild(iframe);

    return res;
};

Script.prototype.runInThisContext = function () {
    return eval(this.code); // maybe...
};

Script.prototype.runInNewContext = function (context) {
    var ctx = Script.createContext(context);
    var res = this.runInContext(ctx);

    forEach(Object_keys(ctx), function (key) {
        context[key] = ctx[key];
    });

    return res;
};

forEach(Object_keys(Script.prototype), function (name) {
    exports[name] = Script[name] = function (code) {
        var s = Script(code);
        return s[name].apply(s, [].slice.call(arguments, 1));
    };
});

exports.createScript = function (code) {
    return exports.Script(code);
};

exports.createContext = Script.createContext = function (context) {
    var copy = new Context();
    if ((typeof context === 'undefined' ? 'undefined' : _typeof(context)) === 'object') {
        forEach(Object_keys(context), function (key) {
            copy[key] = context[key];
        });
    }
    return copy;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = [].indexOf;

module.exports = function (arr, obj) {
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var punycode = __webpack_require__(26);
var util = __webpack_require__(28);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,


// Special case for a simple path URL
simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,


// RFC 2396: characters reserved for delimiting URLs.
// We actually just auto-escape these.
delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],


// RFC 2396: characters not allowed for various reasons.
unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),


// Allowed by RFCs, but cause of XSS attacks.  Always escape these.
autoEscape = ['\''].concat(unwise),

// Characters that are never ever allowed in a hostname.
// Note that any invalid chars are also handled, but these
// are the ones that are *expected* to be seen, so we fast-path
// them.
nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,

// protocols that can allow "unsafe" and "unwise" chars.
unsafeProtocol = {
  'javascript': true,
  'javascript:': true
},

// protocols that never have a hostname.
hostlessProtocol = {
  'javascript': true,
  'javascript:': true
},

// protocols that always contain a // bit.
slashedProtocol = {
  'http': true,
  'https': true,
  'ftp': true,
  'gopher': true,
  'file': true,
  'http:': true,
  'https:': true,
  'ftp:': true,
  'gopher:': true,
  'file:': true
},
    querystring = __webpack_require__(29);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url();
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function (url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + (typeof url === 'undefined' ? 'undefined' : _typeof(url)));
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter = queryIndex !== -1 && queryIndex < url.indexOf('#') ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1) hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1) continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }

  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function () {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || query && '?' + query || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function (relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function (relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol') result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift())) {}
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = result.pathname && result.pathname.charAt(0) === '/',
      isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === '/',
      mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname,
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = relative.host || relative.host === '' ? relative.host : result.host;
    result.hostname = relative.hostname || relative.hostname === '' ? relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === '.' || last === '..') || last === '';

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && srcPath.join('/').substr(-1) !== '/') {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' || srcPath[0] && srcPath[0].charAt(0) === '/';

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' : srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || result.host && srcPath.length;

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function () {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function (root) {

	/** Detect free variables */
	var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
	var freeModule = ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;
	var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
		root = freeGlobal;
	}

	/**
  * The `punycode` object.
  * @name punycode
  * @type Object
  */
	var punycode,


	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647,
	    // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	    tMin = 1,
	    tMax = 26,
	    skew = 38,
	    damp = 700,
	    initialBias = 72,
	    initialN = 128,
	    // 0x80
	delimiter = '-',
	    // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	    regexNonASCII = /[^\x20-\x7E]/,
	    // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
	    // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},


	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	    floor = Math.floor,
	    stringFromCharCode = String.fromCharCode,


	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
  * A generic error utility function.
  * @private
  * @param {String} type The error type.
  * @returns {Error} Throws a `RangeError` with the applicable error message.
  */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
  * A generic `Array#map` utility function.
  * @private
  * @param {Array} array The array to iterate over.
  * @param {Function} callback The function that gets called for every array
  * item.
  * @returns {Array} A new array of values returned by the callback function.
  */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
  * A simple `Array#map`-like wrapper to work with domain name strings or email
  * addresses.
  * @private
  * @param {String} domain The domain name or email address.
  * @param {Function} callback The function that gets called for every
  * character.
  * @returns {Array} A new string of characters returned by the callback
  * function.
  */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
  * Creates an array containing the numeric code points of each Unicode
  * character in the string. While JavaScript uses UCS-2 internally,
  * this function will convert a pair of surrogate halves (each of which
  * UCS-2 exposes as separate characters) into a single code point,
  * matching UTF-16.
  * @see `punycode.ucs2.encode`
  * @see <https://mathiasbynens.be/notes/javascript-encoding>
  * @memberOf punycode.ucs2
  * @name decode
  * @param {String} string The Unicode input string (UCS-2).
  * @returns {Array} The new array of code points.
  */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) {
					// low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
  * Creates a string based on an array of numeric code points.
  * @see `punycode.ucs2.decode`
  * @memberOf punycode.ucs2
  * @name encode
  * @param {Array} codePoints The array of numeric code points.
  * @returns {String} The new Unicode string (UCS-2).
  */
	function ucs2encode(array) {
		return map(array, function (value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
  * Converts a basic code point into a digit/integer.
  * @see `digitToBasic()`
  * @private
  * @param {Number} codePoint The basic numeric code point value.
  * @returns {Number} The numeric value of a basic code point (for use in
  * representing integers) in the range `0` to `base - 1`, or `base` if
  * the code point does not represent a value.
  */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
  * Converts a digit/integer into a basic code point.
  * @see `basicToDigit()`
  * @private
  * @param {Number} digit The numeric value of a basic code point.
  * @returns {Number} The basic code point whose value (when used for
  * representing integers) is `digit`, which needs to be in the range
  * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
  * used; else, the lowercase form is used. The behavior is undefined
  * if `flag` is non-zero and `digit` has no uppercase form.
  */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
  * Bias adaptation function as per section 3.4 of RFC 3492.
  * https://tools.ietf.org/html/rfc3492#section-3.4
  * @private
  */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (; /* no initialization */delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
  * Converts a Punycode string of ASCII-only symbols to a string of Unicode
  * symbols.
  * @memberOf punycode
  * @param {String} input The Punycode string of ASCII-only symbols.
  * @returns {String} The resulting string of Unicode symbols.
  */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,

		/** Cached calculation results */
		baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength;) /* no final expression */{

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base;; /* no condition */k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;
			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);
		}

		return ucs2encode(output);
	}

	/**
  * Converts a string of Unicode symbols (e.g. a domain name label) to a
  * Punycode string of ASCII-only symbols.
  * @memberOf punycode
  * @param {String} input The string of Unicode symbols.
  * @returns {String} The resulting Punycode string of ASCII-only symbols.
  */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],

		/** `inputLength` will hold the number of code points in `input`. */
		inputLength,

		/** Cached calculation results */
		handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base;; /* no condition */k += base) {
						t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;
		}
		return output.join('');
	}

	/**
  * Converts a Punycode string representing a domain name or an email address
  * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
  * it doesn't matter if you call it on a string that has already been
  * converted to Unicode.
  * @memberOf punycode
  * @param {String} input The Punycoded domain name or email address to
  * convert to Unicode.
  * @returns {String} The Unicode representation of the given Punycode
  * string.
  */
	function toUnicode(input) {
		return mapDomain(input, function (string) {
			return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
		});
	}

	/**
  * Converts a Unicode string representing a domain name or an email address to
  * Punycode. Only the non-ASCII parts of the domain name will be converted,
  * i.e. it doesn't matter if you call it with a domain that's already in
  * ASCII.
  * @memberOf punycode
  * @param {String} input The domain name or email address to convert, as a
  * Unicode string.
  * @returns {String} The Punycode representation of the given domain name or
  * email address.
  */
	function toASCII(input) {
		return mapDomain(input, function (string) {
			return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
   * A string representing the current Punycode.js version number.
   * @memberOf punycode
   * @type String
   */
		'version': '1.4.1',
		/**
   * An object of methods to convert from JavaScript's internal character
   * representation (UCS-2) to Unicode code points, and back.
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode
   * @type Object
   */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if ("function" == 'function' && _typeof(__webpack_require__(13)) == 'object' && __webpack_require__(13)) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}
})(undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)(module), __webpack_require__(27)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
  isString: function isString(arg) {
    return typeof arg === 'string';
  },
  isObject: function isObject(arg) {
    return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null;
  },
  isNull: function isNull(arg) {
    return arg === null;
  },
  isNullOrUndefined: function isNullOrUndefined(arg) {
    return arg == null;
  }
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(30);
exports.encode = exports.stringify = __webpack_require__(31);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function (qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr,
        vstr,
        k,
        v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var stringifyPrimitive = function stringifyPrimitive(v) {
  switch (typeof v === 'undefined' ? 'undefined' : _typeof(v)) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function (obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    return map(objectKeys(obj), function (k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function (v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);
  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map(xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function splitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function () {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = i >= 0 ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function (path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function (p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function (path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function () {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function (p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};

// path.relative(from, to)
// posix version
exports.relative = function (from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};

exports.basename = function (path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  return splitPath(path)[3];
};

function filter(xs, f) {
  if (xs.filter) return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
  return str.substr(start, len);
} : function (str, start, len) {
  if (start < 0) start = str.length + start;
  return str.substr(start, len);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./canvasel": 14,
	"./canvasel.js": 14,
	"./comment": 10,
	"./comment.js": 10,
	"./cssstyledeclaration": 9,
	"./cssstyledeclaration.js": 9,
	"./document": 3,
	"./document.js": 3,
	"./domtokenlist": 8,
	"./domtokenlist.js": 8,
	"./element": 5,
	"./element.js": 5,
	"./event": 15,
	"./event.js": 15,
	"./eventtarget": 6,
	"./eventtarget.js": 6,
	"./htmlelement": 4,
	"./htmlelement.js": 4,
	"./localstorage": 16,
	"./localstorage.js": 16,
	"./namednodemap": 7,
	"./namednodemap.js": 7,
	"./node": 0,
	"./node.js": 0,
	"./text": 1,
	"./text.js": 1,
	"./window": 2,
	"./window.js": 2
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 34;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ })
/******/ ]);
});