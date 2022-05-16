const uuid = require("uuid");
const Repository = require('../repository/Repository');

module.exports.getAllPhotos = (type) => {
    const photoList = Repository.readJSONFile(type);
    return photoList;
}

module.exports.addPhoto = (newPhoto, type) => {
    const photoList = Repository.readJSONFile(type);
    newPhoto.id=uuid.v4.apply();
    photoList.push(newPhoto);
    Repository.writeJSONFile(photoList, type);
    return newPhoto
}

module.exports.updatePhoto = (photoID, photoURL, photoDescription, type) => {
    const photoList = Repository.readJSONFile(type);
  
    let foundPhoto=null;
    for (let i=0; i<photoList.length; i++) 
        if (photoList[i].id===photoID) {
            photoList[i].url=photoURL;
            photoList[i].description=photoDescription;
            foundPhoto=photoList[i];
            break;
        }
  
    Repository.writeJSONFile(photoList, type);
    return foundPhoto;
}

module.exports.removePhoto = (id, type) => {
    const photoList = Repository.readJSONFile(type);
    
    for (let i=0; i<photoList.length; i++) 
        if (photoList[i].id===id) {
            photoList.splice(i, 1);  //  remove photo
            foundPhoto=photoList[i];
            break;
        }
    
    Repository.writeJSONFile(photoList);
    return foundPhoto
}