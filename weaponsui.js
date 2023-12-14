document.addEventListener('DOMContentLoaded', function () {
    // Select the weaponDetails div
    const weaponDetailsDiv = document.getElementById('weaponDetails');

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

        weaponCard.innerHTML = `
            <div class="weapon-info">
                <img src="${weapon.displayIcon}" alt="${weapon.displayName}" data-weapon-id="${weapon.uuid}">
                <h4 style="text-align:center">${weapon.displayName}</h4>
            </div>
        `;

        weaponCard.addEventListener('click', function () {
            openWeaponDetails(weapon);
        });

        return weaponCard;
    }

    // Function to open weapon details in the same page
    function openWeaponDetails(weapon) {
        // Clear existing content in weaponDetailsDiv
        weaponDetailsDiv.innerHTML = '';

        // Create new content for weapon details
        const htmlContent = `
            <div class="weapon-details">
                <h1>${weapon.displayName}</h1>
                <div class="display-icon">
                    <img src="${weapon.displayIcon}" alt="${weapon.displayName} Icon">
                </div>
                <h3>Stats:</h3>
                <ul>
                    <li>Category: ${weapon.shopData.category}</li>
                    <li>Fire Rate: ${weapon.weaponStats.fireRate}</li>
                    <li>Magazine Size: ${weapon.weaponStats.magazineSize}</li>
                    <li>Reload Time: ${weapon.weaponStats.reloadTimeSeconds}</li>
                    <li>Headshot Damage: ${weapon.weaponStats.damageRanges[0].headDamage}</li>
                    <li>Body Damage: ${weapon.weaponStats.damageRanges[0].bodyDamage}</li>
                    <li>Leg Damage: ${weapon.weaponStats.damageRanges[0].legDamage}</li>
                    <li>Cost: ${weapon.shopData.cost}</li>
                    <!-- Add more stats as needed -->
                </ul>
            </div>
        `;

        // Append the new content to weaponDetailsDiv
        weaponDetailsDiv.innerHTML = htmlContent;
    }

    // Fetch weapon details from the API
    function fetchWeaponDetails() {
        gunUuids.forEach(weaponUuid => {
            const apiUrl = `https://valorant-api.com/v1/weapons/${weaponUuid}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
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
