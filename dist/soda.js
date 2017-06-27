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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = __webpack_require__(1);

var _util = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _soda = __webpack_require__(0);

var _soda2 = _interopRequireDefault(_soda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
        el.innerHTML = '';
    }
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _soda = __webpack_require__(0);

var _soda2 = _interopRequireDefault(_soda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _soda = __webpack_require__(0);

var _soda2 = _interopRequireDefault(_soda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _soda = __webpack_require__(0);

var _soda2 = _interopRequireDefault(_soda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _soda = __webpack_require__(0);

var _soda2 = _interopRequireDefault(_soda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _soda = __webpack_require__(0);

var _soda2 = _interopRequireDefault(_soda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _soda = __webpack_require__(0);

var _soda2 = _interopRequireDefault(_soda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

/***/ })
/******/ ]);
});