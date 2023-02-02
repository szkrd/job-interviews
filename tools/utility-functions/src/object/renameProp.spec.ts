import { renameProp, renameProps } from './renameProp';

const getObj = () => ({
  a: 1,
  b: 2,
  c: 3,
});

describe('renameProp', () => {
  it('should rename a key of an object', () => {
    const obj = getObj();
    const expectation = {
      xxx: 1,
      b: 2,
      c: 3,
    };
    expect(renameProp(obj, 'a', 'xxx')).toEqual(expectation);
    // mutates the original object
    expect(obj).toEqual(expectation);
  });
});

describe('renameProps', () => {
  it('should rename multiple keys of an object', () => {
    const obj = getObj();
    const expectation = {
      AA: 1,
      BB: 2,
      CC: 3,
    };
    expect(renameProps(obj, { a: 'AA', b: 'BB', c: 'CC' })).toEqual(expectation);
    expect(obj).toEqual(expectation);
  });
});
