document.addEventListener('DOMContentLoaded', function () {
    // Data remains the same from your document.
    const syllabusData = [
        { ch_no: "01", english: "The Crow and the Deer", accountancy: "Accounting - An Introduction", economics: "Overview of Indian economy", bus_studies: "Nature and scope of business", data_entry: "Basics of computer" },
        { ch_no: "02", english: "Mary Kom's Interview", accountancy: "Accounting Concepts", economics: "Economic planning in india", bus_studies: "Business support services", data_entry: "Operating system" },
        { ch_no: "03", english: "An Astrologer's Day", accountancy: "Accounting Conventions and Standards", economics: "Economic growth and economic development", bus_studies: "Business environment", data_entry: "Basics of word processing" },
        { ch_no: "04", english: "Bholi", accountancy: "Accounting for Business Transactions", economics: "The problem of unemployment, poverty and inequality", bus_studies: "Forms of business organisation", data_entry: "Formatting document" },
        { ch_no: "05", english: "Ecology and Environment", accountancy: "Journal", economics: "Meaning and scope and its need in economics", bus_studies: "Company form of business organisation", data_entry: "Mail merge" },
        { ch_no: "06", english: "Andha Yug", accountancy: "Ledger", economics: "Collection and classification of data", bus_studies: "Fundamental of management", data_entry: "Basics of spreadsheet" },
        { ch_no: "07", english: "After Twenty Years", accountancy: "Cash Book", economics: "Presentation of data", bus_studies: "Planning and organising", data_entry: "Formatting work sheet" },
        { ch_no: "08", english: "The Necklace", accountancy: "Special Purpose Books", economics: "Measures of central tendency", bus_studies: "Staffing and directing", data_entry: "Formulas functions and charts" },
        { ch_no: "09", english: "Three questions", accountancy: "Trial Balance", economics: "Measures of dispersion", bus_studies: "Ordination and controlling", data_entry: "Creating presentation" },
        { ch_no: "10", english: "Of Studies", accountancy: "Bank Reconciliation", economics: "Correction analysis", bus_studies: "Financial planning and management", data_entry: "Introduction on internet" },
        { ch_no: "11", english: "Night of the Scorpion", accountancy: "Bills of exchange", economics: "Index numbers", bus_studies: "Short term source of finance", data_entry: "" },
        { ch_no: "12", english: "Where the Mind is without Fear", accountancy: "Errors and their rectification", economics: "Introduction to the study of economics", bus_studies: "Long term sources of business finance", data_entry: "" },
        { ch_no: "13", english: "If", accountancy: "Computer and computerised accounting system", economics: "Central problems of an economy", bus_studies: "Financial market", data_entry: "" },
        { ch_no: "14", english: "The Bazaars of Hyderabad", accountancy: "Depreciation", economics: "Consumers equilibrium", bus_studies: "Introduction to marketing", data_entry: "" },
        { ch_no: "15", english: "-Reading with Understanding (Thimakka & Biomedical Waste Management)", accountancy: "Provision and resources", economics: "demand", bus_studies: "The marketing mix", data_entry: "" },
        { ch_no: "16", english: "Reading with Understanding (Stress before Examination)", accountancy: "Financial statements an introduction", economics: "Price elasticity of demand", bus_studies: "Advertising and salesmanship", data_entry: "" },
        { ch_no: "17", english: "Kabir and Thirvalluvar", accountancy: "Financial statements I", economics: "Production function", bus_studies: "Consumer protection", data_entry: "" },
        { ch_no: "18", english: "Reading with Understanding (Nation Builders of India)", accountancy: "Financial statements II", economics: "Cost of production", bus_studies: "Internal trade", data_entry: "" },
        { ch_no: "19", english: "Reading with Understanding (International Fight Against Drug Abuse and Illicit Trafficking)", accountancy: "Not for profit organisation an introduction", economics: "supply", bus_studies: "External trade", data_entry: "" },
        { ch_no: "20", english: "Reading with Understanding (Losar and Bihu)", accountancy: "Financial statements (not for profit organisation)", economics: "Price of elasticity of supply", bus_studies: "Self employment", data_entry: "" },
        { ch_no: "21", english: "Kalidas", accountancy: "Accounts from incomplete records", economics: "Forms of market", bus_studies: "Job employment", data_entry: "" },
        { ch_no: "22", english: "Face-to-Face Communication", accountancy: "Partnership an introduction", economics: "Price determination under perfect competition", bus_studies: "Skill development", data_entry: "" },
        { ch_no: "23", english: "Writing Letters", accountancy: "Admission of a partner", economics: "Revenue and profit maximization of a competitive firm", bus_studies: "Modern modes of business", data_entry: "" },
        { ch_no: "24", english: "Writing Emails", accountancy: "Retirement and death of a partner", economics: "National income and related aggregates", bus_studies: "", data_entry: "" },
        { ch_no: "25", english: "Writing Reports", accountancy: "Dissolution of a partnership firm", economics: "National income and its measurements", bus_studies: "", data_entry: "" },
        { ch_no: "26", english: "Writing Job Applications", accountancy: "Company an introduction", economics: "Consumption saving and investment", bus_studies: "", data_entry: "" },
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
        document.querySelectorAll('.side-menu-item').forEach(item => item.classList.remove('active'));
        event.target.classList.add('active');
        const subjectKey = event.target.dataset.subject;
        displaySubjectTable(subjectKey);
    }

    // Display the table for the selected subject
    function displaySubjectTable(subjectKey) {
        const subjectName = subjectKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        subjectTitle.textContent = subjectName;
        chapterTableBody.innerHTML = ''; 

        syllabusData.forEach(chapter => {
            const chapterName = chapter[subjectKey];
            if (chapterName && chapterName.trim() !== "") {
                const chapterId = `${subjectKey}-${chapter.ch_no}`;
                const isCompleted = completionStatus[chapterId] || false;
                
                const statusText = isCompleted ? 'Completed' : 'Not Completed';
                const statusClass = isCompleted ? 'status-completed' : 'status-not-completed';

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><input type="checkbox" data-chapter-id="${chapterId}" ${isCompleted ? 'checked' : ''}></td>
                    <td>${chapter.ch_no}</td>
                    <td>${chapterName}</td>
                    <td><span class="${statusClass}">${statusText}</span></td>
                `;
                chapterTableBody.appendChild(row);
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
        const statusSpan = checkbox.closest('tr').querySelector('td:last-child span');

        if (checkbox.checked) {
            completionStatus[chapterId] = true;
            statusSpan.textContent = "Completed";
            statusSpan.className = "status-completed";
        } else {
            delete completionStatus[chapterId];
            statusSpan.textContent = "Not Completed";
            statusSpan.className = "status-not-completed";
        }
        
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
        let theme = document.body.classList.contains('dark-mode') ? 'light' : 'dark-mode';
        localStorage.setItem('theme', theme);
        applyTheme(theme);
    });

    // --- INITIALIZATION ---
    createSideMenu();
    document.querySelector('.side-menu-item').click();
});
