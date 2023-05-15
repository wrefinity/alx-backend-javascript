const fs = require('fs');

/**
 * Counts students in a CSV data file.
 * @param {String} dataPath path to the CSV data file.
 * @author Andrew Wreford <https://github.com/wrefinity>
 */
const countStudents = (dataPath) => {
  if (!fs.existsSync(dataPath)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }
  const csvFile = fs
    .readFileSync(dataPath, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');
  const stdGroups = {};
  const csvFiels = csvFile[0].split(',');
  const stdNames = csvFiels.slice(0, csvFiels.length - 1);

  for (const line of csvFile.slice(1)) {
    const stdRecords = line.split(',');
    const stdVals = stdRecords.slice(0, stdRecords.length - 1);
    const field = stdRecords[stdRecords.length - 1];
    if (!Object.keys(stdGroups).includes(field)) {
      stdGroups[field] = [];
    }
    const stdEntries = stdNames
      .map((propName, idx) => [propName, stdVals[idx]]);
    stdGroups[field].push(Object.fromEntries(stdEntries));
  }

  const allStds = Object
    .values(stdGroups)
    .reduce((pre, cur) => (pre || []).length + cur.length);
  console.log(`Number of students: ${allStds}`);
  for (const [field, group] of Object.entries(stdGroups)) {
    const stdNames = group.map((st) => st.firstname).join(', ');
    console.log(`Number of students in ${field}: ${group.length}. List: ${stdNames}`);
  }
};

module.exports = countStudents;
