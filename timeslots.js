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
/*
    This code is responsible for timeslots
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

// Create a function to open a menu for data selection
function openDataSelection(data, button) {
    // Create a div element for the menu
    const menuDiv = document.createElement('div');
    menuDiv.className = 'data-selection-menu';

     // Apply CSS styles for the background box
     menuDiv.style.position = 'absolute';
     menuDiv.style.background = '#f7f7f7'; // Background color
     menuDiv.style.border = '1px solid #ccc'; // Border
     menuDiv.style.padding = '10px'; // Padding

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
    okButton.textContent = 'OK';
    okButton.addEventListener('click', () => {
        // Get the selected radio button
        const selectedRadio = menuDiv.querySelector('input[name="dataSelection"]:checked');
        if (selectedRadio) {
            const selectedData = selectedRadio.value;
            const dataIndex = parseInt(selectedData);
            const selectedContent = (dataIndex >= 0) ? data[dataIndex].content : null;
            button.dataset.content = selectedContent;

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

    // Prevent the click event from propagating to the document, which would close the menu
    button.addEventListener('click', (e) => e.stopPropagation());

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

    // Create and append table headers for the hourss
    const hours = [
        '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
        '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
    ];

    headerRow.innerHTML = '<th class="day"></th>';
    hours.forEach(hour => {
        const th = document.createElement('th');
        th.className = 'hour';
        th.textContent = hour;
        headerRow.appendChild(th);
    });

    // Append the header row to the table
    table.appendChild(headerRow);

    // Create data for the days
    const days = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];

    // Create rows of buttons for each day
    days.forEach(day => {
        const row = document.createElement('tr');
        const dayHeader = document.createElement('th');
        dayHeader.className = 'day';
        dayHeader.textContent = day;
        row.appendChild(dayHeader);

        // Create empty time slot cells for each hour
        for (let i = 0; i < hours.length; i++) {
            const cell = new TimeSlot(null, day, hours[i]).makeElement();
            cell.className = 'time-slot';
            const button = cell.querySelector('button');

            // Add a click event listener to open the data selection menu
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event propagation to the document
                openDataSelection(data, button);
            });

            row.appendChild(cell);
        }

        // Append the row to the table
        table.appendChild(row);
    });

    // Append the table to the container
    const container = document.getElementById("table");
    container.appendChild(table);
});