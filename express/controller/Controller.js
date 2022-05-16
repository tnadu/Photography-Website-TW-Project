let express = require('express')
let router = express.Router();

const Service = require('../service/Service');

// Create
router.get("/photosColor", (req, res) => {
    console.log(req.query);
    // let newPhoto = Service.addPhoto(req.body);
    // res.status(200).send(newPhoto);
    res.status(200).json({});
  });
  
// Read One
router.get("/photos/:id", (req, res) => {
  const dogsList = readJSONFile();
  // Fill in your code here
});

// Read All
router.get("/dogs", (req, res) => {    //  req = request; res = response
  const dogsList = Service.getAllDogs();
  if (dogsList!==undefined && dogsList.length!==0) {
      res.status(200).send(dogsList);
  } else {
      res.status(204).send('No dog found!');
  }
});

// Update
router.put("/dogs/:id", (req, res) => {
  let foundDog = Service.updateDog(req.params.id, req.body.name, req.body.img);
  if (foundDog!==null) res.status(200).send(foundDog);
  else res.status(204).send('No dog found');
});
  
// Delete
router.delete("/dogs/:id", (req, res) => {
    let foundDog = Service.removeDog(req.params.id);
    res.status(200).send('Dog deleted!');
});
  

module.exports = router;