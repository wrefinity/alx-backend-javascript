import fs from 'fs';

/**
 * Reads data of students in a CSV data file.
 * @param {String} dataPath path to the CSV data file.
 * @author Andrew Wreford <https://github.com/wrefinity>
 * @returns {Promise<{
 *   String: {firstname: String, lastname: String, age: number}[]
 * }>}
 */
const readDatabase = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataPath) {
    fs.readFile(dataPath, (err, data) => {
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
          const stdRec = line.split(',');
          const stdPropsVals = stdRec
            .slice(0, stdRec.length - 1);
          const field = stdRec[stdRec.length - 1];
          if (!Object.keys(stdGroups).includes(field)) {
            stdGroups[field] = [];
          }
          const studentEntries = stdPropsNames
            .map((propName, idx) => [propName, stdPropsVals[idx]]);
          stdGroups[field].push(Object.fromEntries(studentEntries));
        }
        resolve(stdGroups);
      }
    });
  }
});

export default readDatabase;
module.exports = readDatabase;
