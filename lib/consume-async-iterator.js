define([], function () {
  return function (asyncIterator) {
    var recurseIterator = function (asyncIterator, values, resolve, reject) {
      asyncIterator.next().then(function (next) {
        if (next.done) {
          resolve(values);
        } else {
          values.push(next.value);
          recurseIterator(asyncIterator, values, resolve, reject);
        }
      })
      .catch(reject);
    };

    return new Promise(function (resolve, reject) {
      recurseIterator(asyncIterator, [], resolve, reject);
    });
  };
});
