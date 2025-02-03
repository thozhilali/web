let services = [];
let citiesAndAreas = {}; // To hold the cities and areas data

// Fetch cities and areas data from the JSON file
fetch('https://raw.githubusercontent.com/thozhilali/thozhilali/main/citiesAndAreas.json')
    .then(response => response.json())
    .then(data => {
        citiesAndAreas = data; // Store the fetched data in citiesAndAreas
    })
    .catch(error => {
        console.error('Error fetching cities and areas:', error);
    });

// Fetch services data from the JSON file
fetch('https://raw.githubusercontent.com/thozhilali/thozhilali/main/services.json')
    .then(response => response.json())
    .then(data => {
        services = data; // Store the fetched data in the services array
    })
    .catch(error => {
        console.error('Error fetching services:', error);
    });

// Function to update the area dropdown based on the selected city
function updateAreas() {
    const city = document.getElementById("city").value;
    const areaDropdown = document.getElementById("area");

    // Clear existing areas
    areaDropdown.innerHTML = "<option value=''>Select Area</option>";

    // Get the areas for the selected city
    if (city && citiesAndAreas[city]) {
        citiesAndAreas[city].forEach(area => {
            const option = document.createElement("option");
            option.value = area;
            option.textContent = area;
            areaDropdown.appendChild(option);
        });
    }
}

// Function to filter and display services based on selected service type, city, and area
function filterServices() {
    const serviceType = document.getElementById("service").value;
    const city = document.getElementById("city").value.trim().toLowerCase();
    const area = document.getElementById("area").value.trim().toLowerCase();

    const filteredServices = services.filter(service => 
        service.name.toLowerCase().includes(serviceType) &&
        service.city.toLowerCase().includes(city) &&
        service.area.toLowerCase().includes(area)
    );

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
        const phoneLink = `<a href="tel:${service.phone}" class="phone-link">Call: ${service.phone}</a>`;
        const serviceCard = document.createElement("div");
        serviceCard.classList.add("container");
        serviceCard.innerHTML = `
        <br><br>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <p>Location: ${service.city}, ${service.area}</p>
            <p>${phoneLink}</p>
        `;
        serviceList.appendChild(serviceCard);
    });
