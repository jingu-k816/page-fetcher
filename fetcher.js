const request = require("request");
const fs = require("fs");
// const readline = require('readline');

const url = process.argv.slice(2)[0];
const path = process.argv.slice(2)[1];

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

request(url, (error, response, body) => {
  if (error) {
    throw error
  } else if(response.statusCode === 404){
      throw new Error(`The URL is invalid. Resource was not found`);
  } else if (response.statusCode === 500){
      throw new Error(`The server had an error`);
  } else{
    fs.writeFile(path, body, (err) => {
      if (err) {
        throw new Error(`Write a proper path`);
      } 
      console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
      
    });
  }
});
