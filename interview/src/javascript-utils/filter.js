// Implementing Array.prototype.filter method
// The filter method creates a new array containing only the elements that satisfy 
// the condition defined in the callback function. It iterates through the original 
// array and includes elements for which the callback returns true, leaving the rest out.


Array.prototype.myFilter = (callbackFn) => {
    if (typeof(callbackFn) !== 'function') {
        throw new Error ("Argument passed in is not a function");
    }
    let array = this;

    if (array.length === 0) {
        throw new Error ("Array is empty");
    }

    let filteredArray = [];
    for(let i=0; i<array.length; i++) {
        let result = callbackFn(array[i], i, array);
        if(result) {
            filteredArray.push(result);
        }
    }
    return filteredArray;
}