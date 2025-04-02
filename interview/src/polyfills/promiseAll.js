/**
 * Polyfill for Promise.all()
 * 
 * The `promiseAll` function takes an array of promises and returns a new promise that:
 * - ✅ Resolves when all input promises resolve, returning an array of resolved values.
 * - ❌ Rejects immediately if any input promise rejects, returning the first rejection reason.
 * 
 * @param {Array<Promise>} promises - An array of promises
 * @returns {Promise} - A promise that resolves with an array of values or rejects with the first error
 * 
 * 
 */

export default function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            resolve([]);
        }
        let results = [];
        let completions = 0;
        promises.forEach((item, index) => {
            Promise.resolve(item).then((value) => { // Convert non-promises to promises
                results[index] = value;
                completions++;
                if (completions === promises.length) {
                    resolve(results);
                }
            }).catch((error) => reject(error));
        })

    })
}

/*
// Example 1: All promises resolve
const p1 = Promise.resolve(10);
const p2 = new Promise((resolve) => setTimeout(() => resolve(20), 1000));
const p3 = Promise.resolve(30);

promiseAll([p1, p2, p3])
  .then((values) => console.log(values)) // ✅ [10, 20, 30] (after 1s)
  .catch((error) => console.error(error));

// Example 2: One promise rejects
const p4 = Promise.reject("Error occurred!");

promiseAll([p1, p4, p3])
  .then(console.log)
  .catch((error) => console.error(error)); // ❌ "Error occurred!" (immediate rejection)

  */