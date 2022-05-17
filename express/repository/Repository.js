const fs = require("fs");

// Reading function from db.json file
module.exports.readJSONFile = (type) => {
  if (type===1)
    return JSON.parse(fs.readFileSync("db.json"))["photosColor"];
  else 
    return JSON.parse(fs.readFileSync("db.json"))["photosBW"];
  }
  
// Writing function from db.json file
module.exports.writeJSONFile = (color, bw) => {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ photosColor: color, photosBW: bw }, null, 4),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}