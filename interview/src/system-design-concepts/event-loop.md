# Sources to understand visually
https://www.lydiahallie.com/blog/event-loop
https://youtu.be/eiC58R16hb8
https://www.jsv9000.app/

# 🧠 Full Understanding Before Diving into the Event Loop  
## 🔍 Understanding the Browser, JavaScript Engine, and JavaScript Runtime

Read and learn by looking at this diagram:
https://excalidraw.com/#json=IzeJaccBgJft9Rk4_mIOb,2Bj1urjIuJxnARZkDVIpGA
---

## 1. 🌐 **Browser**
The browser (e.g., Chrome, Firefox, Safari) is the full application that loads and runs web pages. It consists of multiple subsystems:

- **HTML Parser** – Parses your HTML into a DOM tree.
- **CSS Engine** – Parses stylesheets and computes styles.
- **Rendering Engine** (e.g., Blink in Chrome) – Paints pixels to the screen.
- **JavaScript Engine** (e.g., V8) – Parses and runs your JS.
- **JavaScript Runtime** – Provides the environment in which JS can interact with things like `setTimeout`, `fetch`, the DOM, etc.

✅ The browser provides the **host environment** that powers all this.

---

## 2. ⚙️ **JavaScript Engine**
This is just the part of the browser responsible for understanding and running **pure JavaScript code**.

- **Example**: V8 (Chrome), SpiderMonkey (Firefox)
- The engine:
  - Parses your JS into an abstract syntax tree (AST)
  - Compiles it using **Just-In-Time (JIT)** compilation
  - Optimizes and executes the bytecode

❗ It **does NOT** understand browser-specific features like:
- `setTimeout`
- DOM (`document.querySelector`)
- `fetch`
- Event listeners

The engine just knows:
- Functions, variables, scopes
- Objects, closures, Promises
- Control flow, math, logic

---

## 3. 🌍 **JavaScript Runtime Environment**
The JavaScript runtime environment is crucial for executing JavaScript code within the browser. While the JavaScript engine (like V8) is responsible for parsing and executing the JavaScript code itself, the runtime environment provides all the necessary surrounding infrastructure and APIs that allow JavaScript to interact with the browser and the outside world.

It includes:

| Component                | Role                                      |
|--------------------------|-------------------------------------------|
| **JavaScript Engine (V8)** | Runs your JS code                        |
| **Web APIs**             | Timer (`setTimeout`), `fetch`, DOM, etc. |
| **Callback Queue**       | Stores callbacks from async tasks         |
| **Event Loop**           | Coordinates when callbacks are executed   |

So when you run code in a browser, you're running it inside this **JavaScript Runtime**, not just the JS engine.

---

## 🔁 How Everything Works Together

Here's an example to walk through the entire flow:

```js
console.log("1");

setTimeout(() => console.log("2"), 1000);

console.log("3");
```

### ✅ Step-by-step Breakdown:

1. **Synchronous code starts**  
   JS engine runs `console.log("1")` → prints `1`

2. **Encounter `setTimeout()`**  
   - The JS engine says: "I don't know what `setTimeout` is."
   - So it delegates this to the **Web API** in the browser
   - Browser starts a timer (in parallel, not blocking JS)

3. **Next sync line runs**  
   JS engine runs `console.log("3")` → prints `3`

4. **Timer expires (after ~1000ms)**  
   Browser moves the callback into the **Callback Queue**

5. **Event Loop kicks in**  
   - It checks: "Is the JS call stack empty?"
   - If yes, it pushes the callback into the **call stack**

6. **JS Engine runs the callback**  
   `console.log("2")` is executed → prints `2`

---

## 🧩 Text-Based Summary Diagram

```
Browser
│
├── JavaScript Runtime
│   ├── JavaScript Engine (V8)
│   ├── Web APIs (DOM, timers, fetch, etc.)
│   ├── Callback Queue (aka Task Queue)
│   └── Event Loop
│
└── Rendering Engine (HTML/CSS/UI updates)
```

---

## 💡 In Simple Words:
- **JS Engine (V8)**: Executes JS line-by-line but doesn't know anything about the browser.
- **Web APIs**: Provided by the browser to interact with the outside world (DOM, timers, etc).
- **Runtime**: Combines the engine + Web APIs + Event Loop to form the full environment JS runs in.
- **Event Loop**: Manages when async callbacks get pushed into the engine for execution.

