let express = require('express')
let router = express.Router();

const dogService = require('../service/dogService');

// Create
router.post("/dogs", (req, res) => {
    let newDog = dogService.addDog(req.body);
    res.status(200).send(newDog);
  });
  
// Read One
router.get("/dogs/:id", (req, res) => {
  const dogsList = readJSONFile();
  // Fill in your code here
});

// Read All
router.get("/dogs", (req, res) => {    //  req = request; res = response
  const dogsList = dogService.getAllDogs();
  if (dogsList!==undefined && dogsList.length!==0) {
      res.status(200).send(dogsList);
  } else {
      res.status(204).send('No dog found!');
  }
});

// Update
router.put("/dogs/:id", (req, res) => {
  let foundDog = dogService.updateDog(req.params.id, req.body.name, req.body.img);
  if (foundDog!==null) res.status(200).send(foundDog);
  else res.status(204).send('No dog found');
});
  
// Delete
router.delete("/dogs/:id", (req, res) => {
    let foundDog = dogService.removeDog(req.params.id);
    res.status(200).send('Dog deleted!');
});
  

module.exports = router;