const data = [
    {
        img: 'beerbongs&bentleys.jpg',
        alt: 'Beerbongs & Bentleys',
        content: 'BeerBongs & Bentleys was released by Post Malone on 2018',
    },
    {
        img: 'chase_atlantic.jpg',
        alt: 'Chase Atlantic',
        content: 'The eponymous album, Chase Atlantic, was released in 2017',
    },
    {
        img: 'ICYMI.jpg',
        alt: 'ICYMI',
        content: 'In Case You Missed It, ICYMI, by EDEN was released in 2022',
    },
    {
        img: 'hypochondriac.jpg',
        alt: 'hypochondriac',
        content: 'hypochondriac by brakence was released in 2022',
    },
    {
        img: 'overthinker.jpg',
        alt: 'Overthinker',
        content: 'Overthinker by INZO was released in 2018',
    },
];


/*
    Create a static map of time slots
    map: timeSlots[day][hour]
 */
const timeSlots = [];
const hours = [
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
];
const days = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];
// initialize each slot as null
days.forEach((day) => {
    const slots = [];
    hours.forEach((hour) => {
        slots.push(null);
    });
    timeSlots.push(slots);
});


/*
    This code is responsible for creating timeslots
*/
class TimeSlot {
    constructor(data, day, time) {
        this.data = data;
        this.day = day;
        this.time = time
    }


    makeMarkup() {
        if (this.data != null)
            return `<td class="time-slot"><button><img src="${this.data.img}" alt="${this.data.alt}"></button></button></td>`;
        else
            return `<td class="time-slot"><button>empty</button></button></td>`;
    }

    makeElement() {
        // Create the <td> element
        const td = document.createElement('td');
        td.className = 'time-slot';

        // Create the <button> element
        const button = document.createElement('button');

        // Check if this.data is not null
        if (this.data !== null) {
            // Create the <img> element with src and alt attributes
            const img = document.createElement('img');
            img.src = this.data.img;
            img.alt = this.data.alt;

            // Append the <img> element to the <button>
            button.appendChild(img);
        } else {
            // Create a text node for "empty" and append it to the <button>
            const textNode = document.createTextNode('empty');
            button.appendChild(textNode);
        }

        // Append the <button> element to the <td>
        td.appendChild(button);
        return td;
    }
}


/*
    Create a function to open a menu for data selection
 */
function openDataSelection(data, slot, button) {
    // Create a div element for the menu
    const menuDiv = document.createElement('div');
    menuDiv.className = 'data-selection-menu';

    // Apply CSS styles for the background box
    menuDiv.style.position = 'absolute';
    menuDiv.style.background = '#f7f7f7'; // Background color
    menuDiv.style.border = '1px solid #ccc'; // Border
    menuDiv.style.padding = '10px'; // Padding

    // Prevent the menu from closing when clicking inside it
    menuDiv.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event propagation to the document
    });

    // Create a label for the menu
    const label = document.createElement('label');
    label.textContent = 'Select Data:';

    // Create radio buttons based on your data
    data.forEach((item, index) => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'dataSelection';
        radio.id = `dataOption${index}`;
        radio.value = index;

        // Create a label for the radio button
        const radioLabel = document.createElement('label');
        radioLabel.textContent = item.alt;
        radioLabel.htmlFor = `dataOption${index}`;

        // Append the radio button and label to the menu
        menuDiv.appendChild(radio);
        menuDiv.appendChild(radioLabel);
    });

    // Create an "Empty" option
    const emptyRadio = document.createElement('input');
    emptyRadio.type = 'radio';
    emptyRadio.name = 'dataSelection';
    emptyRadio.id = 'emptyOption';
    emptyRadio.value = -1;

    // Create a label for the "Empty" option
    const emptyLabel = document.createElement('label');
    emptyLabel.textContent = 'Empty';
    emptyLabel.htmlFor = 'emptyOption';

    // Append the "Empty" option and label to the menu
    menuDiv.appendChild(emptyRadio);
    menuDiv.appendChild(emptyLabel);

    // Add an "OK" button to confirm the selection
    const okButton = document.createElement('button');
    let selectedContent = null;
    okButton.textContent = 'OK';
    okButton.addEventListener('click', () => {
        // Get the selected radio button
        const selectedRadio = menuDiv.querySelector('input[name="dataSelection"]:checked');
        if (selectedRadio) {
            const selectedData = selectedRadio.value;
            const dataIndex = parseInt(selectedData);
            selectedContent = (dataIndex >= 0) ? data[dataIndex].content : null;

            /*
                Check the time slots.
                1. if selected content is null, set the time slot to a null time slot
                2. if selected content != null, set the time slot to that object
             */
                if (selectedContent == null) {
                    slot.data = null;
                    // Update the button with "empty"
                    button.innerHTML = 'empty';
                    button.title = 'Available time slot';
                } else {
                    slot.data = selectedContent;
                    // Update the button with the associated image
                    const img = document.createElement('img');
                    img.src = data[dataIndex].img;
                    img.alt = data[dataIndex].alt;
                    img.style.width = '100px';
                    img.style.height = 'same-as-width';
                    // Update the buttons title
                    button.innerHTML = '';
                    button.title = data[dataIndex].alt;
                    button.appendChild(img);
                }

            // Close the menu
            menuDiv.style.display = 'none';
        }
    });

    // Append the "OK" button to the menu
    menuDiv.appendChild(okButton);

    // Position the menu next to the button
    const buttonRect = button.getBoundingClientRect();
    menuDiv.style.position = 'absolute';
    menuDiv.style.top = `${buttonRect.bottom + window.scrollY}px`;
    menuDiv.style.left = `${buttonRect.left + window.scrollX}px`;

    // Append the menu to the document
    document.body.appendChild(menuDiv);


    // Add a click event listener to the document to close the menu when clicking outside
    document.addEventListener('click', () => {
        menuDiv.style.display = 'none';
    });

    // Display the menu
    menuDiv.style.display = 'block';
}


/*
    This fixes the document.
 */    
document.addEventListener('DOMContentLoaded', function () {
    // create a table element
    const table = document.createElement('table');

    // create the header row
    const headerRow = document.createElement('tr');

    headerRow.innerHTML = '<th class="day"></th>';
    hours.forEach(hour => {
        const th = document.createElement('th');
        th.className = 'hour';
        th.textContent = hour;
        headerRow.appendChild(th);
    });

    // Append the header row to the table
    table.appendChild(headerRow);

    // Create rows of buttons for each day
    days.forEach(day => {
        const row = document.createElement('tr');
        const dayHeader = document.createElement('th');
        dayHeader.className = 'day';
        dayHeader.textContent = day;
        row.appendChild(dayHeader);

        // Create empty time slot cells for each hour
        for (let i = 0; i < hours.length; i++) {
            let slot = new TimeSlot(null, day, hours[i]).makeElement();
            slot.className = 'time-slot';

            /*
                Initialize the time slots 
                timeSlots[day][hour]
             */
            timeSlots[days.indexOf(day)][hours.indexOf(hours[i])] = slot;

            let button = slot.querySelector('button');
            button.title = 'Available time slot.';
            // Add a click event listener to open the data selection menu
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event propagation to the document
                openDataSelection(data, slot, button);
            });

            row.appendChild(slot);
        }

        // Append the row to the table
        table.appendChild(row);
    });

    // Append the table to the container
    const container = document.getElementById("table");
    container.appendChild(table);
});