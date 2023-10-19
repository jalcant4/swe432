import {data} from 'data.js';
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
    
        // Create rows for each day
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
    
                row.appendChild(cell);
            }
    
            // Append the row to the table
            table.appendChild(row);
        });
    
        // Append the table to the container
        const container = document.getElementById("table");
        container.appendChild(table);
    });