const data = [
    {
        img: 'beerbongs&bentleys.jpg',
        alt: 'Beerbongs & Bentleys',
        content: 'BeerBongs & Bentleys was released by Post Malone on 2018',
        timeslots: [],
    },
    {
        img: 'chase_atlantic.jpg',
        alt: 'Chase Atlantic',
        content: 'The eponymous album, Chase Atlantic, was released in 2017',
        timeslots: [],
    },
    {
        img: 'ICYMI.jpg',
        alt: 'ICYMI',
        content: 'In Case You Missed It, ICYMI, by EDEN was released in 2022',
        timeslots: [],
    },
    {
        img: 'hypochondriac.jpg',
        alt: 'hypochondriac',
        content: 'hypochondriac by brakence was released in 2022',
        timeslots: [],
    },
    {
        img: 'overthinker.jpg',
        alt: 'overthinker',
        content: 'Overthinker by INZO was released in 2018',
        timeslots: [],
    },
];

// DataObj class
class DataObj {
    constructor(img, alt, content, timeslots) {
        this.img = img;
        this.alt = alt;
        this.content = content;
        this.timeslots = timeslots;
    }

    makeMarkup() {
        return `<div class="gallery-item"><img src="${this.img}" alt="${this.alt}"><p class="description">${this.content}</p></div>`;
    }


    // makeElement is an example of modifying a DOM element by abstraction
    makeElement() {
        // Create the main div for the gallery item
        const dataObjElement = document.createElement('div');
        dataObjElement.classList.add('gallery-item');

        // Create the image element
        const image = document.createElement('img');
        image.src = this.img;
        image.alt = this.alt;

        // Create the description
        const description = document.createElement('p');
        description.classList.add('description');
        description.textContent = this.content;

        // Append the image and description to the gallery item
        dataObjElement.appendChild(image);
        dataObjElement.appendChild(description);

        return dataObjElement;
    }
}

/* 
    This section is responsible for the gallery
 */
const galleryContainer = document.querySelector('.gallery');
// Loop through the gallery data and create gallery items
data.forEach(itemData => {
    const dataObj = new DataObj(itemData.img, itemData.alt, itemData.content, itemData.date);
    galleryContainer.appendChild(dataObj.makeElement());
});


// This code adds functionality to the search bar and is an example of form validation
// Wrap the code in an event listener for the 'DOMContentLoaded' event, this is an example of a different event type
document.addEventListener('DOMContentLoaded', function() {
    // Get the search input field and search button
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    // nested function that facilitates search
    function search() {
        // Get search terms
        const searchTerm = searchInput.value;
        const searchTerms = searchTerm.split(/\s+/);

        // Clear the current content of the gallery container
        galleryContainer.innerHTML = '';

        let searchResults = [];
        if (searchTerms.includes('OR')) {
            // If 'OR' is in the search terms, perform an 'OR' operation
            const orTerms = searchTerm.split(' OR ');
            orTerms.forEach(term => {
                term = term.trim().toLowerCase();
                const orResults = data.filter(item => item.content.toLowerCase().includes(term));
                searchResults = searchResults.concat(orResults);
            });
        } else {
            // Regular search without logical operations
            const lowerSearchTerm = searchTerm.toLowerCase();
            searchResults = data.filter(item => item.content.toLowerCase().includes(lowerSearchTerm));
        }

        // Create and append the gallery items for the search results
        searchResults.forEach(itemData => {
            const dataObj = new DataObj(itemData.img, itemData.alt, itemData.content, itemData.date);
            galleryContainer.appendChild(dataObj.makeElement());
        });
    }

    // Add a click event listener to the search button
    searchButton.addEventListener('click', () => {
        search();
    });

    // Add a keydown listener for Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter')
            search();
    });
});