---



# 🌀 In-Depth Explanation of the JavaScript Event Loop

## What is the Event Loop?

The **event loop** is a mechanism that allows **non-blocking**, **asynchronous** behavior in JavaScript — even though JavaScript is **single-threaded**.

It acts as a **manager** that decides **what gets executed next**.

---

## 📦 The Big Picture

There are 4 main players in the event loop system:

1. **Call Stack**  
2. **Web APIs**  
3. **Callback Queue (Task Queue / Macro Task Queue)**  
4. **Event Loop**  

---

## ⚙️ How It Works – Step-by-Step

Example:

```js
console.log("Start");

setTimeout(() => {
  console.log("Inside timeout");
}, 1000);

console.log("End");
```

### Step-by-step:

1. **Call Stack Executes Synchronous Code**
   - `console.log("Start")` → prints `Start`
   - `setTimeout(...)` → async → sent to Web APIs
   - `console.log("End")` → prints `End`

2. **Web API Handles Timer**
   - Waits for 1000ms, then sends the callback to the **Callback Queue**

3. **Event Loop**
   - Checks if the **Call Stack is empty**
   - If yes → pulls from Callback Queue → pushes to Call Stack

4. **Callback Runs**
   - `console.log("Inside timeout")` → prints it

---

## 🕐 Task Types

### Macro-tasks:
- `setTimeout`
- `setInterval`
- `fetch`
- DOM events
- `setImmediate` (Node.js)

> Stored in **Callback Queue**

### Micro-tasks:
- `Promise.then`
- `Promise.catch`
- `Promise.finally`
- `MutationObserver`

> Stored in the **Microtask Queue**, and **executed before the Callback Queue**, **after each task**.

---

## 🔥 Example with Promises vs setTimeout

```js
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");
```

**Output:**
```
1
4
3
2
```

**Explanation:**
- `1` and `4` = synchronous
- `3` = microtask → runs after sync code
- `2` = macro-task → runs after microtasks

---

## 📌 Summary

| Term             | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| Call Stack       | Executes function calls one by one                                          |
| Web APIs         | Browser handles async tasks (e.g., `setTimeout`, `fetch`, DOM Events)       |
| Callback Queue   | Queues macro-tasks to be run after stack is empty                           |
| Microtask Queue  | Queues promises, runs before macro-tasks                                    |
| Event Loop       | The traffic controller — moves tasks from queues to call stack              |

Event loop visualized: https://www.jsv9000.app/






# BROWSER WORKING FLOW

## Browser Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   HTML      │  │     CSS     │  │ JavaScript  │         │
│  │  Parser     │  │   Engine    │  │   Engine    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│         │               │                   │              │
│         └───────────────┼───────────────────┘              │
│                         │                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Rendering Engine                       │   │
   │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
   │  │  │    DOM      │  │     CSSOM   │  │   Layout    │ │   │
   │  │  │   Tree      │  │    Tree     │  │   Engine    │ │   │
   │  │  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
│                         │                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              JavaScript Runtime                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │   Call      │  │   Event     │  │   Memory    │ │   │
│  │  │   Stack     │  │    Loop     │  │   Heap      │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. HTML Parser

### Role:
- Converts HTML markup into a **DOM (Document Object Model) tree**
- Parses HTML character by character
- Handles malformed HTML gracefully
- Creates a hierarchical tree structure

### Process:
```html
<!-- Input HTML -->
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>This is a paragraph</p>
  </body>
</html>
```

```javascript
// Output DOM Tree
{
  type: 'document',
  children: [
    {
      type: 'element',
      tagName: 'html',
      children: [
        {
          type: 'element',
          tagName: 'head',
          children: [
            {
              type: 'element',
              tagName: 'title',
              children: [{ type: 'text', content: 'My Page' }]
            }
          ]
        },
        {
          type: 'element',
          tagName: 'body',
          children: [
            {
              type: 'element',
              tagName: 'h1',
              children: [{ type: 'text', content: 'Hello World' }]
            },
            {
              type: 'element',
              tagName: 'p',
              children: [{ type: 'text', content: 'This is a paragraph' }]
            }
          ]
        }
      ]
    }
  ]
}
```

