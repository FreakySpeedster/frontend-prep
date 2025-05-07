# React Memoization Hooks

## 🧠 React.memo

### ✅ What is it?
`React.memo` is a higher-order component that memoizes a functional component. It only re-renders if props have changed.

### 📦 Syntax
```jsx
const MemoizedComponent = React.memo(Component);
```

### 🎯 Use Case Example (Helpdesk: Ticket Card)
```jsx
const TicketCard = React.memo(function TicketCard({ ticket }) {
  console.log("Rendering ticket:", ticket.id);
  return <div>{ticket.title}</div>;
});
```
🔎 If `TicketCard` is wrapped in `React.memo`, it will only re-render when the `ticket` prop changes.

---

## 🧮 useMemo

### ✅ What is it?
`useMemo` returns a **memoized value** of a computation. React only recalculates it when its dependencies change.

### 📦 Syntax
```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### 🎯 Use Case Example (Filtering open tickets)
```jsx
const filteredTickets = useMemo(() => {
  return tickets.filter(t => t.status === "open");
}, [tickets]);
```
🚀 Avoids recomputing the filtered list on every render.

---

## 🔁 useCallback

### ✅ What is it?
`useCallback` returns a **memoized version of a callback function**. Useful when passing callbacks to memoized child components.

### 📦 Syntax
```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 🎯 Use Case Example (Ticket assignment)
```jsx
const handleAssign = useCallback((ticketId) => {
  assignTicket(ticketId);
}, [assignTicket]);
```
🛡 Prevents re-creating the function reference on each render, avoiding unnecessary child renders.

---

## 🧩 Putting It All Together – Real Helpdesk Example

```jsx
const TicketBoard = ({ tickets, assignTicket }) => {
  const openTickets = useMemo(() => {
    return tickets.filter(t => t.status === 'open');
  }, [tickets]);

  const handleAssign = useCallback((id) => {
    assignTicket(id);
  }, [assignTicket]);

  return (
    <>
      {openTickets.map(ticket => (
        <TicketCard key={ticket.id} ticket={ticket} onAssign={handleAssign} />
      ))}
    </>
  );
};

const TicketCard = React.memo(({ ticket, onAssign }) => {
  return (
    <div>
      <h4>{ticket.title}</h4>
      <button onClick={() => onAssign(ticket.id)}>Assign</button>
    </div>
  );
});
```

## How useCallback and React.memo complement each other
``` jsx
const Parent = () => {
  const [count, setCount] = useState(0);

  // Memoize the callback
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return (
    <div>
      <Child onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Child Button</button>;
});

```

---

Let me know if you'd like to add sections on performance profiling or compare with Redux, Zustand, or Context API.


# 🧠 Event Delegation in JavaScript and React

## 📌 What is Event Delegation?

**Event delegation** is a technique where you attach a **single event listener to a parent element**, and that listener handles events triggered by its child elements using **event bubbling**.

---

## 🔁 How Does It Work?

In the browser, events like `click`, `keydown`, etc., **bubble up** the DOM tree. That means if an event happens on a child, it travels up to its ancestors. Event delegation leverages this by placing a listener on an ancestor.

---

## 🧩 Example in Vanilla JavaScript

### ❌ Without Event Delegation

```js
document.querySelectorAll('#myList li').forEach((li) => {
  li.addEventListener('click', () => console.log('Clicked', li));
});
```

Creates N event listeners (one per item).

---

### ✅ With Event Delegation

```html
<ul id="myList">
  <li data-id="1">Item 1</li>
  <li data-id="2">Item 2</li>
  <li data-id="3">Item 3</li>
</ul>
```

```js
document.getElementById('myList').addEventListener('click', (event) => {
  const clickedItem = event.target;
  if (clickedItem.tagName === 'LI') {
    console.log('Clicked:', clickedItem.dataset.id);
  }
});
```

🔹 Only **1 listener** is used here — even if new `<li>`s are added later.

---

## ⚡️ Benefits

- Better **performance** with many elements
- Handles **dynamically added elements** seamlessly
- **Cleaner codebase**

---

## ⚠️ Caveats

- Not all events bubble (e.g., `blur`, `focus`, `scroll` do not)
- Be careful with `event.target` — it might not always be the element you expect

---

# ⚛️ Event Delegation in React

React uses **Synthetic Events** and already optimizes event handling by **delegating events to a root container** behind the scenes.

---

## ✅ React Example: Manual Delegation

```jsx
function ItemList({ items }) {
  const handleClick = (event) => {
    const { dataset } = event.target;
    if (dataset && dataset.id) {
      console.log("Clicked item ID:", dataset.id);
    }
  };

  return (
    <ul onClick={handleClick}>
      {items.map((item) => (
        <li key={item.id} data-id={item.id}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

### 🔍 What's Happening?
- One `onClick` listener on `<ul>` handles clicks from all `<li>` elements.
- `data-id` is used to uniquely identify the item.

---

## 👥 Comparison: Individual Listeners

```jsx
{items.map((item) => (
  <li key={item.id} onClick={() => handleClick(item.id)}>
    {item.name}
  </li>
))}
```

Creates **N different functions** and listeners — fine for small lists, but may impact performance at scale.

---

## ✅ When to Use Delegation in React

Use manual delegation when:
- You have **many** elements (e.g., 1000+)
- Elements are **added/removed dynamically**
- You're optimizing for **performance/memory**

Otherwise, React’s default event model is efficient enough.

---

## 🧠 Final Thought

Event delegation is a classic web dev trick that's still relevant — especially when performance and scalability matter.

