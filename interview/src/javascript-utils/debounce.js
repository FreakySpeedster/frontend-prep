// Implementing a debounce function
// This function returns a debounced version of the given callback function, ensuring 
// that it executes only after a specified delay (`wait`) has passed since the last call.

// Explanation:
// 1. We use a closure to maintain `timer` across multiple calls.
// 2. `clearTimeout(timer)` ensures that the previous timer is cleared before starting a new one.
// 3. `setTimeout` delays the execution of `callbackFn` until `wait` milliseconds have passed without another call.
// 4. The function returned from `myDebounce` should be used as the debounced version of `callbackFn`, ensuring the logic works properly.
// 5. `.apply(this, args)` ensures the function executes with the correct `this` context and arguments.


function myDebounce(callbackFn, wait) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callbackFn.apply(this, ...args)
        }, wait);
    }
}

export default myDebounce;