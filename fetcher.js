const request = require("request");
const fs = require("fs");
const readline = require('readline');
const { F_OK, W_OK } = require("constants");

const url = process.argv.slice(2)[0];
const path = process.argv.slice(2)[1];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(url, (error, response, body) => {
  if (error) {
    throw error
  } else if(response.statusCode !== 200){
      throw new Error(`Error found: ERROR ${response.statusCode}`);
  } 
    fs.access(path, F_OK, (err) => {
      if(err){
        fs.writeFile(path, body, (err) => {
          if(err){
            throw new Error(`Need a valid path`);
          }
          console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
          rl.close();
        });
      }
        rl.question(`type y to overwrite otherwise type anything else to skip and close: `, (answer) =>{
          if(answer === 'y'){
            fs.writeFile(path, body, (err) => {
              if(err){
                throw new Error(`There was an error with path`);
              }
              console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
              rl.close();
            });
          }else{
              rl.close();
          }
        });
    }); 
});
