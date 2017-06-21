import {CONST_PRIFIX} from "./const";
export let getAttrVarKey = function() {
    return CONST_PRIFIX + ~~(Math.random() * 1E6);
};

export let getRandom = function() {
    return "$$" + ~~(Math.random() * 1E6);
};

export let exist = function(value){
    return value !== null && value !== undefined && value !== "" && typeof value !== 'undefined';
};

export let nodes2Arr = function(nodes) {
    var arr = [];

    for (var i = 0; i < nodes.length; i++) {
        arr.push(nodes[i]);
    }

    return arr;
};

let getOwnPropertySymbols = Object.getOwnPropertySymbols;
let hasOwnProperty = Object.prototype.hasOwnProperty;
let propIsEnumerable = Object.prototype.propertyIsEnumerable;

let toObject = function(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}


export let assign = Object.assign || function (target, source) {
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
    
