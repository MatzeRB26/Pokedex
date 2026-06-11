async function loadPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();

    renderPokemon(pokemon);
}

async function loadFirstPokemon() {
    for (let i = 1; i <= 40; i++) {
        await loadPokemon(i);
    }
}
loadFirstPokemon();

function renderPokemon(pokemon) {
    const pokemonContainer = document.getElementById("pokemon-container");
    pokemonContainer.innerHTML += getPokemonCardTemplate(pokemon);
}

// function getTypeColor(type) {
//     const colors = {
//         fire: "#F08030",
//         water: "#6890F0",
//         grass: "#78C850",
//         electric: "#F8D030",
//         psychic: "#F85888",
//         ice: "#98D8D8",
//         dragon: "#7038F8",
//         dark: "#705848",
//         fairy: "#EE99AC",
//         normal: "#A8A878",
//         fighting: "#C03028",
//         flying: "#A890F0",
//         poison: "#A040A0",
//         ground: "#E0C068",
//         rock: "#B8A038",
//         bug: "#A8B820",
//         ghost: "#705898",
//         steel: "#B8B8D0",
//     };
//     return colors[type] || "#A8A878";
// }


// function loadMore() {
//     for (let i = 1; i <= 20; i++) {
//         innerHTML += loadPokemon(i);
//     }
//     const pokemonContainer = document.getElementById("load-more");
//     pokemonContainer.innerHTML += getPokemonCardTemplate(pokemon);
// }
// loadMore();

//#region Dialog-----------------------------------------------------------------------
function openDialog(index) {
    const PkmDialog = document.getElementById("card-dialog");
    updateDialog();
    document.body.style.overflow = "hidden";
    dialog.showModal();
}

function closeDialog() {
    const PkmDialog = document.getElementById("card-dialog");
    document.body.style.overflow = "auto";
    dialog.close();

    function updateDialog() {
    const dialogCard = document.getElementById("dialogContent");
    fetchPokemon();
}
}

function leftBtn() {
    currentPkmCardIndex--;
    if (currentPkmCardIndex < 0) {
        currentPkmCardIndex = allPokemon.length - 1;
    }
    updateDialog();
}

function rightBtn() {
    currentPkmCardIndex++;
    if (currentPkmCardIndex >= allPokemon.length) {
        currentPkmCardIndex = 0;
    }
    updateDialog();
}

document.addEventListener("keydown", function(e) {
    if (dialog.open) {
        if (e.key === "Enter") {
            rightBtn();
        }
        if (e.key === "ArrowLeft") {
            leftBtn();
        }
        if (e.key === "ArrowRight") {
            rightBtn();
        }
    }
});
// #endregion---------------------------------------------------------------------------