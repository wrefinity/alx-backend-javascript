export default function appendToEachArrayValue(arr, appendString) {
  const appended = [];
  for (const value of arr)
    appended.push(appendString + value);
  return appended;
}
