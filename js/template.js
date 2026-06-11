function getPokemonCardTemplate(pokemon) {
    return `
        <button data-id="card" class="pokemon-card">
            <span class="pokemon-id">
                #${pokemon.id} 
            </span>
            <img
                class="pokemon-image"
                data-id="card-image"
                src="${pokemon.sprites.other["official-artwork"].front_default}"
                alt="${pokemon.name}"
            >
            <h2>
                ${pokemon.name}
            </h2>
            <div class="pokemon-types">
                <span class="type-badge ${pokemon.types[0].type.name}">
                    ${pokemon.types[0].type.name.toUpperCase()}
                </span>
                ${pokemon.types[1] ? `<span class="type-badge ${pokemon.types[1].type.name}">
                ${pokemon.types[1].type.name.toUpperCase()}</span> `: ""}
            </div>
        </button>
    `;
}

// function getPokemonDialogTemplate(pokemon) {
//     return /*html*/`
//         <h2>${pokemon.name}</h2>
//         <p>#${pokemon.id}</p>
//         <div class="dialog-tabs">
//             <button id="about-Tab">About</button>
//             <button id="stats-Tab">Stats</button>
//         </div>
//         <div id="dialog-content"></div>
//         <div class="dialog-bottom">
//             <button id="left" onclick="leftBtn()"><img src="assets/icons/Arrow_left.svg" alt="left"></button>
//             <button id="right" onclick="rightBtn()"><img src="assets/icons/Arrow_right.svg" alt="right"></button>
//         </div>
//     `;
// }
