const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
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
        const recorder = [];
        const csvFile = data.toString('utf-8').trim().split('\n');
        const stdGroups = {};
        const csvFields = csvFile[0].split(',');
        const stdPropsNames = csvFields.slice(
          0,
          csvFields.length - 1,
        );

        for (const line of csvFile.slice(1)) {
          const stdRecord = line.split(',');
          const studentPropValues = stdRecord.slice(
            0,
            stdRecord.length - 1,
          );
          const field = stdRecord[stdRecord.length - 1];
          if (!Object.keys(stdGroups).includes(field)) {
            stdGroups[field] = [];
          }
          const studentEntries = stdPropsNames.map((propName, idx) => [
            propName,
            studentPropValues[idx],
          ]);
          stdGroups[field].push(Object.fromEntries(studentEntries));
        }

        const allStds = Object.values(stdGroups).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        recorder.push(`Number of students: ${allStds}`);
        for (const [field, group] of Object.entries(stdGroups)) {
          recorder.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((std) => std.firstname).join(', '),
          ].join(' '));
        }
        resolve(recorder.join('\n'));
      }
    });
  }
});

const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const responseText = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const responseParts = ['This is the list of our students'];

      countStudents(DB_FILE)
        .then((report) => {
          responseParts.push(report);
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        })
        .catch((err) => {
          responseParts.push(err instanceof Error ? err.message : err.toString());
          const responseText = responseParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', responseText.length);
          res.statusCode = 200;
          res.write(Buffer.from(responseText));
        });
    },
  },
];

app.on('request', (req, res) => {
  for (const routeHandler of SERVER_ROUTE_HANDLERS) {
    if (routeHandler.route === req.url) {
      routeHandler.handler(req, res);
      break;
    }
  }
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
