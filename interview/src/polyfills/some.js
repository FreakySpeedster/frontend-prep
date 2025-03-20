Array.prototype.mySome = function (callbackFn) {
    let array = this;
    if (array.length === 0) {
        throw new Error('Not an array');
    }
    if (typeof(callbackFn) !== 'function') {
        throw new Error('Not a function');
    }
    let result = false;
    for (let i=0; i<array.length; i++) {
        if(callbackFn(array[i])) {
            result = true;
            break;
        }
    }
    return result;
}