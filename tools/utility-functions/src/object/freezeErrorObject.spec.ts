/* eslint-disable @typescript-eslint/no-explicit-any */

import { freezeErrorObject } from './freezeErrorObject';

const clone = (obj: any) => JSON.parse(JSON.stringify(obj));

describe('utils/debug/freezeErrorObject', () => {
  it('should convert an error object to a plain and serializable object', () => {
    let lastError;
    try {
      JSON.parse('broken');
    } catch (error) {
      lastError = error;
    }
    // Errors serialized differently than plain objects!
    expect(clone(lastError)).toEqual({});

    const result = clone(freezeErrorObject(lastError));
    expect(result.name).toBe('SyntaxError');
    expect(result.message.startsWith('Unexpected token')).toBe(true);
    expect(typeof result.stack).toBe('string');
  });
});
