const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const POKEMON_PER_LOAD = 24;

let currentOffset = 0;
let pokemonCache = {};
let loadedPokemons = [];
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