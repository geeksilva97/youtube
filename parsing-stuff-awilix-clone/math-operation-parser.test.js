const { parseOperation } = require('./math-operation-parser');

describe('math operation parser', () => {
  it('parsers inline operations', () => {
    expect(parseOperation('add(5, 2)')).toEqual(7);
    expect(parseOperation('subtract(3, 1)')).toEqual(2);
    expect(parseOperation('multiply(3,19)')).toEqual(57);
    expect(parseOperation('divide(6 , 3)')).toEqual(2);
    expect(parseOperation('add(2.5, -2)')).toEqual(0.5);
  });

  it.only('parsers nested operations recursively', () => {
    expect(parseOperation('multiply(3,subtract(3, 4))')).toEqual(-3);
    expect(parseOperation('multiply(3    ,subtract(3, 4))')).toEqual(-3);
    expect(parseOperation('subtract(3    ,    add(3, 4))')).toEqual(-4);
    expect(parseOperation('add(0.5, multiply(0.5, 0.5))')).toEqual(.75);
  })

  // it.todo('raises an exception when it cannot parse')
});
