// ============================================================================================================
// LOCAL STORAGE TO TEMPORARILY STORE OBJECTS (WILL BE REPLACED WITH API LATER)
// ============================================================================================================

// Objects exist in local storage. Read data.
var properties = JSON.parse(localStorage.getItem('properties'));
var editindex = localStorage.getItem('editindex');
var username = localStorage.getItem('username');

// ============================================================================================================
// WORKSPACE PAGE
// ============================================================================================================
var editproperty = {
    address: properties[editindex].address,
    neighborhood: properties[editindex].neighborhood,
    squareFeet: properties[editindex].squareFeet,
    parking: properties[editindex].parking,
    publicTransport: properties[editindex].publicTransport,
    workspace: properties[editindex].workspace,
};

var workspace = properties[editindex].workspace;

PopulateWorkspaceTable();

let address_workspace = document.querySelector('#address_workspace');
let neighborhood_workspace = document.querySelector('#neighborhood_workspace');
let squareFeet_workspace = document.querySelector('#squareFeet_workspace');
let parking_workspace = document.querySelector('#parking_workspace');
let publicTransport_workspace = document.querySelector('#publicTransport_workspace');

// Display details of the selected property
address_workspace.value = editproperty.address;
neighborhood_workspace.value = editproperty.neighborhood;
squareFeet_workspace.value = editproperty.squareFeet;
parking_workspace.value = editproperty.parking;
publicTransport_workspace.value = editproperty.publicTransport;

// Function to add new workspace
document.querySelector('#addWorkspace').addEventListener('click', () => {
    // Create a property object
    let seatingCapacity = document.querySelector('#seating-capacity');
    let smokingPolicy = document.querySelector('#smoking-policy');
    let availabilityDate = document.querySelector('#availability-date');
    let leaseTerm = document.querySelector('#lease-term');
    let price = document.querySelector('#price');

    // Create an object to hold the workspace data
    const workspaceData = {
    seatingCapacity: seatingCapacity.value,
    smokingPolicy: smokingPolicy.value,
    availabilityDate: availabilityDate.value,
    leaseTerm: leaseTerm.value,
    price: price.value,
     };

    function displayMessage(message) {
        // Container of display message
        let containerDiv = document.createElement('div');
        containerDiv.style.position = 'fixed';
        containerDiv.style.top = '15%';
        containerDiv.style.left = '50%';
        containerDiv.style.transform = 'translate(-50%, -50%)';
        containerDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        containerDiv.style.padding = '20px';
        containerDiv.style.borderRadius = '10px';
        containerDiv.style.textAlign = 'center';
        containerDiv.style.color = 'red';
    
        // Display message in <p> tag
        let messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;
        containerDiv.appendChild(messageParagraph);
    
        // Append container div to the document body
        document.body.appendChild(containerDiv);
    
        // Set timeout to remove message after specified duration
        setTimeout(() => {
            containerDiv.remove();
        }, 2000);
    }
    
    if (workspaceData.seatingCapacity.trim() == "") {
        displayMessage("Seating Capacity cannot be empty!");
    } else if (workspaceData.smokingPolicy.trim() == "") {
        displayMessage("Smoking policy cannot be empty!");
    } else if (workspaceData.availabilityDate.trim() == "") {
        displayMessage("Availability date must be set!");
    } else if (workspaceData.leaseTerm.trim() == "") {
        displayMessage("Lease term must be set!");
    } else if (workspaceData.price.trim() == "") {
        displayMessage("Price cannot be empty!");
    } else if (workspace.find(item => JSON.stringify(item) === JSON.stringify(workspaceData))) {
        displayMessage("Workspace already exists!"); // Duplicate workspace
    }
    else {

        // Add workspace to workspace array
        workspace.push(workspaceData);

        // Clear form fields
        document.querySelectorAll('.addWorkspace').forEach(field => {
            field.value = "";
        });

        PopulateWorkspaceTable();
    }
})

