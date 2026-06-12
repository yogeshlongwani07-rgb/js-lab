function throttle(fn, delay) {
  let lastcall = 0;

  return function (...args) {
    let now = Date.now();
    if (now - lastcall >= delay) {
      lastcall = now;
      fn.apply(this, args);
    }
  };
}
