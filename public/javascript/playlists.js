let data = null;

// Function to load data from the API
async function fetchImagesFromServer() {
    try {
        //server endpoint
        const response = await fetch('/api/images');
        data = await response.json();
        populateGallery();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call fetchImagesFromServer immediately when the script is executed
fetchImagesFromServer();

// Function to populate the gallery
function populateGallery() {
    const galleryContainer = document.querySelector('.gallery');
    galleryContainer.innerHTML = ''; // Clear existing content

    if (data && data.length > 0) { // Check if data is available and not empty
        data.forEach((itemData) => {
            // Assuming you have a DataObj class defined somewhere
            const dataObj = new DataObj(itemData.image, itemData.alt, itemData.content);
            galleryContainer.appendChild(dataObj.makeElement());
        });
    } else {
        console.log('No data available.');
    }
}

// DataObj class
class DataObj {
    constructor(image, alt, content) {
        this.image = image;
        this.alt = alt;
        this.content = content;
    }

    makeMarkup() {
        return `<div class="gallery-item"><img src="${this.image}" alt="${this.alt}"><p class="description">${this.content}</p></div>`;
    }


    // makeElement is an example of modifying a DOM element by abstraction
    makeElement() {
        // Create the main div for the gallery item
        const dataObjElement = document.createElement('div');
        dataObjElement.classList.add('gallery-item');

        // Create the image element
        const image = document.createElement('img');
        image.src = this.image;
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

const galleryContainer = document.querySelector('.gallery');
// This code adds functionality to the search bar and is an example of form validation
// Wrap the code in an event listener for the 'DOMContentLoaded' event, this is an example of a different event type
document.addEventListener('DOMContentLoaded', function() {
    // Get the search input field and search button
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    // nested function that facilitates search
    function search() {
        // Get search terms
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm === '') {
            // If the search term is empty, show all items
            populateGallery();
            return;
        }
    
        // Clear the current content of the gallery container
        galleryContainer.innerHTML = '';

        const searchTerms = searchTerm.split(/\s+/);
        
        const searchResults = data.filter(item =>
            searchTerms.every(term =>
                item.content.toLowerCase().includes(term)
            )
        );
    
        // Create and append the gallery items for the search results
        searchResults.forEach(itemData => {
            const dataObj = new DataObj(itemData.image, itemData.alt, itemData.content);
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
