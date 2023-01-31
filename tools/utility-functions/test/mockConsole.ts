const nop = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function

const methods = ['log', 'info', 'warn', 'error'];

export const mockConsole = {
  setup() {
    // no forEach, this way we still have type safety (and keyof typeof console did not work)
    this.log = jest.spyOn(global.console, 'log').mockImplementation(nop);
    this.info = jest.spyOn(global.console, 'info').mockImplementation(nop);
    this.warn = jest.spyOn(global.console, 'warn').mockImplementation(nop);
    this.error = jest.spyOn(global.console, 'error').mockImplementation(nop);
  },
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  reset() {
    methods.forEach((method) => this[method].mockReset());
  },
  restore() {
    methods.forEach((method) => this[method].mockRestore());
  },
};
