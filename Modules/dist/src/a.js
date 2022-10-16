//Normal export
export const aString = 'Welcome to Typescript';
//Block statement export
const xString = 'Welcome to Typescript 2';
const zString = 'Welcome to Typescript 3';
export { zString, xString as yString };
export const fn = () => { };
export { message } from './re-export';
export default 'default';
