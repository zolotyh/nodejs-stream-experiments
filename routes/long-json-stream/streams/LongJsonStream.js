const { Readable } = require('node:stream');
const { serializeJSON } = require('./utils');

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time))

const JSON_TEMPLSATE_CLOSE = ']';
const JSON_TEMPLATE_OPEN = '[';
const JSON_TEMPLATE_SEPARATOR = ',';
const TIME_PERIOD = 2000;

class LongJsonStream extends Readable {
  constructor(opt) {
    super(opt);

    this._max = 10;
    this._index = 0;
  }


  _read() {
    this._index += 1;
    const index = this._index;
    const isLastItem = this.isLastItem();
    const isFirstItem = this.isFirstItem();


    if (isFirstItem) {
      this.push(JSON_TEMPLATE_OPEN);
    }

    this.pause();
    return wait(TIME_PERIOD).then(() => {
      console.log(`pushing item ${index}`);
      this.push(serializeJSON({ index: `${index}` }, isLastItem ? '' : JSON_TEMPLATE_SEPARATOR));

      if (isLastItem) {
        this.push(JSON_TEMPLSATE_CLOSE);
        this.push(null);
      }
      this.resume();
    });
  }

  isLastItem = () => {
    return this._index === this._max;
  }

  isFirstItem = () => {
    return this._index === 1;
  }
}

module.exports = {
  LongJsonStream,
}
