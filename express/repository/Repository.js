const fs = require("fs");

// Reading function from db.json file
module.exports.readJSONFile = (type) => {
  if (type==='color')
    return JSON.parse(fs.readFileSync("db.json"))["photosColor"];
  else 
    return JSON.parse(fs.readFileSync("db.json"))["photosBW"];
  }
  
// Writing function from db.json file
module.exports.writeJSONFile = (content, type) => {
  let location;
  if (type==='color') location = 'photosColor';
  else location='photosBW';

  fs.writeFileSync(
    "db.json",
    JSON.stringify({ location: content }, null, 4),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}