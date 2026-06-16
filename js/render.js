function appendCard(pokemon, container) {
    const div = document.createElement("div");
    div.innerHTML = createCardTemplate(pokemon);
    container.appendChild(div.firstElementChild);
}

function renderCards(pokemonList) {
    const main = document.querySelector("[data-id='content']");
    for (let i = 0; i < pokemonList.length; i++) {
        loadedPokemons.push(pokemonList[i]);
        appendCard(pokemonList[i], main);
    }
    addCardListeners();
}

function findPokemonIndex(pokemon) {
    for (let i = 0; i < loadedPokemons.length; i++) {
        if (loadedPokemons[i].id === pokemon.id) return i;
    }
    return -1;
}

function addCardListeners() {
    const cards = document.querySelectorAll("[data-id='card']");
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        card.onclick = async () => {
            const id = card.dataset.pokemonId;
            const url = `${BASE_URL}/${id}`;
            const pokemon = await fetchPokemonDetails(url);
            currentPokemonIndex = findPokemonIndex(pokemon);
            openDialog(pokemon);
        };
    }
}

function showNotFound(main) {
    const notFound = document.createElement("p");
    notFound.setAttribute("data-id", "not-found");
    notFound.textContent = "No match found.";
    main.appendChild(notFound);
}

// #region Filter function Pokemon
function getFilteredPokemons(searchTerm) {
    const filtered = [];
    for (let i = 0; i < loadedPokemons.length; i++) {
        if (
            loadedPokemons[i].name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        ) {
            filtered.push(loadedPokemons[i]);
        }
    }
    return filtered;
}

function filterPokemons(searchTerm) {
    const filtered = getFilteredPokemons(searchTerm);
    const main = document.querySelector("[data-id='content']");
    main.innerHTML = "";
    if (filtered.length === 0) {
        showNotFound(main);
        return;
    }
    for (let i = 0; i < filtered.length; i++) {
        appendCard(filtered[i], main);
    }
    addCardListeners();
}
// #endregion

// #region Colors
function getTypeColor(type) {
    const colors = {
        fire: "#7e0000",
        water: "#0638ad",
        grass: "#277500d6",
        electric: "#c69f00",
        psychic: "#b80138",
        ice: "#005f5f",
        dragon: "#4c00ff",
        dark: "#3f1a01",
        fairy: "#bc5168",
        normal: "#858535",
        fighting: "#631c19",
        flying: "#2c214d",
        poison: "#2c122c",
        ground: "#4c4121",
        rock: "#B8A038",
        bug: "#2c2f0a",
        ghost: "#251938",
        steel: "#484853",
    };
    return colors[type] || "#A8A878";
}
// #endregion