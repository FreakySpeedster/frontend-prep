// Implementing Array.prototype.map method
// The map method creates a new array by applying a callback function to each element 
// of the original array. It does not modify the original array but returns a transformed 
// version based on the callback's return value for each element.

Array.prototype.myMap = (callbackFn) => {
    if (typeof(callbackFn) !== 'function') {
        throw new Error ("Argument passed in is not a function");
    }
    let array = this;

    if (array.length === 0) {
        throw new Error ("Array is empty");
    }

    let resultArray = [];
    for(let i=0; i<array.length; i++) {
        let result = callbackFn(array[i], i, array);
        resultArray.push(result);
    }
    return resultArray;
}