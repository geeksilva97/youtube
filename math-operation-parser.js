
/**
 * @function
 * @param {Function} fn
 * @returns {Function}
 */
const numberify = (fn) => {
  return (...args) => {
    return fn.apply(null, args.map(c => Number(c)))
  };
};

const OPERATIONS_MAP = {
  add: numberify((a, b) => a + b),
  subtract: numberify((a, b) => a - b),
  divide: numberify((a,b) => a / b),
  multiply: numberify((a, b) => a * b)
};

// const REGEX = /(?<operation>add|subtract|divide|multiply)\((?<first_operand>[a_zA_Z0-9])\s*,\s*(?<second_operand>.*)\)/gm;
const REGEX = /^(?<operation>add|subtract|divide|multiply)\((?<param1>(?:\w+\(.*\)\s{0,}}|\d{0,}\s{0,})),(?<param2>(.*))\)$/gm

/**
 * @function
 * @param {string} operationString
 * @returns {number}
 */
const parseOperation = (operationString) => {
  const { groups } = Array.from(operationString.trim().matchAll(REGEX))[0];
  const { operation, param1, param2 } = groups;

  const parsedFirstOperand = parseOperand(param1.trim());
  const parsedSecondOperand = parseOperand(param2.trim());

  return OPERATIONS_MAP[operation](parsedFirstOperand, parsedSecondOperand);
};

/**
 * @function
 * @ṕaram {string} operand
 */
const parseOperand = (operand) => {
  const operandAsNumber = Number(operand);
  const isNumber = !isNaN(operandAsNumber);

  if (isNumber) return operandAsNumber;

  return parseOperation(operand);
}

module.exports = {
  parseOperation
};
