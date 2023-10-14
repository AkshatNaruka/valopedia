document.addEventListener('DOMContentLoaded', function () {
    var agentGrid = document.getElementById('agent-grid');

    // Fetch agent data from the API
    fetch('https://valorant-api.com/v1/agents')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var agents = data.data;

            // Filter out the excluded agent by UUID
            agents = agents.filter(function (agent) {
                return agent.uuid !== 'ded3520f-4264-bfed-162d-b080e2abccf9';
            });

            // Create agent buttons and populate the grid
            agents.forEach(function (agent) {
                var button = document.createElement('button');
                button.classList.add('agent-button');
                button.innerHTML = `

          <img src="${agent.displayIcon}" alt="${agent.displayName}">
          <span>${agent.displayName}</span>
        `;
                button.addEventListener('click', function () {
                    openAgentDetails(agent);
                });
                agentGrid.appendChild(button);
            });
        })
        .catch(function (error) {
            console.log('Error:', error);
        });
});

function openAgentDetails(agent) {
    var agentURL = 'agent-details.html?uuid=' + agent.uuid;
    window.open(agentURL, '_self');
}

function toggleAgentDescription(button, description) {
    var agentDescription = button.querySelector('.agent-description');
    agentDescription.textContent = description;

    // Toggle visibility of agent description
    agentDescription.classList.toggle('hidden');
}
