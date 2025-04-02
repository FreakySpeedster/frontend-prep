function throttle(callbackFn, wait) {
    let lastExecutionTime = 0;
    return function(...args) {
        let now = Date.now();
        if (now - lastExecutionTime > wait) {
            callbackFn(...args);
            lastExecutionTime = now;
        }
    }
}