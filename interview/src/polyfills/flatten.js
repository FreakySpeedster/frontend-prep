const myFlatten = ((inputArray) => {
    let resultArray = [];
    const recursiveFlatten = (items) => {
        items.forEach((item) => {
            if (Array.isArray(item)) {
                resultArray.push(...recursiveFlatten(item));
            } else {
                resultArray.push(item);
            }
        });
        return resultArray;
    }
    return recursiveFlatten(inputArray); 
});

myFlatten([1, 2, [1, 2], ['a', 'b', 'c'], [1, [2, 3, [4, 5]]]]);