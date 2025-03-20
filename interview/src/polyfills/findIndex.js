Array.prototype.myFindIndex = function (callbackFn) {
    let array = this;
    if (array.length === 0) {
        throw new Error('Not an array');
    }
    if (typeof(callbackFn) !== 'function') {
        throw new Error ('Not a valid function');
    }
    let resultIndex;
    for (let i=0; i < array.length; i++) {
        if(callbackFn(array[i])) {
            resultIndex = i;
            break;
        }
    }
    return resultIndex;
}

const findIt = ['hello', 'vanakkam', 'namaste'].myFindIndex(ele => ele === 'hello');
console.log(findIt);