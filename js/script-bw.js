let currentID;

function fetchPhotos() {
    let mainContainer = document.getElementsByClassName("main-container")[1];

    fetch(
        'http://localhost:8080/photosBW',
        {
            method:'get'
        }   
        )
    .then(function(response){
        response.json().then((data)=>{
            for(let i=0; i<data.length; i++) {
                let photoContainer = document.createElement('div');
                photoContainer.setAttribute('class', 'photo-container');
            
                let descriptionTitle = document.createElement('div');
                descriptionTitle.setAttribute('class', 'description-title');
                descriptionTitle.innerText="Description";

                let photo = document.createElement('img');
                photo.setAttribute('class', 'photo');
                photo.setAttribute('src', data[i].url);

                let description = document.createElement('div');
                description.setAttribute('class', 'description');
                description.innerText=data[i].description;

                let edit = document.createElement('button');
                edit.setAttribute('class', 'created');
                edit.innerText = 'Edit';
                edit.onclick = function() {
                    document.getElementById('url').value = data[i].url;
                    document.getElementById('description-input').value = data[i].description;
                    currentID = data[i].id;
                }
                
                photoContainer.appendChild(photo);
                photoContainer.appendChild(descriptionTitle);
                photoContainer.appendChild(description);
                photoContainer.appendChild(edit);
                mainContainer.appendChild(photoContainer);
            }
        })
    })
}

function add() {
    let url = document.getElementById('url').value;
    let descriptionInput = document.getElementById('description-input').value;

    let newPhoto = {
        url: url,
        description: descriptionInput
    }

    fetch('http://localhost:8080/photosBW', 
        {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newPhoto)
        }).then(function(response) {
            window.location.reload();
        })
}

function update() {
    if (currentID!==-1) {
        let url = document.getElementById('url').value;
        let descriptionInput = document.getElementById('description-input').value;
        
        let newPhoto = {
            url: url,
            description: descriptionInput
        }

        fetch('http://localhost:8080/photosBW/' + currentID, 
        {
            method: 'put',
            headers:  {'Content-Type': 'application/json'},
            body: JSON.stringify(newPhoto)
        }).then(function(response) {
            window.location.reload();
        })

        currentID = -1;
    }

}

function deletePhoto() {
    if (currentID!==-1)

        fetch('http://localhost:8080/photosBW/' + currentID, 
        {
            method: 'delete'
        }).then(function(response) {
            window.location.reload();
        })

        currentID = -1;
}

fetchPhotos();