function promiseRace(promiseList) {
    return new Promise((resolve, reject) => {
        if (promiseList.length === 0) {
            return reject('No valid elements');
        }
        promiseList.forEach((singleItem) => {
            Promise.resolve(singleItem)
            .then(resolve)  // The first resolved promise wins
            .catch(reject); // The first rejected promise wins
        })
    })
}