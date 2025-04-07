/**
 * Polyfill for Function.prototype.bind
 * 
 * Definition:
 * Creates a new function that, when called, has its `this` value set to the provided context,
 * and allows partial application of arguments.
 * 
 * How it Works:
 * - Stores the original function in a variable.
 * - Returns a new function that calls the original function using `call()`, preserving `this`.
 * - Supports additional arguments when calling the bound function.
 * 
 * Example Usage:
 * function greet(message) {
 *     console.log(`Hello ${this.name}, Here's your message: ${message}`);
 * }
 * 
 * const user = { name: 'Indira' };
 * 
 * // Create a bound function with `user` as `this` and partially apply 'H3LLOOO'
 * const boundGreet = greet.myBind(user, 'H3LLOOO');
 * 
 * boundGreet(); 
 * // Output: "Hello Indira, Here's your message: H3LLOOO"
 */


Function.prototype.myBind = function (context, ...args) {
    context = context || globalThis;
    const ogFunction = this;
    return function(...newArgs) {
        return ogFunction.call(context, ...args, ...newArgs)
    }
}