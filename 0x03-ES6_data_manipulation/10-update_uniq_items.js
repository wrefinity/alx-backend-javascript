/**
 * update the quantity of a grocery items to 100.
 * @param {Map<String, number>} map - A map of the name of a
 * grocery and its quantity
 */
export default function updateUniqueItems(map) {
  if (!(map instanceof Map)) {
    throw new Error('Cannot process');
  }
  map.forEach((val, key) => {
    if (val === 1) {
      map.set(key, 100);
    }
  });
}
