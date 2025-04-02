// 1. Write a function that reverses a string.
// Condition: without using reverse
// with reverse:     return inputString.split('').reverse().join('');

function reverse(inputString) {
    let inputArray = inputString.split('');
    let outputArray = []
    for (let i=inputArray.length - 1; i>=0; i--) {
        outputArray.push(inputArray[i]);
    }
    return outputArray.join('');
}

// 2. Find the Largest Sum of Non-Adjacent Numbers
// Problem: Given an array of integers, find the largest sum of non-adjacent numbers. 
// Numbers can be 0 or negative.

// Example: [2, 4, 6, 2, 5] → 11 (2 + 6 + 5)

function largestSumOfNonAdjacentNums(numberArray) {
    function getSum(numberArray, initialIndex, jumpIndex) {
        let newResult = 0;
        for (let i=initialIndex; i<=numberArray.length; i+=jumpIndex) {
            newResult += numberArray[i];
        }
        return newResult;
    }
    let evenIndexSum = getSum(numberArray, 0, 2);
    let oddIndexSum = getSum(numberArray, 1, 2);
    return evenIndexSum > oddIndexSum ? evenIndexSum : oddIndexSum;
}

// 3. Check if a String is a Palindrome
// Problem: Write a function to check if a string is a palindrome (reads the same forwards and backwards).

// Example: isPalindrome("racecar") → true

function checkPalindrome(inputString) {
    let inputArray = inputString.split('');
    let reversedArray = [...inputArray].reverse();
    return inputArray.join('') === reversedArray.join('');
}

// 4. Find the Intersection of Two Arrays
// Problem: Given two arrays, find the common elements between them.

// Example: [1, 2, 3, 4] and [3, 4, 5, 6] → [3, 4]

function checkCommonElements(arrayOne, arrayTwo) {
    return arrayOne.filter((ele) => {
        for (let i=0; i< arrayTwo.length; i++) {
            if (ele === arrayTwo[i]) {
                return true;  // If a match is found, include the element in the result
            }
        }
        return false;
    });
}

function checkCommonElements2(arrayOne, arrayTwo) {
    return arrayOne.filter((ele) => {
        if (arrayTwo.includes(ele)) {
            return true;
        }
        return false;
    });
}

// 5. Flatten a Nested Array

function flatten(inputArray) {
    if (inputArray.length === 0) {
        return [];
    }
    let result = []
    inputArray.forEach((ele) => {
        if (Array.isArray(ele)) {
            result = [...result, ...flatten(ele)]
        } else {
            result = [...result, ele];
        }
    });
    return result;
}

function flattenWithDepth(inputArray, depth=1) {
    if (depth === 0) {
        return inputArray.slice();
    }
    let result = [];
    inputArray.forEach((ele) => {
        if (Array.isArray(ele)) {
            result = result.concat(flatten(ele, depth - 1));
        } else {
            result = result.push(ele);
        }

    });
    return result;
}

// 6. Find the Missing Number in an Array
// Problem: Given an array of n-1 numbers from 1 to n, find the missing number.

// Example: findMissingNumber([1, 2, 4, 5]) → 3

function findMissingNumber(inputArray) {
    let sortedArray = inputArray.sort((a,b) => a-b);
    let startNumber = 1;
    for (let num of sortedArray) {
        if (num === startNumber) {
            startNumber++;
        } else {
            return startNumber;
        }
    }
    return startNumber;
}

// 7. Longest Substring Without Repeating Characters
// Problem: Write a function to find the length of the longest substring without repeating characters.

// Example: longestSubstring("abcabcbb") → 3 (substring: "abc")

function longestSubstring(inputString) {
    
}

// 8. Two Sum
// Problem: Given an array of integers and a target number, find two numbers such that their sum is equal to the target.

// Example: twoSum([2, 7, 11, 15], 9) → [0, 1] (because 2 + 7 = 9)
function twoSum(inputArray, target) {
    let number1 = 0;
    for(let i=0; i< inputArray.length; i++) {
        number1 = target - inputArray[i];
        if (inputArray.includes(number1)) {
            return [number1, inputArray[i]];
        }
    }
    return null;
}



// 9. Merge Two Sorted Arrays
// Problem: Given two sorted arrays, merge them into one sorted array.

// Example: [1, 3, 5] and [2, 4, 6] → [1, 2, 3, 4, 5, 6]
function mergeTwoSortedArrays(arrayOne, arrayTwo) {
    return arrayOne.concat(arrayTwo).sort((a,b) => a-b);
}



// 10. Find the First Non-Repeating Character
// Problem: Write a function to find the first non-repeating character in a string.

// Example: firstNonRepeating("swiss") → 'w'

function firstNonRepeatingChar(inputString) {
    let map = {};
    for (let i=0; i< inputString.length; i++) {
        if (map[inputString[i]]) {
            map[inputString[i]] += 1;
        } else {
            map[inputString[i]] = 1
        }
    }
    for (let j=0; j<inputString.length; j++) {
        if (map[inputString[j]] === 1) {
            return inputString[j];
        }
    }
}

/*
Summary of the loops:
for: Traditional loop for a known range of values.
for...in: Iterates over the keys of an object.
for...of: Iterates over the values of an iterable.
forEach: Iterates over array elements with a callback function.
while: Loops as long as a condition is true.
do...while: Loops at least once, then checks the condition.
for await...of: Loops over asynchronous iterables.
*/