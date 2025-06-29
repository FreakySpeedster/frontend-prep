🎯 TOP PRIORITY – Core Frontend Concepts
1. Explain how the Virtual DOM works in React.
“The Virtual DOM is an in-memory representation of the real DOM. When a component’s state changes, React creates a new Virtual DOM tree and compares it to the previous one using a diffing algorithm. This allows React to calculate the minimal set of changes needed to update the real DOM efficiently. It’s important because direct DOM manipulation is slow, while this approach improves performance and keeps UI updates predictable.”

2. What happens during the React rendering lifecycle?
“When a component mounts or updates, React first renders the Virtual DOM, then compares it to the previous version. Based on differences, it updates the real DOM in a batch. During this process, lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount (or hooks like useEffect) let us perform side effects at specific phases.”

3. How do you handle state management in a large React app?
“I use a combination of local component state for simple cases and centralized solutions like Context API or Redux for shared state. For example, in large dashboards, Redux helps manage consistent data across components, while Context handles theming or user info. I also follow best practices like immutability and selectors to keep state predictable.”

4. Explain component reusability and how you achieve it.
“Component reusability means building components that can adapt via props and don’t depend on hard-coded data. I achieve this by designing pure, stateless components with clear interfaces. For example, a Button component receives label and handler props and can be used in multiple parts of the app with different behavior.”

5. What is the CSS cascade, and how does specificity work?
“The CSS cascade determines which styles apply when multiple rules target the same element. Specificity is calculated based on selectors—inline styles have highest specificity, then IDs, classes, and finally elements. If specificity is equal, the last declared rule wins. Understanding this helps prevent conflicts and unintended overrides.”

6. How would you improve the performance of a React application?
“I focus on avoiding unnecessary re-renders by using React.memo, useMemo, and useCallback. I also lazy-load components with React.lazy and Suspense, optimize images, and split code. For example, in a large table, memoization reduced re-render times significantly.”

7. What are controlled vs uncontrolled components?
“Controlled components have their state managed by React, typically via useState or props. Uncontrolled components rely on the DOM to manage state, accessed via refs. Controlled components are preferable when you need validation or dynamic updates.”

8. How do you ensure your web app is accessible (a11y)?
“I use semantic HTML tags, ARIA attributes when necessary, and ensure keyboard navigation works. I also test with screen readers and tools like axe or Lighthouse. For example, providing labels for form fields and using proper heading hierarchy improves accessibility.”

9. Describe how you would optimize the loading time of a webpage.
“I’d use lazy loading for images and non-critical scripts, minimize CSS and JS bundles, implement server-side rendering or static generation where possible, and use caching strategies. Compressing assets and setting appropriate cache headers also help.”

10. What are the main differences between useEffect and useLayoutEffect?
“useEffect runs after the paint, so it’s good for side effects that don’t block the UI, like data fetching. useLayoutEffect runs synchronously after DOM mutations but before the paint, which is useful for measuring layout or applying immediate style changes.”

🔹 HIGH PRIORITY – Everyday Frontend Work
11. Explain how debouncing and throttling work. When would you use them?
“Debouncing delays a function call until a pause in events—useful for search inputs. Throttling ensures a function runs at most once in a time interval—good for scroll or resize handlers. Both help improve performance by reducing the frequency of executions.”

12. What is CORS and how do you handle it?
“CORS is a security mechanism where the browser restricts cross-origin requests. The server must send appropriate headers to allow them. I usually handle CORS by configuring backend headers or using a proxy during development.”

13. How do you manage forms and validation in React?
“I use controlled components for input values and libraries like Formik or React Hook Form for validation. They simplify managing errors, touched fields, and submission. For smaller forms, I sometimes use simple state and custom validation.”

14. What is SSR (Server Side Rendering) and why is it useful?
“SSR generates HTML on the server for each request, which improves first load performance and SEO. Frameworks like Next.js make SSR easier by handling routing and data fetching.”

15. How does the browser render HTML, CSS, and JavaScript?
“It parses HTML into the DOM, CSS into the CSSOM, combines them to create the Render Tree, computes layout, and then paints pixels. JS can block rendering during parsing and execution if not deferred or async.”

16. Explain the box model in CSS.
“The box model consists of content, padding, border, and margin. box-sizing: border-box includes padding and border in width, while content-box excludes them.”

17. How would you secure a frontend application?
“I prevent XSS by sanitizing inputs and using secure APIs, protect against CSRF with tokens, and avoid exposing sensitive data in the frontend. Also, I set security headers and use HTTPS.”

18. What are Web Components? Have you worked with them?
“Web Components are reusable custom elements with encapsulated HTML, CSS, and JS. They rely on the Shadow DOM. I’ve experimented with them for building framework-agnostic widgets.”

19. How do you handle API errors gracefully in the UI?
“I show user-friendly messages, retry options if appropriate, and fallback UIs. I log errors for monitoring but never expose sensitive details.”

20. What are hooks? Explain a custom hook you’ve written.
“Hooks are functions like useState and useEffect that let you use React features in functional components. I’ve created custom hooks for data fetching and debounced input handling.”

