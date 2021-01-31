
// Using proxy to avoid cors issue on the API's end
let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://randomuser.me/api/?results=12'

// Fetch request
fetch(proxyUrl + targetUrl)
    .then(data => data.json())
    .then(data => {
        console.log(data);
        createProfiles(data.results)
    })
    .catch(error => console.log('There was a problem: ', error))

// Comments
function createProfiles(data) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        gallery.insertAdjacentHTML('beforeend', `
            <div class="card" id="${i}">
                <div class="card-img-container">
                    <img class="card-img" src="${data[i].picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                    <p class="card-text">${data[i].email}</p>
                    <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
                </div>
            </div>
        `)    
    }
    const cards = document.querySelectorAll('.card');
    console.log(Array.from(cards));
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            createModal(parseInt(e.currentTarget.id), data)
        })
    })
}

// Comments
function createModal(index, data) {
    const modalWindow = document.createElement('div');
    let cellNumber = formatPhoneNumber(data[index].cell);
    let birthday = formatBirthdate(data[index].dob.date.substring(0,10));
    modalWindow.innerHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${data[index].picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data[index].name.first} ${data[index].name.last}</h3>
                    <p class="modal-text">${data[index].email}</p>
                    <p class="modal-text cap">${data[index].location.city}</p>
                <hr>
                    <p class="modal-text">${cellNumber}</p>
                    <p class="modal-text">${data[index].location.street.number} ${data[index].location.street.name}, 
                                          ${data[index].location.city}, 
                                          ${data[index].location.state}   
                                          ${data[index].location.postcode}</p>
                    <p class="modal-text">Birthday: ${birthday}</p>
                </div>
            </div>
        </div>
    `;
    document.querySelector('body').appendChild(modalWindow)
    const closeButton = document.getElementById('modal-close-btn');
    closeButton.addEventListener('click', (e) => {
        document.querySelector('body').removeChild(modalWindow)
    })
}


//Helper Functions

// Regex function to format phone numbers to (###) ###-####
function formatPhoneNumber(value) {
    let formatted = value.replace(/\D/g, '');
    console.log(formatted);
    let match = formatted.match(/^(\d{3})(\d{3})(\d{4})$/);
    console.log(match);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return 'Invalid Phone Number Format'
}

 // Regex function to format birthday values to MM/DD/YYYY
function formatBirthdate(value) {
    let nums = value.split('-');
    let newValue = `${nums[1]}-${nums[2]}-${nums[0]}`
    return newValue;
}