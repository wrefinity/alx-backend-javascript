export default function appendToEachArrayValue(array, appendString) {
  const appArray = [];
  for (const value of array) {
    appArray.push(appendString + value);
  }

  return appArray;
}
