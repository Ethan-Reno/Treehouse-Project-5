let searchProfiles = [];

// Generate profile data for each employee generated from the API fetch
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
    // Generate a modal window for a user that is selected
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            createModal(parseInt(e.currentTarget.id), data)
        })
    })
}

// Generate a modal window with data from the API fetch
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
            <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `;
    document.querySelector('body').appendChild(modalWindow)
    
    // Close the modal window when clicking the X
    const closeButton = document.getElementById('modal-close-btn');
    closeButton.addEventListener('click', (e) => {
        document.querySelector('body').removeChild(modalWindow)
    })

    // Display prev and next buttons on modal windows
    const prev = document.getElementById('modal-prev');
    const next = document.getElementById('modal-next');
    if (index === 0) {
        prev.style.display = "none";
    } else if (index === 11) {
        next.style.display = "none";
    }

    // Move between modal windows with prev and next
    prev.addEventListener('click', (e) => {
        document.querySelector('body').removeChild(modalWindow)
        createModal(index - 1, data)
    });
    next.addEventListener('click', (e) => {
        document.querySelector('body').removeChild(modalWindow)
        createModal(index + 1, data)
    });
}

// Add search bar
const searchBar = document.querySelector('.search-container');
searchBar.innerHTML =`
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
`;

// Search bar functionality
function filterProfiles(searchInput, data) {
    searchProfiles = [];
    // Push profiles to filteredProfiles array
    data.forEach(profile => {
        if (profile.name.first.toLowerCase().includes(searchInput) || profile.name.last.toLowerCase().includes(searchInput)){
            searchProfiles.push(profile);
        }
    })
    // Generate new profile cards using searchProfiles array
    createProfiles(searchProfiles);
}

// Helper Functions

// Regex function to format phone numbers to (###) ###-####
function formatPhoneNumber(value) {
    let formatted = value.replace(/\D/g, '');
    let match = formatted.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
}

 // Regex function to format birthday values to MM/DD/YYYY
function formatBirthdate(value) {
    let nums = value.split('-');
    let newValue = `${nums[1]}-${nums[2]}-${nums[0]}`
    return newValue;
}