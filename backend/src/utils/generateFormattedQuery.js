const snakeize = require('snakeize');

const getFormattedColumnNames = (object) => {
  if (Array.isArray(object)) return Object.keys(snakeize(object[0])).join(',');
  return Object.keys(snakeize(object)).join(',');
};

const getFormattedPlaceholders = (object) => {
  if (Array.isArray(object)) {
    return object.map((obj) => `(${Object.keys(obj).map(() => '?').join(',')})`).join(',');
  }
  return `(${Object.keys(object).map(() => '?').join(',')})`;
};

const getFormattedUpdateColumns = (object) => Object.keys(snakeize(object))
  .map((key) => `${key} = ?`)
  .join(', ');

module.exports = {
  getFormattedColumnNames,
  getFormattedPlaceholders,
  getFormattedUpdateColumns,
};