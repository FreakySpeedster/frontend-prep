// Implementing Array.prototype.reduce method
// The reduce method executes a reducer function on each element of the array, 
// accumulating a single return value. It takes a callback function and an optional 
// initial value as arguments. The callback receives the accumulator, current element, 
// current index, and the original array.


Array.prototype.myReduce = function (callbackFn, initialValue) {
    if (typeof(callbackFn) !== 'function') {
        throw new Error ("Argument passed in is not a function");
    }
    let array = this;
    if (array.length === 0) {
        throw new Error ("Array is empty");
    }

    let accumulator;
    let firstIndex = 0;
    if (initialValue) { 
        accumulator = initialValue;
    } else {
        accumulator = array[0];
        firstIndex = 1;
    }

    for(let i=firstIndex; i<array.length; i++) {
        accumulator = callbackFn(accumulator, array[i], i, array);
    }
    return accumulator;
}