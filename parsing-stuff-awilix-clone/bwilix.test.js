const { createContainer, asValue, asFunction } = require('./bwilix');

describe('bwilix', () => {
  describe('asFunction', () => {
    describe('when a non-function is passed', () => {
      it.todo('raises an exception');
    });

    it('wrappers a resolver', () => {
      const resolver = asFunction((dep1, dep2) => {
        return {
          description: 'blah blah',
          dep1,
          dep2
        };
      });
      // const container = createContainer();

      // container.add('connectionString', asValue('redis://:6379'))
    });
  });
});
