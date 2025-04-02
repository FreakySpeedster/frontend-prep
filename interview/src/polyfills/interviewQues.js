// Quick Problem Solving questions

Function.prototype.myBind = (context, ...args) => {
    context = context || globalThis;
    const ogFunction = this;
    return function (...newArgs) {
        ogFunction.call(context, ...args, ...newArgs);
    }
}

Function.prototype.myCall = function (context, ...args) {
    context = context || globalThis;
    const uniqueKey = Symbol();
    context[uniqueKey] = this;
    let result = context[uniqueKey](...args);
    delete context[uniqueKey];
    return result;
}

Function.prototype.myApply = function (context, arrayOfArgs) {
    context = context || globalThis;
    const uniqueKey = Symbol();
    context[uniqueKey] = this;
    let result = context[uniqueKey](...(arrayOfArgs || []));
    delete context[uniqueKey];
    return result;
}


// Usage
function greet(message) {
    console.log(`Hello ${this.name}, Message for you: ${message}`);
}
const user = {name: 'Sridhar'};

// Bind
const boundGreet = greet.bind(user, 'This is interview');
boundGreet();

// Call
greet.call(user, 'This is interview');

// Apply
greet.apply(user, ['This is a message']);



// Implement debounce
function debounce(callbackFn, wait) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callbackFn(...args);
        }, wait);
    }
}

// Implement Throttle
function throttle(callbackFn, wait) {
    let lastExecutionTime = 0;
    return function (...args) {
        let currentTime = Date.now();
        if (currentTime - lastExecutionTime > wait) {
            callbackFn(...args);
            lastExecutionTime = currentTime;
        }
    }
}

function PromiseAll(promiseArray) {
    return new Promise((resolve, reject) => {
        if (promiseArray.length === 0) {
            resolve([]);
        }
        let results = [];
        let counter = 0;
        promiseArray.forEach((item, index) => {
            Promise.resolve(item).then((value) => {
                results[index] = value;
                counter ++;
                if (counter === promiseArray.length) {
                    resolve(results);
                }
            }).catch((error) => {
                reject(error);
            })
        });
    })
}

Array.prototype.myReduce = function (callbackFn, initialValue) {
    if (typeof(callbackFn) !== 'function') {
        throw new Error('Not a valid function');
    }
    let array = this;
    if (array.length === 0) {
        throw new Error ("Array is empty");
    }
    let initialIndex;
    let accumulator
    if (initialValue) {
        initialIndex = 0;
        accumulator = initialValue;
    } else {
        initialIndex = 1;
        accumulator = array[0];
    }
    for (let i = initialIndex; i< array.length; i++) {
        accumulator = callbackFn(accumulator, array[i], i, array);
    }
    return accumulator;

}

function myFlat(inputArray) {
    if (inputArray.length === 0) {
    	throw new Error('Array is empty');
    }
    let resultArray = [];
    inputArray.forEach((item) => {
      if (Array.isArray(item)) {
        resultArray = [...resultArray, ...myFlat(item)];
      } else {
        resultArray = [...resultArray, item];
      }
    });
    return resultArray;

}

const result = myFlat([1,2,[1,2,[1,2]]]);
console.log(result);


