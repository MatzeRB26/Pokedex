// #region Load Pokemons
async function loadMorePokemons(button) {
    button.disabled = true;
    button.textContent = "Loading...";
    showSpinner();
    currentOffset += POKEMON_PER_LOAD;
    const pokemonList = await loadPokemons();
    const details = await Promise.all(
        pokemonList.map((pokemon) => fetchPokemonDetails(pokemon.url)),); 
    renderCards(details);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    hideSpinner();
    button.disabled = false;
    button.textContent = "Load More";
}

function setupLoadMoreButton() {
    const button = document.querySelector("[data-id='load-more-button']");
    button.addEventListener("click", () => loadMorePokemons(button));
}
// #endregion

// #region Search Pokemon
function setupSearchButton(button, input) {
    button.addEventListener("click", () => {
        if (input.value.length < 3) return;
        filterPokemons(input.value);
    });
}

function setupSearchInput(input) {
    input.addEventListener("keyup", (e) => {
        if (e.key === "Enter" && input.value.length >= 3) {
            filterPokemons(input.value);
        }
        if (input.value.length === 0) resetSearch();
    });
}

function setupSearch() {
    const button = document.querySelector("[data-id='search-button']");
    const input = document.querySelector("[data-id='search-input']");
    setupSearchButton(button, input);
    setupSearchInput(input);
}

function resetSearch() {
    activPokemons = [];
    const main = document.querySelector("[data-id='content']");
    main.innerHTML = "";
    for (let i = 0; i < loadedPokemons.length; i++) {
        appendCard(loadedPokemons[i], main);
    }
    addCardListeners();
}
// #endregion

async function loadInitialPokemons(loadMoreButton) {
    const pokemonList = await loadPokemons();
    const details = await Promise.all(
        pokemonList.map((pokemon) => fetchPokemonDetails(pokemon.url)),
    );
    renderCards(details);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    hideSpinner();
    loadMoreButton.disabled = false;
}

async function init() {
    // showSpinner();
    const loadMoreButton = document.querySelector(
        "[data-id='load-more-button']",
    );
    loadMoreButton.disabled = true;
    await loadInitialPokemons(loadMoreButton);
    setupLoadMoreButton();
    setupSearch();
}
init();

// #region Spinner
function showSpinner() {
    const spinner = document.createElement("div");
    spinner.classList.add("spinner-overlay");
    spinner.innerHTML = `<div class="pokemon-spinner"></div>`;
    document.body.appendChild(spinner);
}

function hideSpinner() {
    const spinner = document.querySelector(".spinner-overlay");
    if (spinner) spinner.remove();
}
// #endregion
