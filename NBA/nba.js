
let nbacityandcllg = [];

// Fetch city and college data
fetch('nbacityandcllg.json')
    .then(response => response.json())
    .then(data => {
        nbacityandcllg = data; // Store fetched data
    })
    .catch(error => {
        console.error('Error fetching city and college data:', error);
    });

// Fetch city data
fetch('nbacity.json')
    .then(response => response.json())
    .then(data => {
        const uniqueCities = [...new Set(data.map(item => item.city))];

        // Populate city dropdown
        const selectElement = document.getElementById("cities");
        uniqueCities.forEach(city => {
            let option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            selectElement.appendChild(option);
        });
    })
    .catch(error => console.error('Error loading city JSON:', error));

// Function to update colleges based on selected city
function updateColleges() {
    const city = document.getElementById("cities").value;
    const cllgDropdown = document.getElementById("cllg");

    // Clear existing colleges
    cllgDropdown.innerHTML = "<option value=''>Select college</option>";

    // Get the colleges for the selected city
    if (city && nbacityandcllg.length > 0) {
        const filteredColleges = nbacityandcllg
            .filter(item => item.city === city)
            .map(item => item.college);

        // Populate colleges dropdown
        filteredColleges.forEach(college => {
            let option = document.createElement("option");
            option.value = college;
            option.textContent = college;
            cllgDropdown.appendChild(option);
        });
    }
}

function filterServices() {
const selectedCollege = document.getElementById("cllg").value;
const cllgListDiv = document.getElementById("cllg-list");

// Clear previous results
cllgListDiv.innerHTML = "";

// Check if a college is selected
if (!selectedCollege) {
cllgListDiv.innerHTML = "<p>Please select a college.</p>";
return;
}

// Find the selected college in the data
const collegeData = nbacityandcllg.find(item => item.college === selectedCollege);

// Display accredited courses if found
if (collegeData && collegeData.accredited_courses.length > 0) {
const coursesList = document.createElement("ul");
collegeData.accredited_courses.forEach(course => {
    const listItem = document.createElement("li");
    listItem.textContent = course;
    coursesList.appendChild(listItem);
});

cllgListDiv.appendChild(coursesList);
} else {
cllgListDiv.innerHTML = "<p>No accredited courses found.</p>";

}
displayServices(filteredServices);
}

// Function to display the filtered services
function displayServices(services) {
const serviceList = document.getElementById("service-list");
serviceList.innerHTML = ""; // Clear previous results

if (services.length === 0) {
serviceList.innerHTML = "<p>No services found in your location.</p>";
return;
}

services.forEach(service => {

const serviceCard = document.createElement("div");
serviceCard.classList.add("service-card");


serviceList.appendChild(serviceCard);
});
};
