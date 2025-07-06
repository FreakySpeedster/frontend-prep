// Call

Function.prototype.myCall = function(context, args) {
    context = context || globalThis;
    let uniqueKey = Symbol();
    context[uniqueKey] = this;
    let result = context[uniqueKey](args);
    delete context[uniqueKey];
    return result;

}
greet.myCall(nameObject, 'How are you?');
const nameObject = {name: 'Sridhar'};

function greet(message) {
    console.log(`Hello ${this.name}, ${message}`);
}


// Apply

Function.prototype.myApply = function (context, argArray) {
    context = context || globalThis;
    let uniqueKey = Symbol();
    context[uniqueKey] = this;
    let result = context[uniqueKey]([...argArray] || []);
    delete context[uniqueKey];
    return result;
}
function greet2(message, punctuation) {
    console.log(`${this.name}, ${message} ${punctuation}`);
}
let nameObject2 = {name: 'Sridhar'};
greet2.myApply(nameObject, ['Hello', 'How are you?'])


//Bind

Function.prototype.myBind = function (context, ...initialArgs) {
    context = context || globalThis;
    const originalFunction = this;
    
    return function(...args) {
        const uniqueKey = Symbol();
        context[uniqueKey] = originalFunction;
        const result = context[uniqueKey](...initialArgs, ...args);
        delete context[uniqueKey];
        return result;
    }
}

// Filter
Array.prototype.myFilter = function (callbackFn) {
    if (typeof(callbackFn) !== 'function') {
        throw new Error('Not a valid function');
    }
    let arrayList = this;
    if (!Array.isArray(arrayList)) {
        throw new Error('Not an array');
    }
    let resultArray = []
    for (let i=0; i<arrayList.length; i++) {
        let output = callbackFn(arrayList[i], i, arrayList);
        if (output) {
            resultArray.push(arrayList[i]);
        }
    }
    return resultArray;
}

// Map
Array.prorotype.myMap = function (callbackFn) {
    if (typeof(callbackFn) !== 'function') {
        throw new Error('Not a valid function');
    }
    let arrayList = this;
    if (!Array.isArray(arrayList)) {
        throw new Error('Not an array');
    }
    let resultArray = [];
    for (i=0; i<arrayList.length; i++) {
        resultArray.push( callbackFn(arrayList[i], i, arrayList) );
    }
    return resultArray;
}

// Reduce
Array.prototype.myReduce = function(callbackFn, initialValue) {
    if (typeof(callbackFn) !== 'function') {
        throw new Error('Not a valid function');
    }
    let arrayList = this;
    if (!Array.isArray(arrayList)) {
        throw new Error('Not an array');
    }

    let firstIndex, accumulator;
    if (initialValue) {
        accumulator = initialValue;
        firstIndex = 0;
    } else {
        accumulator = arrayList[0]
        firstIndex = 1;
    }

    for (let i = firstIndex; i < arrayList.length ; i++) {
        accumulator = callbackFn(accumulator, arrayList[i], i, arrayList);
    }
    return accumulator;
}

// Flatten Array
function flattenArray(inputArray) {
    let resultArray = [];
    inputArray.forEach((item) => {
        if (Array.isArray(item)) {
            resultArray.push(...flattenArray(item));
        } else {
            resultArray.push(item);
        }
    });
    return resultArray;
}

flattenArray([[1, 2], [[1,2,3], [1,2,3,[1,2]]]]);


// Debounce
function debounce(callbackFn, waitTime) {
    let timer;
    return function(args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callbackFn(args);
        }, waitTime)
    }
}

// Throttle
function throttle(callbackFn, threshold) {
    let lastExecutionTime = 0;
    return function(args) {
        let currentTime = Date.now();
        if (currentTime - lastExecutionTime > threshold) {
            callbackFn(args);
            lastExecutionTime = currentTime;
        }
    }
}

// Promise All
function promiseAll(promiseArray) {
    return new Promise((resolve, reject) => {
        if (promiseArray.length === 0) {
            resolve([]);
        }
        let completion = 0;
        let resultArray = [];
        promiseArray.forEach((promiseItem, index) => {
            Promise.resolve(promiseItem).then((result) => {
                if (result) {
                    resultArray.push(result);
                    completion++;
                }
                if (completion === promiseArray.length) {
                    resolve(resultArray);
                }
            }).catch((error) => {
                reject(error);
            })
        })
    })
}

// Promise Any
function promiseAny(promiseArray) {
    return new Promise((resolve, reject) => {
        if (promiseArray.length === 0) {
            reject([]);
        }
        let rejections = 0;
        let resultArray = [];
        promiseArray.forEach((promiseItem, index) => {
            Promise.resolve(promiseItem).then((result) => {
                resolve(result);
            }).catch((error) => {
                resultArray[index] = error;
                rejections++;
                if (rejections === promiseArray.length) {
                    reject(resultArray);
                }
            })
        })
    })
}

// Flatten Object
function flattenObject(obj) {
    let result = {};
    
    for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            // If it's an object, recursively flatten it
            let flattened = flattenObject(obj[key]);
            for (let nestedKey in flattened) {
                result[nestedKey] = flattened[nestedKey];
            }
        } else {
            // If it's not an object, add it directly
            result[key] = obj[key];
        }
    }
    
    return result;
}

// Example usage:
const nestedObject = {
    name: 'John',
    address: {
        street: '123 Main St',
        city: 'New York',
        country: {
            name: 'USA',
            code: 'US'
        }
    },
    hobbies: ['reading', 'coding']
};

console.log(flattenObject(nestedObject));
// Output: {
//   name: 'John',
//   street: '123 Main St',
//   city: 'New York',
//   name: 'USA',
//   code: 'US',
//   hobbies: ['reading', 'coding']
// }


// Real world coding problems
import "./styles.css";
import { useState, useEffect, useRef } from "react";
import useDebounce from "./useDebounce";

export default function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [debouncedInput] = useDebounce(input, 500);
  const resultRef = useRef({});

  const onInputChange = (e) => {
    setInput(e.target.value);
  };
  useEffect(() => {
    if (resultRef.current[debouncedInput]) {
      setResults(resultRef.current[debouncedInput]);
    } else {
      fetch(`https://dummyjson.com/products/search?q=${debouncedInput}`)
        .then((res) => res.json())
        .then((filteredResults) => {
          setResults(filteredResults.products);
          resultRef.current[debouncedInput] = filteredResults.products;
        })
        .catch((errors) => {
          console.error("Something went wrong");
        });

    }
  }, [debouncedInput]);
  return (
    <>
      <input onChange={onInputChange} value={input} />
      {results && results.map((product) => <div>{product.title}</div>)}
    </>
  );
}

import { useState, useEffect } from "react";

export default function useDebounce(input, wait) {
  const [debouncedInput, setDebouncedInput] = useState(input);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input);
    }, wait);
    return () => clearTimeout(timer);
  }, [wait, input]);

  return [debouncedInput];
}


export default function usePrevious(input) {
    const previousValue = useRef();
    
    useEffect(() => {
        previousValue.current = input;
    }, [input]);

    return previousValue.current;
}