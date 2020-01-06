/* eslint-disable @typescript-eslint/no-var-requires */
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

// Pin the date, to avoid the tests from breaking when the year change
global.Date = class extends Date {
  constructor(...args) {
    super(...args);
    if (args.length === 0) {
      return new Date('2019-01-02T03:04:05.000Z');
    }
  }
};
