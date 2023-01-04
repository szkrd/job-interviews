# Repeated String

There is a string, `s`, of lowercase English letters that is repeated infinitely many times.
Given an integer, `n`, find and print the number of letter **a**'s in the first `n` letters of the infinite string.

## Example

```js
s = 'abcac'
n = 10
```

The substring we consider is `abcacabcac`, the first **10** characters of the infinite string.
There are **4** occurrences of a in the substring.

## Function Description

Complete the repeatedString function in the editor below.
`repeatedString` has the following parameter(s):

1. `s`: a string to repeat
2. `n`: the number of characters to consider

## Returns

1. `int`: the frequency of a in the substring

## Input Format

1. The first line contains a single string, `s`.
2. The second line contains an integer, `n`.

## Constraints

- n <= |s| <= 100
- 1 <= n <= 10^12
- For 25% of the test cases, n <= 10^6

## Sample Input

### Sample Input 0

```
aba
10
```

### Sample Output 0

```
7
```

### Explanation 0

The first `n = 10` letters of the infinite string are `abaabaabaa`.
Because there are **7** `a`'s, we return **7**.
