/**
 * Polyfill for Function.prototype.call
 *
 * This method allows you to invoke a function with a specified `this` context
 * and pass arguments individually.
 *
 * How it works:
 * 1. If no context is provided, `globalThis` is used as the default.
 * 2. A unique key (Symbol) is created to temporarily assign the function to the context object.
 * 3. The function is executed using the provided arguments.
 * 4. The temporary key is deleted to restore the original object state.
 *
 * @param {Object} context - The object to be used as `this` inside the function.
 * @param {...any} args - Arguments to be passed to the function.
 * @returns {*} - The result of the function execution.
 *
 * Example Usage:
 * ```js
 * function greet(message) {
 *   console.log(`${message}, ${this.name}`);
 * }
 *
 * const user = { name: 'Indira' };
 *
 * // Call the function with 'user' as `this` and pass arguments individually
 * greet.myCall(user, 'Hello'); // Output: "Hello, Indira"
 * ```
 */

Function.prototype.myCall = function (context, ...args) {
    // Step 1: Handle null or undefined context by assigning globalThis
    context = context || globalThis;
  
    // Step 2: Create a unique property key to avoid conflicts
    const uniqueKey = Symbol();
  
    // Step 3: Assign the function to this key on the context object
    context[uniqueKey] = this; // `this` refers to the function being called
  
    // Step 4: Call the function using the context and pass the arguments
    const result = context[uniqueKey](...args);
  
    // Step 5: Cleanup - Remove the temporary function reference
    delete context[uniqueKey];
  
    // Step 6: Return the result of function execution
    return result;
  };