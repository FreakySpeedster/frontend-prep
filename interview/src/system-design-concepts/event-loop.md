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

Here’s an example to walk through the entire flow:

```js
console.log("1");

setTimeout(() => console.log("2"), 1000);

console.log("3");
```

### ✅ Step-by-step Breakdown:

1. **Synchronous code starts**  
   JS engine runs `console.log("1")` → prints `1`

2. **Encounter `setTimeout()`**  
   - The JS engine says: “I don’t know what `setTimeout` is.”
   - So it delegates this to the **Web API** in the browser
   - Browser starts a timer (in parallel, not blocking JS)

3. **Next sync line runs**  
   JS engine runs `console.log("3")` → prints `3`

4. **Timer expires (after ~1000ms)**  
   Browser moves the callback into the **Callback Queue**

5. **Event Loop kicks in**  
   - It checks: “Is the JS call stack empty?”
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
- **JS Engine (V8)**: Executes JS line-by-line but doesn’t know anything about the browser.
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