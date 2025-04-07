/**
 * 🔥 Deep Dive into useMemo in React
 * ----------------------------------
 * useMemo is a React Hook that memoizes (caches) the result of a computation 
 * to optimize performance by preventing unnecessary re-computations.
 * 
 * ✅ Syntax:
 * const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
 * - It only recomputes when `a` or `b` changes.
 * - If `a` and `b` haven't changed, React returns the cached result.
 * 
 * 🧠 Why Use useMemo?
 * - React re-renders a component whenever its state or props change.
 * - If a function performs an expensive calculation (e.g., filtering a large array),
 *   it gets recomputed on every render.
 * - useMemo remembers the previous computation and reuses it if the dependencies
 *   haven’t changed, improving performance.
 */

import { useState, useMemo } from "react";

const ExpensiveComponent = () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(1000000);

  const expensiveCalculation = (num) => {
    console.log("Computing...");
    let sum = 0;
    for (let i = 0; i < num; i++) {
      sum += i;
    }
    return sum;
  };

  // ✅ useMemo caches the result unless `num` changes!
  const result = useMemo(() => expensiveCalculation(num), [num]);

  return (
    <div>
      <h2>Expensive Calculation: {result}</h2>
      <button onClick={() => setCount(count + 1)}>Increment: {count}</button>
    </div>
  );
};

export default ExpensiveComponent;

/**
 * ✅ How useMemo Improves Performance:
 * - The expensive function runs only when `num` changes! 🎯
 * - Clicking Increment doesn’t trigger recalculation.
 * 
 * 🚀 When to Use useMemo:
 * - Expensive calculations that don’t need to re-run on every render.
 * - Filtering, sorting, or processing large datasets.
 * - Avoiding unnecessary computations when only a specific value changes.
 * 
 * 🚫 When NOT to Use useMemo:
 * - If the computation is cheap (like adding two numbers).
 * - If your dependency array changes frequently (e.g., passing new objects).
 * - If the performance gain is negligible.
 */
