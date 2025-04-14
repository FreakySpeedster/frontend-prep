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