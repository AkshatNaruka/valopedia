document.addEventListener('DOMContentLoaded', function () {
    const mapContainer = document.getElementById('map-container');

    // Fetch maps data from the API
    fetch('https://valorant-api.com/v1/maps')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const maps = data.data;

            // Function to create a map card with selected properties
            function createMapCard(map) {
                const mapCard = document.createElement('div');
                mapCard.classList.add('map-card');
                mapCard.innerHTML = `
                    <div class="map-info">
                        <img src="${map.listViewIcon}" alt="${map.displayName}" data-map-id="${map.uuid}">
                        <h4 style="text-align:center">${map.displayName}</h4>
                    </div>
                `;
                mapCard.addEventListener('click', function () {
                    openMapDetails(map);
                });
                return mapCard;
            }

            // Function to open map details in a new tab
            function openMapDetails(map) {
                const newTab = window.open('', '_blank');
                newTab.document.write(`
                    <html>
                    <head>
                        <title>${map.displayName}</title>
                        <link rel="stylesheet" href="map-details.css">
                        <style>
                            body {
                                background-color: black;
                                color: white;
                                text-align: center;
                                font-family: Arial, sans-serif;
                            }

                            .map-info {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                margin: 20px;
                            }

                            .map-info img {
                                max-width: 100px;
                                max-height: 100px;
                            }

                            .map-details {
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                margin: 20px;
                            }

                            .splash-container,
                            .display-icon {
                                width: 500px;
                                height: 500px;
                                overflow: hidden;
                                margin: 20px;
                            }

                            .splash-container img,
                            .display-icon img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>${map.displayName}</h1>
                        <div class="map-details">
                            <div class="splash-container">
                                <img src="${map.splash}" alt="${map.displayName} Splash">
                            </div>
                            <p>${map.narrativeDescription}</p>
                            <div class="display-icon">
                                <img src="${map.displayIcon}" alt="${map.displayName} Icon">
                            </div>
                        </div>
                    </body>
                    </html>
                `);
            }

            // Populate map cards into the dynamic grid container
            maps.forEach(function (map) {
                const mapCard = createMapCard(map);
                mapContainer.appendChild(mapCard);
            });
        })
        .catch(function (error) {
            console.log('Error:', error);
        });
});
