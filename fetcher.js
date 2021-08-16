const request = require('request');
const fs = require('fs');
const readline = require('readline');

const input = process.argv.slice(2); // index2++
const url = input[0];
const filePath = input[1];

request(url, (error, response, body) => {
  const fileExists = fs.existsSync(filePath);
  if (fileExists === false) {
    fs.writeFileSync(filePath, body, function (err) {
      if (err) return console.log(err);
      });
    const stats = fs.statSync(filePath);
    const bytes = stats.size;
    console.log(`Downloaded and saved ${bytes} bytes to ${filePath}`);
  } else {
    let answer = 'y';
    let answer1 = 'Y';
    const rl = readline.createInterface({input: process.stdin,
                                         output: process.stdout});
    rl.question(`Do you want to overwrite ${filePath}?`, (userInput) => {
      if (userInput.trim() === answer || userInput.trim() === answer1) {
        fs.writeFileSync(filePath, body, function (err) {
          if (err) return console.log(err);
          });
        const stats = fs.statSync(filePath);
        const bytes = stats.size;
        console.log(`Overwritten and saved ${bytes} to ${filePath}`);
        rl.close();
      } else {
        console.log(`Did not overwrite ${filePath}`)
        rl.close();
      }
    });
  }
});