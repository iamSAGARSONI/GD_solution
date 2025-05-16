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

// Initialize map after DOM load
window.addEventListener('DOMContentLoaded', () => {
    // Load Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);

    // Update sensor data every 5 seconds
    setInterval(updateSensorData, 5000);
});