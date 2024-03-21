// ============================================================================================================
// LOCAL STORAGE TO TEMPORARILY STORE OBJECTS (WILL BE REPLACED WITH API LATER)
// ============================================================================================================
// Objects exist in local storage. Read data.
var properties = JSON.parse(localStorage.getItem('properties'));
var editindex = localStorage.getItem('editindex');
var workspaceindex = localStorage.getItem('workspaceindex');

// ============================================================================================================
// WORKSPACE DETAILS PAGE
// ============================================================================================================

let selectedworkspace = properties[editindex].workspace[workspaceindex];

let seatingCapacity_details = document.querySelector('#seating-capacity_details');
let smokingPolicy_details = document.querySelector('#smoking-policy_details');
let availabilityDate_details = document.querySelector('#availability-date_details');
let leaseTerm_details = document.querySelector('#lease-term_details');
let price_details = document.querySelector('#price_details');

// Display details of the selected workspace
seatingCapacity_details.value = selectedworkspace.seatingCapacity;
smokingPolicy_details.value = selectedworkspace.smokingPolicy;
availabilityDate_details.value = selectedworkspace.availabilityDate;
leaseTerm_details.value = selectedworkspace.leaseTerm;
price_details.value = selectedworkspace.price;

// Function to save modified workspace data
document.querySelector('#saveWorkspace').addEventListener('click', () => {

    // Save details in workspace variable
    selectedworkspace.seatingCapacity = seatingCapacity_details.value;
    selectedworkspace.smokingPolicy = smokingPolicy_details.value;
    selectedworkspace.availabilityDate = availabilityDate_details.value;
    selectedworkspace.leaseTerm = leaseTerm_details.value;
    selectedworkspace.price = price_details.value;

    let matchitem = (properties[editindex].workspace.findIndex(item => JSON.stringify(item) === JSON.stringify(selectedworkspace)))
    if ((matchitem == workspaceindex) || (matchitem == -1)) {

        // // Replace workspace element in properties variable and store in local storage
        properties[editindex].workspace[workspaceindex] = selectedworkspace;
        localStorage.setItem('properties', JSON.stringify(properties)); // Modify later

        // Display message in <p> tag and go to properties page
        let messageParagraph = document.createElement('p');
        messageParagraph.textContent = "Workspace Updated successfully!";
        document.body.appendChild(messageParagraph);
        window.location.href = 'workspaces.html';
    } else {
        // Display message in <p> tag
        let messageParagraph = document.createElement('p');
        messageParagraph.textContent = "Workspace already exist";
        document.body.appendChild(messageParagraph);
    }
})

// Function to cancel modified workspace data changes
document.querySelector('#cancelWorkspace').addEventListener('click', () => {
    window.location.href = 'workspaces.html';
})

// Function to limit numeric values as positive
document.querySelectorAll('.number').forEach(field => {
    field.addEventListener('change', () => {
        if (field.value < 0)
            field.value = 0;
    })
});

