function makeIterator(start = 0, end = Infinity, step = 1) {
  let current = start;
  let iterationCount = 0;
  return {
    next() {
      let result;
      if (iterationCount < end) {
        result = { value: current, done: false };
        current += step;
        iterationCount++;
        return result;
      }
      return { value: undefined, done: true };
    },
  };
}

const myIterator = makeIterator(10, 8, 1);
let result = myIterator.next();

while (!result.done) {
  console.log(result);
  result = myIterator.next();
}
