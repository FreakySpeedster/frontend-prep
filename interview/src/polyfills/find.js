Array.prototype.myFind = function (callbackFn) {
    let array = this;
    if (array.length === 0) {
        throw new Error('Not an array');
    }
    if (typeof callbackFn !== 'function') {
        throw new Error('Not a valid function');
    }
    let isConditionMatching, foundElement;
    for (let i=0; i< array.length; i++) {
        isConditionMatching = callbackFn(array[i]);
        if (isConditionMatching) {
            foundElement = array[i];
        }
        break;
    }
    return foundElement;
}

const findIt = ['hello', 'vanakkam', 'namaste'].myFind(ele => ele === 'hello');
console.log(findIt);