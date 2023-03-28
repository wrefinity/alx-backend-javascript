/**
 * get a map of groceries with their names and quantites
 * @returns {Map<string, Number>}
 */
export default function groceriesList() {
  const gro = [
    ['Apples', 10],
    ['Tomatoes', 10],
    ['Pasta', 1],
    ['Rice', 1],
    ['Banana', 5],
  ];
  return new Map(gro);
}
