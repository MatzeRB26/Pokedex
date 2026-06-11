const Base_Url = "https://pokeapi.co/api/v2/pokemon";
const pokemon_per_load = 30; 

let currentOffset = 0;
let pokemonCage = {};
let loadedPokemons = [];
let currentIndex = 0;

async function loadPokemon() {
    const response = await fetch(`${Base_Url}?limit=${pokemon_per_load}&offset=${currentOffset}`,);
    const data = await response.json();

    return data.results;
}
async function fetchPokemonDetails(url) {
    if (pokemonCage[url]) return pokemonCage[url];
    const response = await fetch(url);
    const data = await response.json();
    pokemonCage[url] = data;
    return data;
}

