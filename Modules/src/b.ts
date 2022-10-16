//Import one by one or concatenated by commas
// import { aString as theString } from "./a";
//Import all 
import * as strings from './a';

console.log(strings.aString)

//Import from path you need to uncomment or in the file tsconfig.json set the property moduleResolution to node 
import {reverse, isOdd } from './utils';

console.log(reverse('test'), isOdd(1));

//To import default exports, you onle need put the identifier
import customStringName from './a';
console.log(customStringName);

//Import with condition with target equal to ESNext
if(Math.random() >= 0.5){
    import('./a').then(a => console.log('the message is:', a.aString));
}

// import * as config from './config.json';
// console.log(config.userSetting1);

import { cube } from 'cube';
cube(5);

//this overload the declaration file
declare module 'cube'{
    export function cube():string;
}
cube();

import $ from 'jquery';

declare global {
    interface JQuery {
        debug(): JQuery;
    }
}

$(document).ready(() => console.log('jQuery'));

$().debug = function(){
   console.debug($(this));
   return $(this);
}

import { especial } from 'deep/x';

console.log(especial);