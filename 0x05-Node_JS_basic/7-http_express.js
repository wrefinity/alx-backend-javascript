const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts students in a CSV data file.
 * @param {String} dataPath path to the CSV data file.
 * @author Andrew Wreford <https://github.com/wrefinity>
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataPath) {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const reports = [];
        const csvFile = data.toString('utf-8').trim().split('\n');
        const stdGroups = {};
        const csv_field = csvFile[0].split(',');
        const stdPropsNames = csv_field.slice(
          0,
          csv_field.length - 1,
        );

        for (const line of csvFile.slice(1)) {
          const stdRecord = line.split(',');
          const stdVals = stdRecord.slice(
            0,
            stdRecord.length - 1,
          );
          const field = stdRecord[stdRecord.length - 1];
          if (!Object.keys(stdGroups).includes(field)) {
            stdGroups[field] = [];
          }
          const stdEntries = stdPropsNames.map((propName, idx) => [
            propName,
            stdVals[idx],
          ]);
          stdGroups[field].push(Object.fromEntries(stdEntries));
        }

        const allStds = Object.values(stdGroups).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        reports.push(`Number of students: ${allStds}`);
        for (const [field, group] of Object.entries(stdGroups)) {
          reports.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(reports.join('\n'));
      }
    });
  }
});

app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (_, res) => {
  const feedbacks = ['This is the list of our students'];

  countStudents(DB_FILE)
    .then((report) => {
      feedbacks.push(report);
      const restxt = feedbacks.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', restxt.length);
      res.statusCode = 200;
      res.write(Buffer.from(restxt));
    })
    .catch((err) => {
      feedbacks.push(err instanceof Error ? err.message : err.toString());
      const restxt = feedbacks.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', restxt.length);
      res.statusCode = 200;
      res.write(Buffer.from(restxt));
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;
