process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('readable', () => {
  const dataChunk = process.stdin.read();

  if (dataChunk) {
    process.stdout.write(`Your name is: ${dataChunk}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
