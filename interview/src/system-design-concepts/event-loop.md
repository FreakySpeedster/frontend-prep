
# Overview before diving into Event loop
# 🧠 Understanding the Browser, JavaScript Runtime, and Engine

## 1. Browser
This is the application (like Chrome, Firefox, Safari) where your web page runs.

It contains multiple components:
- HTML parser
- CSS engine
- Rendering engine (like Blink/WebKit)
- JavaScript engine (like V8 in Chrome)
- JS runtime (includes Web APIs, event loop, etc.)

---

## 2. JavaScript Engine
Responsible for **executing JavaScript code**.

- In Chrome, it's called **V8**.
- It:
  - Parses JS code
  - Compiles it (JIT - just-in-time compilation)
  - Optimizes and runs it

> It **only understands JavaScript**, not DOM, timers, or fetch.

---

## 3. JavaScript Runtime Environment
The whole ecosystem that allows JavaScript to work in a browser.

Includes:
- **JavaScript engine** (e.g. V8)
- **Web APIs** (e.g. DOM, `fetch`, `setTimeout`)
- **Callback queue**
- **Event loop**

> Acts as a bridge between JavaScript (engine) and browser capabilities.

---

## 🔄 How They Communicate (Step-by-Step)

Example code:

```js
console.log("1");
setTimeout(() => console.log("2"), 1000);
console.log("3");
```

### ➤ Step 1: JS Engine Runs Code
- Executes `console.log("1")` → prints `1`
- Encounters `setTimeout()` → **V8 can't handle this directly**

### ➤ Step 2: Delegate to Web API
- **Browser handles** `setTimeout`
- Sets a timer and continues

### ➤ Step 3: Continue Synchronous Code
- Runs `console.log("3")` → prints `3`

### ➤ Step 4: Timer Expires → Callback Queue
- After 1s, the callback goes to the **callback queue**

### ➤ Step 5: Event Loop
- Event loop checks if call stack is empty
- If yes → pushes the callback to the stack
- Executes `console.log("2")` → prints `2`

---

## 🧩 Summary Diagram (Text Version)

```
Browser
│
├── JavaScript Runtime
│   ├── JavaScript Engine (V8)
│   ├── Web APIs (DOM, timers, fetch, etc.)
│   ├── Callback Queue
│   └── Event Loop
│
└── Rendering Engine (handles HTML/CSS/UI painting)
```

---

## 💬 In Simple Words:
- **Browser**: The container where everything happens.
- **JS Engine (V8)**: Just executes JS code.
- **Runtime**: Adds the rest (timers, fetch, DOM, event loop).
- **Communication**: JS Engine offloads tasks (like `setTimeout`, DOM manipulation) to Web APIs → they respond → Event loop queues callbacks → JS Engine executes.

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
