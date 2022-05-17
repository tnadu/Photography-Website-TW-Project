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
        Repository.writeJSONFile(color, bw); 
    }
    
    else {
        const color = Repository.readJSONFile(1);
        const bw = Repository.readJSONFile(0);
        newPhoto.id=uuid.v4.apply();
        bw.push(newPhoto);
        Repository.writeJSONFile(color, bw); 
    }
    
    return newPhoto
}

module.exports.updatePhoto = (photo, type) => {
    const photoList = Repository.readJSONFile(type);
  
    let foundPhoto = null;
    for (let i=0; i<photoList.length; i++) 
        if (photoList[i].id===photo.params.id) {
            photoList[i].url=photo.body.url;
            photoList[i].description=photo.body.description;
            foundPhoto=photoList[i];
            break;
        }
    
    if (foundPhoto) {
        if (type===1) {
            const bw = Repository.readJSONFile(0);
            Repository.writeJSONFile(photoList, bw); 
        }
        
        else {
            const color = Repository.readJSONFile(1);
            Repository.writeJSONFile(color, photoList); 
        }

        return foundPhoto;
    }
    else return undefined;
}

module.exports.removePhoto = (photoID, type) => {
    let photoList = Repository.readJSONFile(type);
    
    let foundPhoto = null;
    for (let i=0; i<photoList.length; i++)
        if (photoList[i].id===photoID) {
            foundPhoto = photoList[i];
            photoList.splice(i, 1);
            break;
        }
    
    if (type===1) {
        const bw = Repository.readJSONFile(0);
        Repository.writeJSONFile(photoList, bw); 
    }
    
    else {
        const color = Repository.readJSONFile(1);
        Repository.writeJSONFile(color, photoList); 
    }

    return foundPhoto;
}