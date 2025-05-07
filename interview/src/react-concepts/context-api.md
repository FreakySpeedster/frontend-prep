
# React Context API

The **Context API** in React provides a way to share values (state) between components without having to explicitly pass props through every level of the tree.

---

## 📌 Why Context API?

In a typical React app, data is passed top-down (parent to child) via props. But this can become cumbersome for deeply nested components, where you have to pass props through many layers. The Context API solves this problem.

---

## 🧠 Core Concepts

### 1. **React.createContext()**
Creates a Context object.

```js
const MyContext = React.createContext(defaultValue);
```

### 2. **Provider**
Provides the context value to its child components.

```js
<MyContext.Provider value={/* some value */}>
  <Child />
</MyContext.Provider>
```

### 3. **useContext()**
A React hook to consume context values.

```js
const value = useContext(MyContext);
```

---

## ✅ Example

```jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedComponent() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

---

## 🔍 When to Use Context

- Theming (Dark/Light Mode)
- Language Localization
- Authentication Info (User Data)
- Application-wide settings

---

## ⚠️ Limitations

- Not ideal for high-frequency updates (e.g., mouse position)
- Triggers a re-render of all consuming components when value changes

---

## ✅ Best Practices

- Use context for truly global data
- For large apps with complex state, consider using **Redux** or **Zustand**
- Combine Context with **useReducer** for more robust state management

---

## 🔁 Comparison with Redux

| Feature            | Context API         | Redux                    |
|--------------------|---------------------|---------------------------|
| Setup              | Simple              | Complex                  |
| Boilerplate        | Low                 | High                     |
| DevTools Support   | No                  | Yes                      |
| Async Middleware   | No (manual)         | Yes (thunk, saga)        |
| Re-render Control  | Less granular       | More granular            |

---

## Summary

The Context API is a powerful tool for managing global state, but it's best suited for relatively simple use cases. For more complex applications, Redux or other state management libraries may offer better performance and developer experience.
