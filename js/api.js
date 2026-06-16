const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const POKEMON_PER_LOAD = 20;

let currentOffset = 0;
let pokemonCache = {};
let loadedPokemons = [];
let activePokemons = [];
let currentPokemonIndex = 0;

async function loadPokemons() {
    const response = await fetch(
        `${BASE_URL}?limit=${POKEMON_PER_LOAD}&offset=${currentOffset}`,
    );
    const data = await response.json();
    return data.results;
}

async function fetchPokemonDetails(url) {
    if (pokemonCache[url]) return pokemonCache[url];
    const response = await fetch(url);
    const data = await response.json();
    pokemonCache[url] = data;
    return data;
}

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