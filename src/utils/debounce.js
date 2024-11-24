export const debounce = (func, wait) => {
  let timeout;

  const debounced = function (...args) {
    const context = this;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };

  debounced.cancel = function () {
    clearTimeout(timeout);
  };

  return debounced;
};