// Function to populate properties table
function PopulateWorkspaceTable() {
    let workspaceTable = document.querySelector("#workspaceTable");

    // Reset table data
    for (var i = workspaceTable.rows.length - 1; i > 0; i--) {
        workspaceTable.deleteRow(i);
    }

    // Update property table with updated data
    workspace.forEach((data, index) => {
        let newRow = workspaceTable.insertRow(index + 1);
        newRow.insertCell(0).innerHTML = data.seatingCapacity
        newRow.insertCell(1).innerHTML = data.smokingPolicy
        newRow.insertCell(2).innerHTML = data.availabilityDate
        newRow.insertCell(3).innerHTML = data.leaseTerm
        newRow.insertCell(4).innerHTML = data.price
        newRow.insertCell(5).innerHTML = '<a href="workspace-details.html" class="editWorkspaceBtn" title=' + index + '>Edit</a>';
        newRow.insertCell(6).innerHTML = '<a href="#" class="deleteWorkspaceBtn" title=' + index + '>Delete</a>';
    })

    // Get newly created Edit/Delete buttons
    var editWorkspaceBtn = document.querySelectorAll('.editWorkspaceBtn');
    var deleteWorkspaceBtn = document.querySelectorAll('.deleteWorkspaceBtn');

    // Add events to created Edit Buttons
    for (let btn of editWorkspaceBtn) {
        btn.addEventListener('click', () => {
            workspaceindex = Number(btn.title);
            localStorage.setItem('workspaceindex', workspaceindex); // Modify later
        })
    }

    // Add events to created Delete Buttons
    for (let btn of deleteWorkspaceBtn) {
        btn.addEventListener('click', () => {
            deleteWorkspace(btn.title);
        })
    }
}

// Function to delete a workspace
function deleteWorkspace(index) {
    // Prompt user for confirmation before deleting the property
    const confirmDelete = confirm('Are you sure you want to delete this workspace?');
    if (confirmDelete) {
        workspace.splice(index, 1);
        PopulateWorkspaceTable();
        alert("Workspace deleted sucessfully!");
    }
}

// Function to save modified property data
document.querySelector('#saveProperty').addEventListener('click', () => {

    // Save details in editproperty variable
    editproperty.address = address_workspace.value;
    editproperty.neighborhood = neighborhood_workspace.value;
    editproperty.squareFeet = squareFeet_workspace.value;
    editproperty.parking = parking_workspace.value;
    editproperty.publicTransport = publicTransport_workspace.value;
    editproperty.workspace = workspace;

    // Check if the modified property exist
    const matchitem = (properties.findIndex(item => (item.address === editproperty.address) &&
        (item.neighborhood === editproperty.neighborhood) && (item.squareFeet === editproperty.squareFeet) && 
        (item.parking === editproperty.parking) && (item.publicTransport === editproperty.publicTransport)))
    if ((matchitem == editindex) || (matchitem == -1)) {
        // Replace element in properties variable and store in local storage
        properties[editindex] = editproperty;
        localStorage.setItem('properties', JSON.stringify(properties)); // Modify later

        // Display alert and go to properties page
        alert("Property Updated successfully!");
        window.location.href = 'properties.html';
    } else {
        alert("A duplicate property exist!") // Duplicated property
    }

    console.log(editproperty)
    console.log(matchitem)
})

// Function to cancel modified property data changes
document.querySelector('#cancelProperty').addEventListener('click', () => {
    window.location.href = 'properties.html';
})

document.addEventListener('DOMContentLoaded', function () {
    // Get the <h2> element
    var emailElement = document.getElementById('owner');

    // Handle invalid or missing user role
    greeting = 'Hi, ' + username;
    //console.log('Invalid or missing user role');

    console.log('Greeting:', greeting); // Log greeting to inspect its value
    // Update the content of the <h2> element with the greeting message
    emailElement.textContent = greeting;
});

// Function to limit numeric values as positive
document.querySelectorAll('.number').forEach(field => {
    field.addEventListener('change', () => {
        if (field.value < 0)
            field.value = 0;
    })
});