### Key Features:
- **Tokenization**: Breaks HTML into tokens
- **Tree Construction**: Builds DOM tree from tokens
- **Error Recovery**: Handles invalid HTML
- **Incremental Parsing**: Can parse HTML as it streams in

---

## 2. CSS Engine

### Role:
- Parses CSS rules and creates **CSSOM (CSS Object Model) tree**
- Calculates computed styles for each element
- Handles CSS specificity and inheritance
- Manages CSS animations and transitions

### Process:
```css
/* Input CSS */
body {
  font-size: 16px;
  color: #333;
}

h1 {
  font-size: 2em;
  color: #000;
}

.container {
  width: 100%;
  max-width: 1200px;
}
```

```javascript
// Output CSSOM Tree
{
  body: {
    fontSize: '16px',
    color: '#333',
    // Inherited properties
    fontFamily: 'Arial',
    lineHeight: 'normal'
  },
  h1: {
    fontSize: '32px', // 2em * 16px
    color: '#000',
    // Inherited from body
    fontFamily: 'Arial',
    lineHeight: 'normal'
  },
  '.container': {
    width: '100%',
    maxWidth: '1200px',
    // Inherited properties
    fontSize: '16px',
    color: '#333'
  }
}
```

### Key Features:
- **Rule Matching**: Finds which CSS rules apply to each element
- **Specificity Calculation**: Determines which rules take precedence
- **Cascade**: Handles multiple CSS sources (user agent, user, author)
- **Computed Values**: Converts relative units to absolute values

---

## 3. Rendering Engine

### Role:
- Combines DOM and CSSOM to create **Render Tree**
- Calculates layout and positioning
- Handles painting and compositing
- Manages viewport and scrolling

### Process Flow:

#### Step 1: Render Tree Construction
```javascript
// Combines DOM and CSSOM
const renderTree = {
  type: 'element',
  tagName: 'div',
  computedStyle: {
    display: 'block',
    width: '100px',
    height: '50px',
    backgroundColor: '#f0f0f0'
  },
  children: [
    {
      type: 'element',
      tagName: 'h1',
      computedStyle: {
        display: 'block',
        fontSize: '32px',
        color: '#000'
      }
    }
  ]
};
```

#### Step 2: Layout (Reflow)
```javascript
// Calculates exact positions and sizes
const layout = {
  x: 0,
  y: 0,
  width: 100,
  height: 50,
  children: [
    {
      x: 0,
      y: 0,
      width: 100,
      height: 32
    }
  ]
};
```

#### Step 3: Painting
```javascript
// Converts layout to pixels
const paintCommands = [
  { type: 'fillRect', x: 0, y: 0, width: 100, height: 50, color: '#f0f0f0' },
  { type: 'fillText', x: 0, y: 20, text: 'Hello', color: '#000', fontSize: 32 }
];
```

### Key Features:
- **Render Tree**: Only visible elements (excludes `display: none`)
- **Layout Engine**: Calculates positions using box model
- **Painting Engine**: Converts layout to pixels
- **Compositing**: Layers elements for performance

---

## 4. JavaScript Engine

### Role:
- Parses and executes JavaScript code
- Manages memory allocation and garbage collection
- Optimizes code execution (JIT compilation)
- Handles JavaScript APIs and Web APIs

### Process:

#### Step 1: Parsing
```javascript
// Input JavaScript
function add(a, b) {
  return a + b;
}

// Parsed into AST (Abstract Syntax Tree)
{
  type: 'FunctionDeclaration',
  id: { type: 'Identifier', name: 'add' },
  params: [
    { type: 'Identifier', name: 'a' },
    { type: 'Identifier', name: 'b' }
  ],
  body: {
    type: 'BlockStatement',
    body: [{
      type: 'ReturnStatement',
      argument: {
        type: 'BinaryExpression',
        operator: '+',
        left: { type: 'Identifier', name: 'a' },
        right: { type: 'Identifier', name: 'b' }
      }
    }]
  }
}
```

