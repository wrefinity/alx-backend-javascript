const fs = require('fs');

/**
 * Counts students in a CSV data file.
 * @param {String} dataPath path to the CSV data file.
 * @author Andrew Wreford <https://github.com/wrefinity>
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    if (data) {
      const csvFile = data
        .toString('utf-8')
        .trim()
        .split('\n');
      const stdGroups = {};
      const csvFields = csvFile[0].split(',');
      const stdPropsNames = csvFields
        .slice(0, csvFields.length - 1);

      for (const line of csvFile.slice(1)) {
        const stdRecord = line.split(',');
        const stdPropsValues = stdRecord
          .slice(0, stdRecord.length - 1);
        const field = stdRecord[stdRecord.length - 1];
        if (!Object.keys(stdGroups).includes(field)) {
          stdGroups[field] = [];
        }
        const studentEntries = stdPropsNames
          .map((propName, idx) => [propName, stdPropsValues[idx]]);
        stdGroups[field].push(Object.fromEntries(studentEntries));
      }

      const allStudents = Object
        .values(stdGroups)
        .reduce((pre, cur) => (pre || []).length + cur.length);
      console.log(`Number of students: ${allStudents}`);
      for (const [field, group] of Object.entries(stdGroups)) {
        const stdNames = group.map((st) => st.firstname).join(', ');
        console.log(`Number of students in ${field}: ${group.length}. List: ${stdNames}`);
      }
      resolve(true);
    }
  });
});

module.exports = countStudents;
