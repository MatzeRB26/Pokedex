// #region Load Pokemons
async function loadMorePokemons(button) {
    button.disabled = true;
    button.textContent = "Loading...";
    showSpinner();
    currentOffset += POKEMON_PER_LOAD;
    const pokemonList = await loadPokemons();
    const details = await Promise.all(
        pokemonList.map((pokemon) => fetchPokemonDetails(pokemon.url)),
    );
    renderCards(details);
    await new Promise((resolve) => setTimeout(resolve, 1500));
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
        const hint = document.get;
        ElementById("search-hint");
        if (input.value.length < 3) {
            hint.classLIst.add("visible");
            return;
        }
        hint.classLIst.remove("visible");
        filterPokemons(input.value);
        showClearButton();
    });
}

function setupSearchInput(input) {
    input.addEventListener("keyup", (e) => {const hint = document.getElementById("search-hint");
        if (input.value.length >= 3) {
            hint.classList.remove("visible");
            filterPokemons(input.value);
        }
        if (input.value.length > 0 && input.value.length < 3) {
            hint.classList.add("visible");
        }
        if (input.value.length === 0) {
            hint.classList.remove("visible");
            resetSearch();
        }
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

// #region Load Pokemons/Init
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
    const loadMoreButton = document.querySelector("[data-id='load-more-button']",);
    loadMoreButton.disabled = true;
    await loadInitialPokemons(loadMoreButton);
    setupLoadMoreButton();
    setupSearch();
}
init();
// #endregion

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
