/**
 * Polyfill for Function.prototype.apply
 * 
 * Definition:
 * Calls a function with a given `this` value and an array of arguments.
 * 
 * How it Works:
 * - Assigns the function to a unique key in the context object.
 * - Calls the function using `context[uniqueKey]` with spread arguments.
 * - Deletes the unique key after execution to prevent modification.
 * 
 * - globalThis is a built-in global object introduced in ES2020. 
 *   It provides a standard way to access the global object across 
 *   all JavaScript environments (browsers, Node.js, etc.).
 * 
 * - Symbol() is a built-in primitive data type introduced in ES6. 
 *   It is used to create unique and immutable values that can be used as object property keys.
 * 
 * Example Usage:
 * function greet(message, punctuation) {
 *     console.log(`Hello ${this.name}, ${message}${punctuation}`);
 * }
 * 
 * const user = { name: 'Indira' };
 * 
 * // Call greet with `user` as `this` and pass arguments as an array
 * greet.myApply(user, ['Good Morning', '!']);
 * // Output: "Hello Indira, Good Morning!"
 */



Function.prototype.myApply = function(context, argArray) {
    context = context || globalThis;
    const uniqueKey = Symbol();
    context[uniqueKey] = this;
    const result = context[uniqueKey](...(argArray || []));
    delete context[uniqueKey];
    return result;
}