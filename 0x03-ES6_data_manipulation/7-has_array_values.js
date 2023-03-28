const hasValuesFromArray = (set, array) => {
  for (const el of array) {
    if (!set.has(el)) {
      return false;
    }
  }
  return true;
};

export default hasValuesFromArray;
