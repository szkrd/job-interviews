/**
 * Divide the array into many subarrays where each subarray is of length size;
 * for example `[1,2,3,4,5,6,7],3` -> `[1,2,3],[4,5,6],[7]`
 * @see https://medium.com/@Dragonza/four-ways-to-chunk-an-array-e19c889eac4
 */
export function chunkArray<T>(array: T[], size: number) {
  const chunkedArr: T[][] = [];
  for (let i = 0; i < array.length; i++) {
    const last = chunkedArr[chunkedArr.length - 1];
    if (!last || last.length === size) {
      chunkedArr.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  return chunkedArr;
}
