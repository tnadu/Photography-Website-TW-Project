let currentDogID;

function fetchDogs() {
    let body = document.getElementsByTagName("body")[0];
    let p = document.createElement('p');
    p.innerText = 'loading...';
    p.setAttribute('id', 'loading');
    body.appendChild(p);

    fetch('http://localhost:3000/dogs',
        {
            method:'get'
        }   
    ).then(function(response){
        response.json().then((data)=>{
            if(data.length) {
                console.log(data);
                body.removeChild(p);
            }

            for(let i=0; i<data.length; i++) {
                let image = document.createElement('img');
                image.setAttribute('src', data[i].img);
                image.width=100;
                body.appendChild(image);

                let h2 = document.createElement('h2');
                h2.innerText=data[i].name;
                body.appendChild(h2);

                let edit = document.createElement('button');
                edit.innerText = 'Edit';
                edit.onclick = function() {
                    document.getElementById('name').value = data[i].name;
                    document.getElementById('url').value = data[i].img;
                    currentDogID = data[i].id;
                }
                body.appendChild(edit);

                let Delete = document.createElement('button');
                Delete.innerText = 'Delete';
                Delete.onclick = function() {
                    deleteDog(data[i].id);
                }
                body.appendChild(Delete);

                let hr = document.createElement('hr');
                body.appendChild(hr);
            }
        })
    })
}

function addDog() {
    let body = document.getElementsByTagName('body')[0];
    let name = document.getElementById('name').value;
    let image = document.getElementById('url').value;

    let newDog = {
        name: name,
        img: image
    }

    fetch('http://localhost:3000/dogs', 
        {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newDog)
        }).then(function(response) {
            window.location.reload();
        })
}

function updateDog() {
    let name = document.getElementById('name').value;
    let image = document.getElementById('url').value;
    let newDog = {
        name: name,
        img: image
    }

    fetch('http://localhost:3000/dogs/' + currentDogID, 
    {
        method: 'put',
        headers:  {'Content-Type': 'application/json'},
        body: JSON.stringify(newDog)
    }).then(function(response) {
        window.location.reload();
    })
}

function deleteDog(id) {
    let name = document.getElementById('name').value;
    let image = document.getElementById('url').value;

    fetch('http://localhost:3000/dogs/' + id, 
    {
        method: 'delete'
    }).then(function(response) {
        window.location.reload();
    })
}

fetchDogs();