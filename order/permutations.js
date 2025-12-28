// Source: https://bit.ly/3hEZdCl
// Function to generate permutations of an array
const permutations = arr => {
  // Base case: if the array has 0 or 1 element, return the array
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;

  // Recursive case: generate permutations using reduce and recursion
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [
          item,
          ...val,
        ])
      ),
    []
  );
};