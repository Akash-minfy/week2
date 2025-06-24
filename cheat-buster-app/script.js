// script.js
import { searchUser } from './api.js';

const searchForm = document.getElementById('search-form');
const emailInput = document.getElementById('search-email');
const nameInput = document.getElementById('search-name');
const resultsContainer = document.getElementById('results-container');

const displayBustedResult = (user) => {
    resultsContainer.innerHTML = `
        <div class="card">
            <img src="${user.picture}" alt="User picture">
            <h3>BUSTED!</h3>
            <p><strong>${user.firstName} ${user.lastName}</strong> (${user.age}) was found in our database.</p>
            <p>They live in ${user.city}.</p>
        </div>
    `;
};

const displaySafeResult = (message) => {
    resultsContainer.innerHTML = `<p class="safe">${message}</p>`;
};

const displayError = (message) => {
    resultsContainer.innerHTML = `<p class="error">${message}</p>`;
};

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchButton = searchForm.querySelector('button');
    const originalButtonText = searchButton.textContent;

    searchButton.disabled = true;
    searchButton.textContent = 'Searching...';

    const emailToSearch = emailInput.value.trim();
    const nameToSearch = nameInput.value.trim();

    resultsContainer.innerHTML = '<p>Searching...</p>';

    const params = {};
    if (emailToSearch) params.email = emailToSearch;
    if (nameToSearch) params.name = nameToSearch;

    try {
        const data = await searchUser(params);
        displayBustedResult(data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            displaySafeResult(error.response.data.message);
        } else if (error.response && error.response.status === 400) {
            displayError(error.response.data.error);
        } else {
            displayError('Could not connect to the server. Please try again later.');
        }
    } finally {
        searchButton.disabled = false;
        searchButton.textContent = originalButtonText;
    }
});
