
// Using proxy to avoid cors issue on the API's end
let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://randomuser.me/api/?results=12&nat=us,ca'

// Fetch request
// Grabs 12 profiles from the randomuser.me API, and generates profiles to be displayed on the page
// Adds an event listener to gather form data in the search bar
fetch(proxyUrl + targetUrl)
    .then(data => data.json())
    .then(data => {
        createProfiles(data.results)
    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        filterProfiles(e.target.firstElementChild.value.toLowerCase(), data.results);
    })
})
   .catch(error => console.log('There was a problem: ', error));