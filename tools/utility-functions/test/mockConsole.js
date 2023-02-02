"use strict";
exports.__esModule = true;
exports.mockConsole = void 0;
var nop = function () { }; // eslint-disable-line @typescript-eslint/no-empty-function
var methods = ['log', 'info', 'warn', 'error'];
exports.mockConsole = {
    setup: function () {
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
    reset: function () {
        var _this = this;
        methods.forEach(function (method) { return _this[method].mockReset(); });
    },
    restore: function () {
        var _this = this;
        methods.forEach(function (method) { return _this[method].mockRestore(); });
    }
};
