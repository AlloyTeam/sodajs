import Sodajs from './sodajs';
import { assign } from './util';

import './directive/repeat'
import './directive/if'
import './directive/class'
import './directive/html'
import './directive/replace'


let sodaInstance = new Sodajs();

let init = function(str, data){
    return sodaInstance.run(str, data);
};

let mock = {
    prefix(prefix){
        sodaInstance.prefix(prefix);
    },

    filter(name, func){
        Sodajs.filter(name, func);
    },

    directive(name, opt){
        Sodajs.directive(name, opt);
    }
};

let soda = assign(init, mock);

module.exports = soda;
