document.addEventListener('DOMContentLoaded', function () {
    const bundlesContainer = document.getElementById('bundles-container');

    // Fetch bundles from the API
    fetch('https://valorant-api.com/v1/bundles')
        .then(response => response.json())
        .then(data => {
            const bundles = data.data;

            // Display each bundle as a card
            bundles.forEach(bundle => {
                const bundleCard = createBundleCard(bundle);
                bundlesContainer.appendChild(bundleCard);
            });
        })
        .catch(error => console.error('Error fetching bundles:', error));

    // Function to create a bundle card
    function createBundleCard(bundle) {
        const bundleCard = document.createElement('div');
        bundleCard.classList.add('bundle-card');
        bundleCard.style.backgroundImage = `url(${bundle.verticalPromoImage})`;

        const displayName = document.createElement('h2');
        displayName.textContent = bundle.displayName;

        bundleCard.appendChild(displayName);

        // Add click event listener to open bundle details
        bundleCard.addEventListener('click', function () {
            openBundleDetails(bundle);
        });

        return bundleCard;
    }

    // Function to open bundle details
    function openBundleDetails(bundle) {
        // Clear existing content
        bundlesContainer.innerHTML = '';

        // Create bundle details content
        const bundleDetails = document.createElement('div');
        bundleDetails.classList.add('bundle-details');
        bundleDetails.style.backgroundImage = `url(${bundle.displayIcon})`;

        // Append bundle details to the container
        bundlesContainer.appendChild(bundleDetails);
    }
});
