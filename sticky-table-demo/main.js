// Sample data generation
function generateSampleData(count = 20) {
    const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
    const positions = ['Manager', 'Senior Developer', 'Junior Developer', 'Analyst', 'Coordinator'];
    const locations = ['New York', 'London', 'Tokyo', 'Paris', 'Singapore'];

    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Employee ${i + 1}`,
        email: `employee${i + 1}@example.com`,
        phone: `+1-555-${String(Math.floor(1000 + Math.random() * 9000))}`,
        department: departments[Math.floor(Math.random() * departments.length)],
        position: positions[Math.floor(Math.random() * positions.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        startDate: new Date(2020 + Math.floor(Math.random() * 4), 
                           Math.floor(Math.random() * 12), 
                           Math.floor(Math.random() * 28) + 1)
            .toLocaleDateString(),
        salary: `$${(50000 + Math.floor(Math.random() * 50000)).toLocaleString()}`
    }));
}

// Populate table with data
function populateTable(data) {
    const tbody = document.querySelector('.sticky-table tbody');
    tbody.innerHTML = data.map(item => `
        <tr>
            <td class="sticky-col sticky-col-1">${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.department}</td>
            <td>${item.position}</td>
            <td>${item.location}</td>
            <td>${item.startDate}</td>
            <td>${item.salary}</td>
            <td class="sticky-col sticky-col-last">
                <button class="btn btn-edit" onclick="editRow(${item.id})">Edit</button>
                <button class="btn btn-delete" onclick="deleteRow(${item.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Edit row handler
function editRow(id) {
    alert(`Edit row with ID: ${id}`);
}

// Delete row handler
function deleteRow(id) {
    alert(`Delete row with ID: ${id}`);
}

// Theme handling
function initializeTheme() {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    root.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Initialize the table when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const sampleData = generateSampleData();
    populateTable(sampleData);
    
    // Initialize theme
    initializeTheme();
    
    // Add theme toggle button listener
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
});