document.addEventListener('DOMContentLoaded', function () {
    const mapContainer = document.getElementById('map-container');

    // Fetch maps data from the API
    fetch('https://valorant-api.com/v1/maps')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const maps = data.data;

            // Function to create a map card
            function createMapCard(map) {
                const mapCard = document.createElement('div');
                mapCard.classList.add('map-card');
                mapCard.innerHTML = `
                    <img src="${map.listViewIcon}" alt="${map.displayName}">
                    <h4>${map.displayName}</h4>
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
                    </head>
                    <body>
                        <h1>${map.displayName}</h1>
                        <img src="${map.splash}" alt="${map.displayName} Splash">
                        <img src="${map.displayIcon}" alt="${map.displayName} Icon">
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
