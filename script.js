document.addEventListener('DOMContentLoaded', function () {
    // Data remains the same from your document.
    const syllabusData = [
        { ch_no: "01", english: "The Crow and the Deer", accountancy: "Accounting - An Introduction", economics: "Overview of Indian economy", bus_studies: "Nature and scope of business", data_entry: "Basics of computer" },
        { ch_no: "02", english: "Mary Kom's Interview", accountancy: "Accounting Concepts", economics: "Economic planning in india", bus_studies: "Business support services", data_entry: "Operating system" },
        { ch_no: "03", english: "An Astrologer's Day", accountancy: "Accounting Conventions and Standards", economics: "Economic growth and economic development", bus_studies: "Business environment", data_entry: "Basics of word processing" },
        // ... (the rest of your data from the previous step is assumed here) ...
        { ch_no: "27", english: "Appearing for an Interview", accountancy: "Issue of shares", economics: "Theory of income determination", bus_studies: "", data_entry: "" },
        { ch_no: "28", english: "", accountancy: "Forfeiture of shares", economics: "Money and banking", bus_studies: "", data_entry: "" },
        { ch_no: "29", english: "", accountancy: "Reissue of forfeited shares", economics: "Government and the budget", bus_studies: "", data_entry: "" },
        { ch_no: "30", english: "", accountancy: "Issue of debentures", economics: "", bus_studies: "", data_entry: "" },
        { ch_no: "31", english: "", accountancy: "Financial statements analysis an introduction", economics: "", bus_studies: "", data_entry: "" },
        { ch_no: "32", english: "", accountancy: "Accounting ratios I", economics: "", bus_studies: "", data_entry: "" },
        { ch_no: "33", english: "", accountancy: "Accounting ratios II", economics: "", bus_studies: "", data_entry: "" },
        { ch_no: "34", english: "", accountancy: "Cash flow statement", economics: "", bus_studies: "", data_entry: "" },
        { ch_no: "35", english: "", accountancy: "Electronic spreadsheet", economics: "", bus_studies: "", data_entry: "" },
        { ch_no: "36", english: "", accountancy: "Use of spreadsheet in business application", economics: "", bus_studies: "", data_entry: "" },
        { ch_no: "37", english: "", accountancy: "Graphs and charts for business", economics: "", bus_studies: "", data_entry: "" },
        { ch_no: "38", english: "", accountancy: "Database management system for accounting", economics: "", bus_studies: "", data_entry: "" }
    ];

    const sideMenu = document.getElementById('side-menu');
    const subjectTitle = document.getElementById('subject-title');
    const chapterTableBody = document.getElementById('chapter-table-body');
    const themeToggle = document.getElementById('theme-toggle');

    // Load completion status from localStorage or initialize a new object
    let completionStatus = JSON.parse(localStorage.getItem('completionStatus')) || {};

    // Dynamically create the side menu
    function createSideMenu() {
        const subjects = Object.keys(syllabusData[0]).filter(key => key !== 'ch_no');
        
        let menuHTML = '<div class="menu-title">Subjects</div>';
        subjects.forEach(subject => {
            const subjectName = subject.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            menuHTML += `<div class="side-menu-item" data-subject="${subject}">${subjectName}</div>`;
        });
        sideMenu.innerHTML = menuHTML;
        
        // Add event listeners to menu items
        document.querySelectorAll('.side-menu-item').forEach(item => {
            item.addEventListener('click', handleMenuClick);
        });
    }

    // Handle clicks on menu items
    function handleMenuClick(event) {
        // Update active class
        document.querySelectorAll('.side-menu-item').forEach(item => item.classList.remove('active'));
        event.target.classList.add('active');
        
        const subjectKey = event.target.dataset.subject;
        displaySubjectTable(subjectKey);
    }

    // Display the table for the selected subject
    function displaySubjectTable(subjectKey) {
        const subjectName = subjectKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        subjectTitle.textContent = subjectName;
        chapterTableBody.innerHTML = ''; // Clear existing table

        syllabusData.forEach(chapter => {
            const chapterName = chapter[subjectKey];
            if (chapterName && chapterName.trim() !== "") {
                const chapterId = `${subjectKey}-${chapter.ch_no}`;
                const isCompleted = completionStatus[chapterId] || false;
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><input type="checkbox" data-chapter-id="${chapterId}" ${isCompleted ? 'checked' : ''}></td>
                    <td>${chapter.ch_no}</td>
                    <td>
                        <span class="chapter-name" data-original-text="${chapterName}">${chapterName}</span>
                    </td>
                `;
                chapterTableBody.appendChild(row);

                // Immediately update text if completed on load
                if (isCompleted) {
                    const nameSpan = row.querySelector('.chapter-name');
                    nameSpan.textContent = "Completed";
                    nameSpan.classList.add("completed-text");
                }
            }
        });

        // Add event listeners to the new checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', handleCheckboxChange);
        });
    }

    // Handle checkbox changes to update status and save to localStorage
    function handleCheckboxChange(event) {
        const checkbox = event.target;
        const chapterId = checkbox.dataset.chapterId;
        const nameSpan = checkbox.closest('tr').querySelector('.chapter-name');
        const originalText = nameSpan.dataset.originalText;

        if (checkbox.checked) {
            completionStatus[chapterId] = true;
            nameSpan.textContent = "Completed";
            nameSpan.classList.add("completed-text");
            nameSpan.classList.remove("chapter-name"); // Optional: remove original styling
        } else {
            delete completionStatus[chapterId];
            nameSpan.textContent = originalText;
            nameSpan.classList.remove("completed-text");
            nameSpan.classList.add("chapter-name");
        }
        
        // Save the updated status to localStorage
        localStorage.setItem('completionStatus', JSON.stringify(completionStatus));
    }

    // Theme Toggler Logic
    function applyTheme(theme) {
        if (theme === 'dark-mode') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    themeToggle.addEventListener('click', () => {
        let theme = 'light';
        if (!document.body.classList.contains('dark-mode')) {
            theme = 'dark-mode';
        }
        localStorage.setItem('theme', theme);
        applyTheme(theme);
    });

    // --- INITIALIZATION ---
    createSideMenu();
    // Select and display the first subject by default
    document.querySelector('.side-menu-item').click();
});