#### Step 2: Compilation
```javascript
// V8 Engine (Chrome) - Ignition (interpreter)
// Converts AST to bytecode
const bytecode = [
  { opcode: 'LdaNamedProperty', operand: 'a' },
  { opcode: 'LdaNamedProperty', operand: 'b' },
  { opcode: 'AddSmi', operand: null },
  { opcode: 'Return', operand: null }
];

// TurboFan (optimizing compiler)
// Converts hot code to machine code
const machineCode = `
  mov rax, [rbp + 8]   ; Load a
  add rax, [rbp + 16]  ; Add b
  ret                  ; Return
`;
```

### Key Features:
- **Multi-tier Compilation**: Interpreter + JIT compiler
- **Optimization**: Inline caching, hidden classes, type specialization
- **Memory Management**: Garbage collection, memory allocation
- **Web APIs**: DOM manipulation, network requests, timers

---

## 5. JavaScript Runtime

### Role:
- Provides execution environment for JavaScript
- Manages event loop and asynchronous operations
- Handles call stack, memory heap, and event queue
- Coordinates with browser APIs

### Components:

#### Call Stack
```javascript
// Tracks function calls
function first() {
  second();
}

function second() {
  third();
}

function third() {
  console.log('Hello');
}

first();

// Call Stack:
// [third, second, first, global]
```

#### Memory Heap
```javascript
// Stores objects and variables
const user = { name: 'John', age: 30 }; // Stored in heap
let count = 5; // Stored in stack

// Garbage Collection
// Removes unused objects from heap
```

#### Event Loop
```javascript
// Manages asynchronous operations
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// Output: 1, 4, 3, 2
// Event Loop phases:
// 1. Call Stack (synchronous)
// 2. Microtask Queue (Promises)
// 3. Macrotask Queue (setTimeout, setInterval)
```

---

## Complete Browser Flow

### 1. **Initial Load**
```
1. Browser receives HTML
2. HTML Parser starts parsing
3. CSS Engine parses CSS
4. JavaScript Engine loads and parses JS
```

### 2. **DOM Construction**
```
1. HTML Parser creates DOM tree
2. CSS Engine creates CSSOM tree
3. Rendering Engine combines them into Render Tree
```

### 3. **Layout and Painting**
```
1. Layout Engine calculates positions
2. Painting Engine draws pixels
3. Compositing Engine layers elements
```

### 4. **JavaScript Execution**
```
1. JavaScript Engine executes code
2. Runtime manages execution context
3. Event Loop handles async operations
```

### 5. **Interactive Phase**
```
1. User interactions trigger events
2. JavaScript processes events
3. DOM updates trigger reflow/repaint
4. Rendering Engine updates display
```

---

## Performance Considerations

### Critical Rendering Path
```javascript
// Blocking resources
<link rel="stylesheet" href="styles.css"> // Blocks rendering
<script src="app.js"></script> // Blocks parsing

// Non-blocking resources
<link rel="stylesheet" href="styles.css" media="print"> // Doesn't block
<script src="app.js" async></script> // Doesn't block parsing
<script src="app.js" defer></script> // Executes after HTML
```

### Optimization Strategies
```javascript
// 1. Minimize reflows
const element = document.getElementById('myElement');
element.style.width = '100px';  // Reflow
element.style.height = '100px'; // Reflow
element.style.backgroundColor = 'red'; // Reflow

// Better approach
element.style.cssText = 'width: 100px; height: 100px; background-color: red;';

// 2. Use requestAnimationFrame for animations
function animate() {
  element.style.left = (parseInt(element.style.left) + 1) + 'px';
  requestAnimationFrame(animate);
}

// 3. Debounce expensive operations
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

---

## Summary

**The browser works as a coordinated system:**

1. **HTML Parser** → Creates DOM tree
2. **CSS Engine** → Creates CSSOM tree  
3. **Rendering Engine** → Combines DOM + CSSOM → Render Tree → Layout → Paint
4. **JavaScript Engine** → Parses and executes JS code
5. **JavaScript Runtime** → Manages execution environment and async operations

**Key Interactions:**
- JavaScript can modify DOM → Triggers reflow/repaint
- CSS changes → Triggers reflow/repaint
- User interactions → Trigger events → JavaScript processes → DOM updates
- All components work together to create the interactive web experience

Understanding this flow helps optimize web performance and debug issues effectively!