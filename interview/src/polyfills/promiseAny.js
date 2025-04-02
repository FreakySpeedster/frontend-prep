export default function myPromiseAny(promises) {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            reject('No array');
        }
        let results  = [];
        let counter = 0;
        promises.forEach((item) => {
            Promise.resolve(item).then((value) => {
                resolve(value);
            }).catch((error) => {
                results.push(error);
                counter++;
                if (counter === promises.length) {
                    reject('No promises resolved');
                }
            })
        })
    })
}