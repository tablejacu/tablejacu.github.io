document.addEventListener('DOMContentLoaded', function () {

    // =========================================================================
    // === EDIT YOUR SCHEDULE HERE =============================================
    // =========================================================================
    // Instructions:
    // 1. To add a new time slot, copy one of the blocks inside the brackets [ ... ].
    // 2. A block starts with { and ends with }.
    // 3. For an empty slot, just use an empty string: "".
    // 4. Use '<br>' to create a new line within a cell.
    // =========================================================================

    const scheduleData = [
        {
            time: "09:00 - 10:00",
            monday: { subject: "Mathematics", details: "Room 101<br>Prof. Smith" },
            tuesday: { subject: "Physics", details: "Lab A<br>Dr. Jones" },
            wednesday: "",
            thursday: { subject: "Mathematics", details: "Room 101<br>Prof. Smith" },
            friday: { subject: "Chemistry", details: "Lab B<br>Dr. Davis" }
        },
        {
            time: "10:00 - 11:00",
            monday: { subject: "English Lit.", details: "Room 203<br>Ms. White" },
            tuesday: { subject: "Physics", details: "Lab A<br>Dr. Jones" },
            wednesday: { subject: "History", details: "Auditorium<br>Mr. Brown" },
            thursday: { subject: "English Lit.", details: "Room 203<br>Ms. White" },
            friday: { subject: "Free Period", details: "" }
        },
        {
            time: "11:00 - 12:00",
            monday: { subject: "Computer Science", details: "CS Lab<br>Mr. Green" },
            tuesday: "",
            wednesday: { subject: "History", details: "Auditorium<br>Mr. Brown" },
            thursday: { subject: "Computer Science", details: "CS Lab<br>Mr. Green" },
            friday: { subject: "P.E.", details: "Gymnasium" }
        },
        {
            time: "12:00 - 01:00",
            time_display: "LUNCH BREAK", // Special display for merged cells
            monday: "LUNCH",
            tuesday: "LUNCH",
            wednesday: "LUNCH",
            thursday: "LUNCH",
            friday: "LUNCH",
        },
        {
            time: "01:00 - 02:00",
            monday: { subject: "Geography", details: "Room 301<br>Mrs. Taylor" },
            tuesday: { subject: "Biology", details: "Lab C<br>Dr. Clark" },
            wednesday: { subject: "Art", details: "Studio 1<br>Ms. Adams" },
            thursday: "",
            friday: { subject: "Biology", details: "Lab C<br>Dr. Clark" }
        }
    ];

    // =========================================================================
    // === NO NEED TO EDIT BELOW THIS LINE =====================================
    // =========================================================================

    const timetableBody = document.getElementById('timetable-body');
    const themeToggle = document.getElementById('theme-toggle');
    const lastUpdated = document.getElementById('last-updated');
    
    // Set last updated date
    lastUpdated.textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Function to generate the table
    function generateTable() {
        timetableBody.innerHTML = ''; // Clear existing rows

        scheduleData.forEach(slot => {
            const row = document.createElement('tr');

            // Handle special cases like LUNCH break
            if (slot.monday === "LUNCH") {
                row.innerHTML = `
                    <td class="time-slot">${slot.time}</td>
                    <td colspan="5" style="background-color: #efefef; font-weight: bold;">${slot.time_display || 'LUNCH BREAK'}</td>
                `;
                if(document.body.classList.contains('dark-mode')) {
                   row.querySelector('td[colspan="5"]').style.backgroundColor = '#2d2d2d';
                }
            } else {
                 // Regular time slot
                let rowHTML = `<td class="time-slot" data-label="Time">${slot.time}</td>`;
                const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

                days.forEach(day => {
                    const entry = slot[day];
                    if (typeof entry === 'object' && entry !== null && entry.subject) {
                        rowHTML += `<td data-label="${day.charAt(0).toUpperCase() + day.slice(1)}">
                                        <span class="subject">${entry.subject}</span>
                                        <span class="details">${entry.details}</span>
                                    </td>`;
                    } else {
                        rowHTML += `<td data-label="${day.charAt(0).toUpperCase() + day.slice(1)}"></td>`;
                    }
                });
                row.innerHTML = rowHTML;
            }
            timetableBody.appendChild(row);
        });
    }

    // Function to highlight the current day
    function highlightCurrentDay() {
        const today = new Date().getDay(); // Sunday: 0, Monday: 1, ...
        if (today >= 1 && today <= 5) { // Monday to Friday
            const cells = document.querySelectorAll(`.timetable td:nth-child(${today + 1}), .timetable th:nth-child(${today + 1})`);
            cells.forEach(cell => cell.classList.add('current-day'));
        }
    }

    // Theme toggler logic
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark-mode';
        }
        localStorage.setItem('theme', theme);
        generateTable(); // Regenerate table to apply correct styles for special rows
    });

    // Initial setup
    generateTable();
    highlightCurrentDay();
});
