function openDialog(pokemon) {
    const dialog = document.querySelector("[data-id='dialog']");
    dialog.innerHTML = createDialogTemplate(pokemon);
    dialog.showModal();
    document.body.style.overflow = "hidden";
    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) closeDialog();
    });
}

function closeDialog() {
    const dialog = document.querySelector("[data-id='dialog']");
    dialog.close();
    document.body.style.overflow = "";
}

function navigateDialog(direction) {
    currentPokemonIndex += direction;
    if (currentPokemonIndex < 0)
        currentPokemonIndex = loadedPokemons.length - 1;
    if (currentPokemonIndex >= loadedPokemons.length) currentPokemonIndex = 0;
    openDialog(loadedPokemons[currentPokemonIndex]);
}

function switchTab(event, tabId) {
    const buttons = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }
    for (let i = 0; i < contents.length; i++) {
        contents[i].classList.remove("active");
    }
    event.target.classList.add("active");
    document.getElementById(tabId).classList.add("active");
    if (tabId === "tab-evo") loadEvoChain();
}

async function fetchEvoChainData(pokemonId) {
    const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`,
    );
    const speciesData = await speciesResponse.json();
    const evoResponse = await fetch(speciesData.evolution_chain.url);
    const evoData = await evoResponse.json();
    const evoChain = [];
    let current = evoData.chain;
    for (current; current !== null; current = current.evolves_to[0] || null) {
        evoChain.push(current.species.name);
    }
    return evoChain;
}

async function loadEvoChain() {
    const dialog = document.querySelector("[data-id='dialog']");
    const evoTab = dialog.querySelector("#tab-evo");
    const pokemon = loadedPokemons[currentPokemonIndex];
    const evoChain = await fetchEvoChainData(pokemon.id);
    const evoDetails = await Promise.all(
        evoChain.map((name) => fetchPokemonDetails(`${BASE_URL}/${name}`)),
    );
    evoTab.innerHTML = createEvoChainTemplate(evoDetails);
}