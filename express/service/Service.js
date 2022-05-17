const uuid = require("uuid");
const Repository = require('../repository/Repository');

module.exports.getAllPhotos = (type) => {
    const photoList = Repository.readJSONFile(type);
    return photoList;
}

module.exports.addPhoto = (newPhoto, type) => {
    if (type===1) {
        const color = Repository.readJSONFile(1);
        const bw = Repository.readJSONFile(0);
        newPhoto.id=uuid.v4.apply();
        color.push(newPhoto);
        Repository.writeJSONFile(color, bw, 1); 
    }
    
    else {
        const color = Repository.readJSONFile(1);
        const bw = Repository.readJSONFile(0);
        newPhoto.id=uuid.v4.apply();
        bw.push(newPhoto);
        Repository.writeJSONFile(color, bw, 1); 
    }
    
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
    
    if (type===1) {
        const color = photoList;
        const bw = Repository.readJSONFile(0);
        Repository.writeJSONFile(color, bw, 1); 
    }
    
    else {
        const color = Repository.readJSONFile(1);
        const bw = photoList;
        Repository.writeJSONFile(color, bw, 1); 
    }

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
    
    if (type===1) {
        const color = photoList;
        const bw = Repository.readJSONFile(0);
        Repository.writeJSONFile(color, bw, 1); 
    }
    
    else {
        const color = Repository.readJSONFile(1);
        const bw = photoList;
        Repository.writeJSONFile(color, bw, 1); 
    }

    Repository.writeJSONFile(photoList);
    return foundPhoto
}