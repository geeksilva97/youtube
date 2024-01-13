// it is Bwilix cause it came fater A-wilix

const asFunction = fn => {
  if (typeof fn !== 'function') throw 'you must provide a function';

  return {
    deps: [],
    isResolved: false
  };
};
const asValue = val => ({
  isResolved: true,
  resolved: val,
  resolve: () => val
});
const diContainer = {};



module.exports = {
  asFunction,
  asValue,
  createContainer() {
    const container = {
      add(key, value) {
        diContainer[key] = value;
      }
    };

    return container;
  }
};
