document.addEventListener('DOMContentLoaded', function () {
    var agentDetails = document.querySelector('.agent-details');

    // Fetch agent data from the API
    fetch('https://valorant-api.com/v1/agents')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var agents = data.data;

            // Get the agent UUID from the URL query parameter
            var urlParams = new URLSearchParams(window.location.search);
            var agentUUID = urlParams.get('uuid');

            // Find the agent with the matching UUID
            var agent = agents.find(function (a) {
                return a.uuid === agentUUID;
            });

            if (agent) {
                // Populate agent details
                document.getElementById('agent-image').style.backgroundImage = `url('${agent.background}')`;
                document.getElementById('agent-name').textContent = agent.displayName;
                document.getElementById('agent-image').src = agent.fullPortrait;
                document.getElementById('agent-description').textContent = agent.description;
                document.getElementById('agent-role').textContent = agent.role.displayName;

                // Populate agent abilities (show only first four)
                var abilitiesGrid = document.getElementById('agent-abilities');
                abilitiesGrid.innerHTML = '';

                agent.abilities.slice(0, 4).forEach(function (ability) {
                    var abilityCard = document.createElement('div');
                    abilityCard.classList.add('ability-card');
                    abilityCard.innerHTML = `
                        <img src="${ability.displayIcon}" alt="${ability.displayName}">
                        <h4>${ability.displayName}</h4>
                        <div class="ability-description">
                            <p>${ability.description}</p>
                        </div>
                    `;
                    abilitiesGrid.appendChild(abilityCard);

                    // Add mouseover event listener to show ability description
                    abilityCard.addEventListener('mouseover', function () {
                        showAbilityDescription(abilityCard);
                    });

                    // Add mouseout event listener to hide ability description
                    abilityCard.addEventListener('mouseout', function () {
                        hideAbilityDescription(abilityCard);
                    });
                });

                // Show agent details section
                agentDetails.style.display = 'block';
            }
        })
        .catch(function (error) {
            console.log('Error:', error);
        });

    // Function to show ability description on hover
    function showAbilityDescription(abilityCard) {
        var descriptionBox = abilityCard.querySelector('.ability-description');
        descriptionBox.style.display = 'block';
    }

    // Function to hide ability description on mouseout
    function hideAbilityDescription(abilityCard) {
        var descriptionBox = abilityCard.querySelector('.ability-description');
        descriptionBox.style.display = 'none';
    }




    if (agent) {
        // Populate agent background
        var agentBackground = document.getElementById('agent-background');
        agentBackground.style.backgroundImage = `url('${agent.background}')`;

        // Populate agent details
        document.getElementById('agent-name').textContent = agent.displayName;
        document.getElementById('agent-image').src = agent.fullPortrait;
        document.getElementById('agent-description').textContent = agent.description;
        document.getElementById('agent-role').textContent = agent.role.displayName;

        // Populate agent abilities
        var abilitiesGrid = document.getElementById('agent-abilities');
        abilitiesGrid.innerHTML = '';

        agent.abilities.slice(0, 4).forEach(function (ability) { // Only show the first 4 abilities
            var abilityCard = document.createElement('div');
            abilityCard.classList.add('ability-card');
            abilityCard.innerHTML = `
            <img src="${ability.displayIcon}" alt="${ability.displayName}">
            <h4>${ability.displayName}</h4>
        `;
            abilitiesGrid.appendChild(abilityCard);

            // Add click event listener to show ability description box
            abilityCard.addEventListener('click', function () {
                showAbilityDescription(ability);
            });
        });

        // Show agent details section
        agentDetails.style.display = 'block';
    }
    
});
