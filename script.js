document.addEventListener('DOMContentLoaded', function () {
    // Get the content container
    var contentContainer = document.getElementById('content');

    // Handle tab click events
    var tabs = document.querySelectorAll('nav ul li a');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function (event) {
            event.preventDefault();
            var target = this.getAttribute('href').substring(1); // Remove the "#" character

            // Load the content from the corresponding HTML file
            var xhr = new XMLHttpRequest();
            xhr.open('GET', target + '.html', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    contentContainer.innerHTML = xhr.responseText;
                }
            };
            xhr.send();
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
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
                // Populate the agent details
                document.getElementById('agent-name').textContent = agent.displayName;
                document.getElementById('agent-image').src = agent.displayIcon;
                document.getElementById('agent-description').textContent = agent.description;

                // Populate the agent abilities
                var abilitiesList = document.getElementById('agent-abilities');
                agent.abilities.forEach(function (ability) {
                    var li = document.createElement('li');
                    li.textContent = ability.displayName + ': ' + ability.description;
                    abilitiesList.appendChild(li);
                });
            }
        })
        .catch(function (error) {
            console.log('Error:', error);
        });
});

document.addEventListener('DOMContentLoaded', function () {
    var agentGrid = document.getElementById('agent-grid');
    var agentDetails = document.querySelector('.agent-details');

    // Fetch agent data from the API
    fetch('https://valorant-api.com/v1/agents')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var agents = data.data;

            // Create agent buttons and populate the grid
            agents.forEach(function (agent) {
                var button = document.createElement('button');
                button.classList.add('agent-button');
                button.innerHTML = `
          <img src="${agent.displayIcon}" alt="${agent.displayName}">
        `;
                button.addEventListener('click', function () {
                    displayAgentDetails(agent);
                });
                agentGrid.appendChild(button);
            });
        })
        .catch(function (error) {
            console.log('Error:', error);
        });

    function displayAgentDetails(agent) {
        // Populate agent details
        document.getElementById('agent-name').textContent = agent.displayName;
        document.getElementById('agent-image').src = agent.fullPortrait;
        document.getElementById('agent-description').textContent = agent.description;
        document.getElementById('agent-role').textContent = agent.role.displayName;

        // Populate agent abilities
        var abilitiesGrid = document.getElementById('agent-abilities');
        abilitiesGrid.innerHTML = '';

        agent.abilities.forEach(function (ability) {
            var abilityCard = document.createElement('div');
            abilityCard.classList.add('ability-card');
            abilityCard.innerHTML = `
        <img src="${ability.displayIcon}" alt="${ability.displayName}">
        <h4>${ability.displayName}</h4>
        <p>${ability.description}</p>
      `;
            abilitiesGrid.appendChild(abilityCard);
        });

        // Show agent details section
        agentDetails.style.display = 'block';
    }
});

