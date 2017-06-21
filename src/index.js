import Soda from './soda';
import { assign } from './util';

import './directive/repeat'
import './directive/if'
import './directive/class'
import './directive/html'
import './directive/replace'
import './directive/style'
import './directive/include'


let sodaInstance = new Soda();

let init = function(str, data){
    return sodaInstance.run(str, data);
};

let mock = {
    prefix(prefix){
        sodaInstance.prefix(prefix);
    },

    filter(name, func){
        Soda.filter(name, func);
    },

    directive(name, opt){
        Soda.directive(name, opt);
    },

    setDocument(document){
        sodaInstance.setDocument(document);
    },

    discribe(name, str){
        Soda.discribe(name, str);
    },

    Soda
};

let soda = assign(init, mock);

module.exports = soda;
