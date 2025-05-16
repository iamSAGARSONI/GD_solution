document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Pre-order button handler
    document.querySelector('.cta').addEventListener('click', () => {
        alert('Thank you for your interest! Our team will contact you shortly.');
    });

    // Email validation for newsletter
    const form = document.querySelector('form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            if(validateEmail(email)) {
                alert('Thank you for subscribing!');
                form.reset();
            } else {
                alert('Please enter a valid email address');
            }
        });
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Google Maps Initialization
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 28.7041, lng: 77.1025}, // Default to Delhi
        zoom: 12
    });

    // Sample sensor data
    const bins = [
        {
            id: 'BIN-001',
            location: {lat: 28.7041, lng: 77.1025},
            fillLevel: 75,
            status: 'Full',
            lastUpdated: new Date()
        },
        {
            id: 'BIN-002',
            location: {lat: 28.6143, lng: 77.1996},
            fillLevel: 30,
            status: 'OK',
            lastUpdated: new Date()
        }
    ];

    // Add markers to map
    bins.forEach(bin => {
        const marker = new google.maps.Marker({
            position: bin.location,
            map: map,
            title: bin.id,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: bin.fillLevel > 80 ? 'red' : bin.fillLevel > 50 ? 'orange' : 'green',
                fillOpacity: 0.8,
                strokeWeight: 0,
                scale: 10
            }
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="info-window">
                    <h3>${bin.id}</h3>
                    <p>Status: ${bin.status}</p>
                    <p>Fill Level: ${bin.fillLevel}%</p>
                    <p>Last Updated: ${bin.lastUpdated.toLocaleTimeString()}</p>
                </div>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });

    // Update table data
    const tbody = document.getElementById('sensor-data');
    bins.forEach(bin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${bin.id}</td>
            <td>${bin.location.lat.toFixed(4)}, ${bin.location.lng.toFixed(4)}</td>
            <td>${bin.fillLevel}%</td>
            <td><span class="status-indicator" style="background-color: ${bin.fillLevel > 80 ? 'red' : bin.fillLevel > 50 ? 'orange' : 'green'}"></span> ${bin.status}</td>
            <td>${bin.lastUpdated.toLocaleTimeString()}</td>
        `;
        tbody.appendChild(row);
    });
}

// Simulate sensor data updates
function updateSensorData() {
    const bins = document.querySelectorAll('#sensor-data tr');
    bins.forEach(bin => {
        const fillLevelCell = bin.querySelector('td:nth-child(3)');
        const statusCell = bin.querySelector('td:nth-child(4)');
        const timeCell = bin.querySelector('td:nth-child(5)');
        
        // Simulate new data
        const newLevel = Math.floor(Math.random() * 100);
        const newStatus = newLevel > 80 ? 'Full' : newLevel > 50 ? 'Filling' : 'OK';
        
        fillLevelCell.textContent = `${newLevel}%`;
        statusCell.innerHTML = `<span class="status-indicator" style="background-color: ${newLevel > 80 ? 'red' : newLevel > 50 ? 'orange' : 'green'}"></span> ${newStatus}`;
        timeCell.textContent = new Date().toLocaleTimeString();
    });
}

// Replace the Google Maps code in script.js with this

let map;
let markers = [];

function initMap() {
    // Initialize the map
    map = L.map('map').setView([28.7041, 77.1025], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
    }).addTo(map);

    // Create initial bins
    const bins = [
        {
            id: 'BIN-001',
            coords: [28.7041, 77.1025],
            fillLevel: 75,
            status: 'Full',
            lastUpdated: new Date()
        },
        {
            id: 'BIN-002',
            coords: [28.6143, 77.1996],
            fillLevel: 30,
            status: 'OK',
            lastUpdated: new Date()
        }
    ];

    // Add markers to map
    bins.forEach(bin => {
        const marker = L.marker(bin.coords, {
            icon: L.divIcon({
                className: 'custom-marker',
                html: `<div style="background-color: ${getColor(bin.fillLevel)}; 
                                  width: 24px; 
                                  height: 24px; 
                                  border-radius: 50%; 
                                  border: 2px solid white"></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            })
        }).addTo(map);

        // Add popup
        marker.bindPopup(`
            <div class="marker-popup">
                <h4>${bin.id}</h4>
                <p>Status: ${bin.status}</p>
                <p>Fill Level: ${bin.fillLevel}%</p>
                <p>Last Updated: ${bin.lastUpdated.toLocaleTimeString()}</p>
            </div>
        `);

        markers.push(marker);
    });

    // Update table
    updateTable(bins);
}

function getColor(fillLevel) {
    return fillLevel > 80 ? '#e74c3c' :
           fillLevel > 50 ? '#f1c40f' :
           '#2ecc71';
}

function updateTable(bins) {
    const tbody = document.getElementById('sensor-data');
    tbody.innerHTML = '';
    
    bins.forEach(bin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${bin.id}</td>
            <td>${bin.coords[0].toFixed(4)}, ${bin.coords[1].toFixed(4)}</td>
            <td>${bin.fillLevel}%</td>
            <td>
                <span class="status-indicator" 
                      style="background-color: ${getColor(bin.fillLevel)}"></span>
                ${bin.status}
            </td>
            <td>${bin.lastUpdated.toLocaleTimeString()}</td>
        `;
        tbody.appendChild(row);
    });
}

// Simulate real-time updates
function updateSensorData() {
    markers.forEach((marker, index) => {
        const newLevel = Math.floor(Math.random() * 100);
        const newStatus = newLevel > 80 ? 'Full' : newLevel > 50 ? 'Filling' : 'OK';
        
        // Update marker
        marker.setIcon(L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${getColor(newLevel)}; 
                              width: 24px; 
                              height: 24px; 
                              border-radius: 50%; 
                              border: 2px solid white"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        }));
        
        // Update popup
        marker.setPopupContent(`
            <div class="marker-popup">
                <h4>${markers[index].options.id || `BIN-00${index + 1}`}</h4>
                <p>Status: ${newStatus}</p>
                <p>Fill Level: ${newLevel}%</p>
                <p>Last Updated: ${new Date().toLocaleTimeString()}</p>
            </div>
        `);
    });

    // Update table
    const bins = markers.map((marker, index) => ({
        id: marker.options.id || `BIN-00${index + 1}`,
        coords: marker.getLatLng(),
        fillLevel: Math.floor(Math.random() * 100),
        status: ['OK', 'Filling', 'Full'][Math.floor(Math.random() * 3)],
        lastUpdated: new Date()
    }));
    
    updateTable(bins);
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    setInterval(updateSensorData, 5000);
});