⚙️ TECHNICAL / BEHAVIORAL HYBRID
21. Describe a challenging bug you encountered and how you solved it.
“I once had a memory leak in a large table component. I used the React DevTools Profiler to track unmounted components retaining subscriptions. Cleaning up with useEffect cleanup resolved it.”

22. How do you collaborate with backend developers?
“I clarify API contracts early, share mock data formats, and set up Postman collections. Regular check-ins help align expectations and avoid blockers.”

23. If a stakeholder wants a change that affects performance, how would you handle it?
“I’d explain the trade-offs, propose alternatives, and back my points with data. If the change is critical, I’d explore optimization strategies.”

24. How do you stay up to date with frontend trends and technologies?
“I follow blogs, newsletters, and conferences. I also experiment with new tools in side projects to evaluate their practical value.”

25. How do you ensure cross-browser compatibility?
“I test in all supported browsers, use feature detection, and polyfills when needed. I also rely on CSS resets and consistent units.”

26. Describe your experience with responsive design.
“I use fluid grids, media queries, and flexible images to build layouts that adapt to any screen size. Tools like Chrome DevTools help verify behavior.”

27. Explain lazy loading of components and assets.
“Lazy loading defers loading parts of the app until needed. For React components, React.lazy and Suspense handle this. For images, loading="lazy" improves performance.”

28. How do you manage CSS in large codebases?
“I prefer CSS Modules or CSS-in-JS solutions to scope styles locally and avoid conflicts. Consistent naming and design tokens help maintain scalability.”

29. What is progressive enhancement?
“It’s building the core experience to work in any browser, then adding advanced features for capable ones. This improves accessibility and reliability.”

30. How would you handle real-time updates in a React app?
“I’d use WebSockets or polling to get updates, store them in state management, and re-render the UI when data changes.”

🧠 INTERMEDIATE / CONCEPTUAL
31. What is the difference between props and state in React?
“Props are inputs passed from parent to child and are immutable. State is local to a component and can change over time. Props drive configuration, state drives internal data.”

32. How does event delegation work in JavaScript?
“It means adding a single event listener to a parent element that handles events from children via event bubbling. It improves performance and simplifies dynamic content handling.”

33. Explain closures in JavaScript.
“A closure is a function that retains access to its lexical scope even after the outer function has returned. This enables data encapsulation and callbacks.”

34. What are Promises? How do they differ from async/await?
“Promises represent the eventual result of an async operation. Async/await is syntactic sugar that lets us write promise-based code in a synchronous style.”

35. Explain how you would design a component library.
“I’d define a consistent design system, create reusable components with clear APIs, document usage, and provide customization options. Testing and accessibility are essential.”

36. What are Service Workers?
“They are scripts that run in the background and enable features like offline caching, push notifications, and background sync.”

37. Explain hydration in the context of SSR.
“Hydration is when client-side JavaScript takes over server-rendered HTML, attaching event listeners and making the app interactive.”

38. How would you debug a memory leak in a frontend application?
“I’d use Chrome DevTools to take heap snapshots, look for detached DOM nodes, and check if subscriptions are cleaned up. Proper cleanup in effects helps avoid leaks.”

39. What are WebSockets, and have you used them?
“WebSockets provide a persistent two-way connection between client and server, enabling real-time communication. I’ve used them for live chat and dashboards.”

40. What are the key principles of responsive design?
“Flexible grids, media queries, and fluid images. The goal is to adapt layouts and content to different screen sizes for optimal user experience.”

🧩 LOWER PRIORITY – SOMETIMES ASKED
41. How do you handle internationalization (i18n)?
“I use libraries like react-intl or i18next to manage translations, formatting, and locale detection. External files store strings for easy updates.”

42. What is the Shadow DOM?
“It encapsulates a component’s internal DOM and styles, preventing them from leaking out or being affected by global styles.”

43. Explain the difference between localStorage and sessionStorage.
“Both store key-value pairs. localStorage persists across sessions; sessionStorage clears when the tab closes.”

44. Describe a time you disagreed with a teammate and how you resolved it.
“I once disagreed on a library choice. I proposed listing pros and cons, testing both options, and making a data-driven decision. We reached consensus.”

45. What are pure components in React?
“Pure components implement shallow prop and state comparison to avoid unnecessary re-renders. Functionally, React.memo achieves similar optimization.”

46. Explain the difference between call, apply, and bind in JS.
“call invokes a function with a given this and arguments. apply does the same but takes arguments as an array. bind returns a new function bound to this.”

47. How do you test frontend components?
“I use unit tests with Jest and component tests with React Testing Library. For end-to-end flows, Cypress or Playwright helps verify user interactions.”

48. Explain HOC (Higher Order Components) and when you’d use one.
“An HOC is a function that takes a component and returns a new component with added behavior. They help with code reuse, like authentication checks.”

49. How do you ensure quality and maintainability of your code?
“I follow consistent code styles, write tests, document components, and conduct code reviews to catch issues early.”