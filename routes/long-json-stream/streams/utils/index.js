const DEFAULT_ENCODING = 'utf8';

const serialize = (inputStr) => Buffer.from(`${inputStr}`, DEFAULT_ENCODING);

const serializeJSON = (inputObj, separator = ',') => Buffer
  .from(`${JSON.stringify(inputObj)}${separator ?? ""}`, DEFAULT_ENCODING);

module.exports = {
  serialize,
  serializeJSON
}
