const uuid = require("uuid");
const dogRepository = require('../repository/dogRepository');

module.exports.getAllDogs = () => {
    const dogList = dogRepository.readJSONFile();
    return dogList;
}

module.exports.addDog = (newDog) => {
    const dogList = dogRepository.readJSONFile();
    newDog.id=uuid.v4.apply();
    dogList.push(newDog);
    dogRepository.writeJSONFile(dogList)
    return newDog
}

module.exports.updateDog = (dogID, dogName, dogImg) => {
    const dogList = dogRepository.readJSONFile();
  
    let foundDog=null;
    for (let i=0; i<dogList.length; i++) 
        if (dogList[i].id===dogID) {
            dogList[i].name=dogName;
            dogList[i].img=dogImg;
            foundDog=dogList[i];
            break;
        }
  
    dogRepository.writeJSONFile(dogList);
    return foundDog;
}

module.exports.removeDog = (id) => {
    const dogList = dogRepository.readJSONFile();
    
    for (let i=0; i<dogList.length; i++) 
        if (dogList[i].id===id) {
            dogList.splice(i, 1);  //  remove dog
            foundDog=dogList[i];
            break;
        }
    
    dogRepository.writeJSONFile(dogList);
    return foundDog
}