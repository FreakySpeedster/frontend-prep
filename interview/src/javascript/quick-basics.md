
# 💻 Frontend Developer – Basic Technical Cheat Sheet

---

## ✅ JavaScript Core

### `var`, `let`, `const`
- `var`: function-scoped, hoisted
- `let`/`const`: block-scoped
- `const`: cannot be reassigned

### Closures
- An inner function can access outer function’s variables even after the outer function has returned

```js
function outer() {
  let x = 10;
  return function inner() {
    return x;
  };
}
const fn = outer();
console.log(fn()); // 10
```

### Hoisting
- Declarations are moved to the top of their scope
- `var` is hoisted and initialized as `undefined`
- `let`/`const` are hoisted but not initialized

### `this` keyword
- In regular functions, `this` refers to the calling object
- In arrow functions, `this` is lexically scoped (inherits from parent scope)

### Event Loop (High-level)
- JS is single-threaded
- Handles async tasks using:
  - CallStack
  - WebAPIs
  - Callback queue (`setTimeout`, `setInterval`)
  - Microtask queue (Promises, `async/await`)

---

## 📚 Array & Object Methods

### Common Array Methods
```js
// map
[1, 2, 3].map(x => x * 2); // [2, 4, 6]

// filter
[1, 2, 3].filter(x => x > 1); // [2, 3]

// reduce
[1, 2, 3].reduce((acc, val) => acc + val, 0); // 6

// forEach
[1, 2, 3].forEach(x => console.log(x)); // prints 1 2 3
```

### Cloning Objects
- Shallow clone: `Object.assign({}, obj)` or `{...obj}`
- Deep clone: `JSON.parse(JSON.stringify(obj))` (only works for simple objects)

---

## 💎 ES6+ Features

### Arrow Functions
```js
const add = (a, b) => a + b;
```

### Spread / Rest
```js
const arr1 = [1, 2];
const arr2 = [...arr1, 3]; // [1, 2, 3]

function sum(...nums) {
  return nums.reduce((a, b) => a + b);
}
```

### Destructuring
```js
const user = { name: 'Sridhar', age: 25 };
const { name, age } = user;
```

### Template Literals
```js
const name = 'Sridhar';
console.log(`Hello, ${name}`); // Hello, Sridhar
```

---

## 🎨 HTML/CSS Basics

### Box Model
- Content → Padding → Border → Margin

### Positioning
- `static`, `relative`, `absolute`, `fixed`, `sticky`

### Flexbox (Basics)
```css
display: flex;
justify-content: center;
align-items: center;
```

---

## 🧠 Quick Code Practice

### Find Duplicates in Array
```js
function findDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) !== index);
}
```

### Reverse a String
```js
function reverseStr(str) {
  return str.split('').reverse().join('');
}
```

---

## 🎯 Mock Interview Questions (Basic Round)

### JavaScript
1. What is the difference between `==` and `===`?
2. Explain how closures work in JavaScript.
3. What does `this` refer to inside an arrow function?
4. Write a function to reverse a string.
5. What are the differences between `map`, `forEach`, and `filter`?

### DOM / Browser
6. What is the DOM?
7. How would you add a click event to a button in vanilla JS?
8. What's the difference between `localStorage` and `sessionStorage`?
9. Explain event bubbling vs capturing.

### CSS/HTML
10. What is the box model in CSS?
11. How would you center a div vertically and horizontally?
12. Difference between inline, block, and inline-block elements?

### ES6 / Advanced
13. What are template literals?
14. What does the spread operator do? How is it different from rest?
15. Explain how Promises work. Difference between `.then()` and `async/await`?
