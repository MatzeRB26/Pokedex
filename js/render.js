// #region Type Badges
function buildTypeBadgesHtml(types) {
    let html = "";
    for (let i = 0; i < types.length; i++) {
        const typeName = types[i].type.name;
        html += createTypeBadgeTemplate(typeName);
    }
    return html;
}

function getAbilitiesString(pokemon) {
    let result = "";
    for (let i = 0; i < pokemon.abilities.length; i++) {
        if (i > 0) result += ", ";
        result += pokemon.abilities[i].ability.name;
    }
    return result;
}

function getPokemonStats(pokemon){
return [
        { label: "HP", value: pokemon.stats[0].base_stat },
        { label: "Attack", value: pokemon.stats[1].base_stat },
        { label: "Defense", value: pokemon.stats[2].base_stat },
        { label: "Sp. Atk", value: pokemon.stats[3].base_stat },
        { label: "Sp. Def", value: pokemon.stats[4].base_stat },
        { label: "Speed", value: pokemon.stats[5].base_stat },
    ];
} 

function buildStatsHtml(pokemon){
    const stats = getPokemonStats(pokemon);
    let html = "";
    for (let i = 0; i < stats.length; i++) {
        const width = Math.min((stats[i].value / 255) * 100, 100);
        html += createStatsTabTemplate(stats[i].label, stats[i].value, width);
    }
    return html;
}
// #endregion

// #region render Cards
function appendCard(pokemon, container) {
    const type = pokemon.types[0].type.name;
    const bgColor = getTypeColor(type);
    const typeBadgesHtml = buildTypeBadgesHtml(pokemon.types);
    const div = document.createElement("div");
    div.innerHTML = createCardTemplate(pokemon, bgColor, typeBadgesHtml);
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

function findPokemonIndex(pokemon, list) {
    if (!pokemon || !list) return -1;
    for (let i = 0; i < loadedPokemons.length; i++) {
        if (list[i] &&  list[i].id === pokemon.id) {
        return i;}
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
            const list = activePokemons.length > 0 ? activePokemons : loadedPokemons;
            currentPokemonIndex = findPokemonIndex(pokemon, list);
            openDialog(pokemon);
        };
    }
}
// #endregion

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
            loadedPokemons[i].name.toLowerCase().includes(searchTerm.toLowerCase())
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
        activePokemons = [];
        showNotFound(main);
        return;
    }
    activePokemons = filtered;
    for (let i = 0; i < filtered.length; i++) {
        appendCard(filtered[i], main);
    }
    addCardListeners();
}
// #endregion
