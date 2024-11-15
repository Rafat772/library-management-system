document.getElementById('library-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const rollNumber = document.getElementById('number').value;
    const branch = document.getElementById('branch').value;
    const bookName = document.getElementById('book').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genres').value;

    const formData = { name, rollNumber, branch, bookName, author, genre };

    // Store data in localStorage
    let data = JSON.parse(localStorage.getItem('libraryData')) || [];
    data.push(formData);
    localStorage.setItem('libraryData', JSON.stringify(data));

    // Update table
    updateTable();
    this.reset();
});

function updateTable() {
    const data = JSON.parse(localStorage.getItem('libraryData')) || [];
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = '';

    data.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.name}</td>
            <td>${row.rollNumber}</td>
            <td>${row.branch}</td>
            <td>${row.bookName}</td>
            <td>${row.author}</td>
            <td>${row.genre}</td>
            <td class="action-buttons">
                <button class="edit-btn" onclick="editRow(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteRow(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function deleteRow(index) {
    let data = JSON.parse(localStorage.getItem('libraryData')) || [];
    data.splice(index, 1);
    localStorage.setItem('libraryData', JSON.stringify(data));
    updateTable();
}

function editRow(index) {
    let data = JSON.parse(localStorage.getItem('libraryData')) || [];
    const rowData = data[index];
    
    document.getElementById('name').value = rowData.name;
    document.getElementById('number').value = rowData.rollNumber;
    document.getElementById('branch').value = rowData.branch;
    document.getElementById('book').value = rowData.bookName;
    document.getElementById('author').value = rowData.author;
    document.getElementById('genres').value = rowData.genre;

    // Remove the existing row data
    data.splice(index, 1);
    localStorage.setItem('libraryData', JSON.stringify(data));

    // Update the table
    updateTable();
}

// Initialize table on page load
window.onload = updateTable;
