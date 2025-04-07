# Top System Design Questions

## 1. What is Client-Side vs. Server-Side Rendering (CSR vs. SSR)?

**Answer:**

- **Client-Side Rendering (CSR):**  
  The browser downloads a minimal HTML file and JavaScript executes to render content dynamically.  
  **Example:** React SPAs.

- **Server-Side Rendering (SSR):**  
  The server generates a fully rendered HTML page for each request and sends it to the browser.  
  **Example:** Next.js.

### Follow-up Questions:

**A. What are the advantages and disadvantages of CSR vs. SSR?**

| Feature               | Client-Side Rendering (CSR)                  | Server-Side Rendering (SSR)                  |
|-----------------------|---------------------------------------------|---------------------------------------------|
| **Performance**       | Fast after initial load (Good for SPAs)     | Slower initial load but faster navigation   |
| **SEO**               | Poorer SEO as content loads via JavaScript  | Better SEO as content is pre-rendered       |
| **Time to First Paint (TTFP)** | Higher (because JS needs to execute) | Lower (HTML is already rendered)            |
| **User Experience**   | Smooth, interactive experience              | Faster first load but potential flickering during hydration |
| **Data Fetching**     | Data is fetched on the client-side          | Data is fetched on the server before sending to the client |
| **Caching**           | Harder to cache fully rendered pages        | Easier to cache pre-rendered pages          |

**B. How does SSR improve SEO compared to CSR?**

- SSR provides fully rendered HTML to search engine bots, making it easier for them to index pages correctly.
- CSR relies on JavaScript execution, and some search engines may not properly index dynamically loaded content.
- SSR ensures that meta tags (title, description, Open Graph tags) are available immediately, which is crucial for SEO and social media previews.

**Example:**

- **CSR:**  
  Google bot requests a page → Gets a blank HTML shell → Needs to run JavaScript → Then sees the content.

- **SSR:**  
  Google bot requests a page → Immediately gets fully rendered content → Can index it properly.

**C. Can you mix SSR and CSR in an application?**

Yes, you can use both SSR and CSR in the same application. This is called **Hybrid Rendering**.

- **How?**
  - Use SSR for initial page load (for better SEO and performance).
  - Use CSR for interactive components (like buttons, forms, and dynamic data fetching).

- **Frameworks like Next.js allow mixing SSR (`getServerSideProps`) and CSR (`useEffect`).**

**Example Use Case:**

- An e-commerce website may use SSR for product pages (to improve SEO).
- The product’s reviews section may use CSR (to load new reviews dynamically without reloading the page).

---

## 2. What is Code Splitting?

**Answer:**  
Code splitting is the practice of breaking JavaScript bundles into smaller pieces and loading them only when needed, improving performance.

### Follow-up Questions:

- How do you implement code splitting in React?
- What is the difference between dynamic import and lazy loading?
- How does code splitting impact Time to First Paint (TTFP)?

---

## 2. What is Code Splitting?

**Answer:**  
Code splitting is the practice of breaking JavaScript bundles into smaller pieces and loading them only when needed, improving performance.

### How to Implement Code Splitting in React?

Code splitting in React helps improve performance by loading JavaScript files only when needed instead of all at once. React provides built-in support for code splitting using `React.lazy` and `React.Suspense`.

### 1️⃣ Using React.lazy for Component-Level Code Splitting

React allows you to dynamically import components using `React.lazy()`.

**Example: Lazy Loading a Component**

```jsx
import React, { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

const App = () => {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <Suspense fallback={<p>Loading component...</p>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
};

export default App;



---

## 3. What is a CDN (Content Delivery Network) in Frontend?

**Answer:**  
A CDN is a network of distributed servers that store and serve static assets like images, CSS, and JavaScript files from locations closer to users to reduce load time.

### Follow-up Questions:

- How does a CDN improve website performance?
- Can dynamic content be served through a CDN?
- What happens if a CDN node fails?

---

## 4. What is Lazy Loading and how does it work?

**Answer:**  
Lazy loading is the technique of loading resources (images, components, or scripts) only when needed instead of loading everything at once.

### Follow-up Questions:

- How does lazy loading improve performance?
- What are some libraries for lazy loading images in React?
- Can lazy loading be applied to API requests?

---

## 5. What is Virtual DOM and how does it work?

**Answer:**  
The Virtual DOM is a lightweight copy of the actual DOM. React updates the Virtual DOM first, then applies only the necessary changes to the real DOM.

### Follow-up Questions:

- How does React’s reconciliation process work?
- Why is updating the Virtual DOM faster than updating the real DOM?
- What is the difference between Shadow DOM and Virtual DOM?

---

## 6. What are Micro Frontends?

**Answer:**  
Micro Frontends break a large frontend application into smaller, independently deployable modules, similar to microservices in the backend.

### Follow-up Questions:

- How do micro frontends communicate with each other?
- What are the advantages and disadvantages of micro frontends?
- Can different micro frontends use different frameworks?

---

## 7. What is Debouncing and Throttling?

**Answer:**

- **Debouncing:** Ensures a function executes only after a delay since the last trigger. Used in search inputs.
- **Throttling:** Ensures a function executes at most once in a fixed interval. Used in scroll events.

### Follow-up Questions:

- How would you implement debounce in JavaScript?
- What are real-world use cases for throttling?
- Can debounce and throttle be used together?

---

## 8. What is Hydration in Frontend?

**Answer:**  
Hydration is the process where the client-side JavaScript takes over the pre-rendered HTML (from SSR) and makes it interactive.

### Follow-up Questions:

- How does hydration improve perceived performance?
- What are the challenges of hydration?
- How does Next.js handle hydration errors?

---

## 9. What is Progressive Web App (PWA)?

**Answer:**  
A PWA is a web application that provides an app-like experience, including offline support, push notifications, and fast performance.

### Follow-up Questions:

- What technologies are required to build a PWA?
- How do Service Workers work in PWAs?
- Can PWAs be installed on mobile devices?

---

## 10. How does a Frontend Handle API Failures?

**Answer:**  
Frontend applications handle API failures using error handling strategies, such as:

- Retrying requests with exponential backoff.
- Showing fallback UI to users.
- Caching responses for better resilience.

### Follow-up Questions:

- How do you implement exponential backoff in API calls?
- How can you handle API rate limits on the frontend?
- What are the benefits of using a global error boundary in React?