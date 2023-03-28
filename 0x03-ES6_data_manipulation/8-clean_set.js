/**
 * Join some strings using  a dash after stripping the leading sub string.
 * @param {Set<String>} set - A collection of strings.
 * @param {String} startString - The string to strip from the beginning
 * of each item in the set.
 * @returns {String}
 */
export default function cleanSet(set, startString) {
  const all_str = [];
  if (!set || !startString || !(set instanceof Set) || typeof startString !== 'string') {
    return '';
  }
  for (const val of set.values()) {
    if (typeof val === 'string' && val.startsWith(startString)) {
      const valSubStr = val.substring(startString.length);

      if (valSubStr && valSubStr !== val) {
        all_str.push(valSubStr);
      }
    }
  }
  return all_str.join('-');
}
