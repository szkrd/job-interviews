// greater than
export const gt = (val: any, comp: number) => typeof val === 'number' && val > comp;

// returns the number if it's a number or a string, otherwise returns zero
export const num = (val: any): number => typeof val === 'number' ? val : (typeof val === 'string' ? parseInt(val, 10) : 0);

// create range array with given length
export const range = (val: any): number[] => {
  const ret = [];
  for (let i = 0, l = num(val); i < l; i++) {
    ret.push(i);
  }
  return ret;
};

const numberUtils = { gt, num, range };
export default numberUtils;
