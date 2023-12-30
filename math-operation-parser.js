const OPERATIONS_MAP = {
  add: (a, b) => Number(a) + Number(b),
  subtract: (a, b) => Number(a) - Number(b),
  divide: (a, b) => Number(a) / Number(b),
  multiply: (a, b) => Number(a) * Number(b),
};

// const REGEX = /(?<operation>add|subtract|divide|multiply)\((?<first_operand>[a_zA_Z0-9])\s*,\s*(?<second_operand>.*)\)/gm;
const REGEX = /^(?<operation>add|subtract|divide|multiply)\((?<param1>(?:\w+\(.*\)|\d{0,}\s{0,})),(?<param2>(.*))\)$/gm

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
