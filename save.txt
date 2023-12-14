
document.addEventListener('DOMContentLoaded', function () {
    // Select the weaponDetails div
    const weaponDetailsDiv = document.getElementById('weaponDetails');

    // Array of weapon UUIDs
    const gunUuids = [
        "63e6c2b6-4a8e-869c-3d4c-e38355226584",
        "55d8a0f4-4274-ca67-fe2c-06ab45efdf58",
        "9c82e19d-4575-0200-1a81-3eacf00cf872",
        "ae3de142-4d85-2547-dd26-4e90bed35cf7",
        "ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a",
        "ec845bf4-4f79-ddda-a3da-0db3774b2794",
        "910be174-449b-c412-ab22-d0873436b21b",
        "44d4e95c-4157-0037-81b2-17841bf2e8e3",
        "29a0cfab-485b-f5d5-779a-b59f85e204a8",
        "1baa85b4-4c70-1284-64bb-6481dfc3bb4e",
        "e336c6b8-418d-9340-d77f-7a9e4cfe0702",
        "42da8ccc-40d5-affc-beec-15aa47b42eda",
        "a03b24d3-4319-996d-0f8c-94bbfba1dfc7",
        "4ade7faa-4cf1-8376-95ef-39884480959b",
        "c4883e50-4494-202c-3ec3-6b8a9284f00b",
        "462080d1-4035-2937-7c09-27aa2a5c27a7",
        "f7e1b454-4ad4-1063-ec0a-159e56b58941"
        // Add more UUIDs for other guns as needed
    ];

    // Function to create a weapon card with selected properties
    function createWeaponCard(weapon) {
        const weaponCard = document.createElement('div');
        weaponCard.classList.add('weapon-card');
        const weaponName = weapon.displayName;
                    const displayIcon = weapon.displayIcon;
                    const stats = weapon.weaponStats;
                    const damage = weapon.weaponStats.damageRanges[0];
                    const cost = weapon.shopData.cost;
                    const category = weapon.shopData.category;

        weaponCard.innerHTML = `
            <div class="weapon-info">
                <img src="${weapon.displayIcon}" alt="${weapon.displayName}" data-weapon-id="${weapon.uuid}">
                <h4 style="text-align:center">${weapon.displayName}</h4>
                <ul>
                        <li>Category: ${category}</li>
                        <li>Fire Rate: ${stats.fireRate}</li>
                        <li>Magazine Size: ${stats.magazineSize}</li>
                        <li>Reload Time: ${stats.reloadTimeSeconds}</li>
                        <li>Headshot Damage: ${damage.headDamage}</li>
                        <li>Body Damage: ${damage.bodyDamage}</li>
                        <li>Leg Damage: ${damage.legDamage}</li>
                        <li>Cost: ${cost}</li>
                        <!-- Add more stats as needed -->
                </ul>
            </div>
        `;
        weaponCard.addEventListener('click', function () {
            openWeaponDetails(weapon);
        });
        return weaponCard;
    }

    // Function to open weapon details in a new tab
    function openWeaponDetails(weapon) {
        // Create a new HTML content as a string, including the header
        const newContent = `
            <html>
            <head>
                <title>${weapon.displayName}</title>
                <link rel="stylesheet" href="styles.css">
                <!-- Add your weapon details page styles here -->
                <!-- Include the same header as in the maps page -->
            </head>
            <body>
                <!-- Include the same header as in the maps page -->
                <h1>${weapon.displayName}</h1>
                <div class="weapon-details">
                    <div class="display-icon">
                        <img src="${weapon.displayIcon}" alt="${weapon.displayName} Icon">
                    </div>
                    <p>${weapon.description}</p>
                    <h3>Stats:</h3>
                    <ul>
                        <li>Category: ${category}</li>
                        <li>Fire Rate: ${stats.fireRate}</li>
                        <li>Magazine Size: ${stats.magazineSize}</li>
                        <li>Reload Time: ${stats.reloadTimeSeconds}</li>
                        <li>Headshot Damage: ${damage.headDamage}</li>
                        <li>Body Damage: ${damage.bodyDamage}</li>
                        <li>Leg Damage: ${damage.legDamage}</li>
                        <li>Cost: ${cost}</li>
                        <!-- Add more stats as needed -->
                    </ul>
                    <!-- Add more details as needed -->
                </div>
            </body>
            </html>
        `;

        // Replace the current page's content with the new HTML content
        document.open();
        document.write(newContent);
        document.close();
    }

    // Fetch weapon details from the API
    function fetchWeaponDetails() {
    
        // Loop through each UUID and fetch details
        gunUuids.forEach(weaponUuid => {
            const apiUrl = `https://valorant-api.com/v1/weapons/${weaponUuid}`;
    
            // Fetch weapon data from the API
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Extract relevant information
                    const weapon = data.data;
                    const weaponCard = createWeaponCard(weapon);
                    weaponDetailsDiv.appendChild(weaponCard);
                })
                .catch(error => console.error(`Error fetching weapon data for ${weaponUuid}:`, error));
        });
    }
    // Call the function to fetch and display weapon details
    fetchWeaponDetails();
});
