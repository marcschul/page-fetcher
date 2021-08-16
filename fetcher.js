const request = require('request');
const fs = require('fs');

const input = process.argv.slice(2); // index2++
const url = input[0];
const filePath = input[1];

request(url, (error, response, body) => {
  fs.writeFileSync(filePath, body, function (err) {
    if (err) return console.log(err);
    });
  const stats = fs.statSync(filePath);
  const bytes = stats.size;
  console.log(`Downloaded and saved ${bytes} bytes to ${filePath}`);
});