// Define the galleryItem class
class GalleryItem {
    constructor(img, alt, content) {
        this.img = img;
        this.alt = alt;
        this.content = content;
    }

    makeMarkup() {
        return `<div class="gallery-item"><img src="${this.img}" alt="${this.alt}"><p class="description">${this.content}</p></div>`;
    }

    makeElement() {
        // Create the main div for the gallery item
        const galleryItemElement = document.createElement('div');
        galleryItemElement.classList.add('gallery-item');

        // Create the image element
        const image = document.createElement('img');
        image.src = this.img;
        image.alt = this.alt;

        // Create the description
        const description = document.createElement('p');
        description.classList.add('description');
        description.textContent = this.content;

        // Append the image and description to the gallery item
        galleryItemElement.appendChild(image);
        galleryItemElement.appendChild(description);

        return galleryItemElement;
    }
}

// Data for gallery items
const galleryData = [
    {
        img: 'placeholder1.jpg',
        alt: 'Image 1',
        content: 'Play 1',
    },
    {
        img: 'placeholder2.jpg',
        alt: 'Image 2',
        content: 'Play 2',
    },
    {
        img: 'placeholder3.jpg',
        alt: 'Image 3',
        content: 'Play 3',
    },
    {
        img: 'placeholder4.jpg',
        alt: 'Image 4',
        content: 'Play 4',
    },
    {
        img: 'placeholder5.jpg',
        alt: 'Image 5',
        content: 'Play 5',
    },
];

// Get the gallery container
const galleryContainer = document.querySelector('.gallery');

// Loop through the gallery data and create gallery items
galleryData.forEach(itemData => {
    const galleryItem = new GalleryItem(itemData.img, itemData.alt, itemData.content);
    galleryContainer.appendChild(galleryItem.makeElement());
});
