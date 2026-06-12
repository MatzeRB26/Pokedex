// #region Colors & Icons
function getTypeColor(type) {
    const colors = {
        fire: "#f08030",
        water: "#6891f0",
        grass: "#78c850", 
        electric: "#F8D030",
        psychic: "#F85888",
        ice: "#98D8D8",
        dragon: "#7038F8",
        dark: "#705848",
        fairy: "#EE99AC",
        normal: "#A8A878",
        fighting: "#C03028",
        flying: "#A890F0",
        poison: "#A040A0",
        ground: "#E0C068",
        rock: "#B8A038",
        bug: "#A8B820",
        ghost: "#705898",
        steel: "#B8B8D0",
    };
    return colors[type] || "#A8A878";
}

function getTypeIcon(type) {
    const icons = {
        fire: "🔥",
        water: "💧",
        grass: "🌿",
        electric: "⚡",
        psychic: "🔮",
        ice: "❄️",
        dragon: "🐉",
        dark: "🌑",
        fairy: "✨",
        normal: "⭐",
        fighting: "👊",
        flying: "🌪️",
        poison: "☠️",
        ground: "🪨",
        rock: "💎",
        bug: "🐛",
        ghost: "👻",
        steel: "⚙️",
    };
    return icons[type] || "❓";
}
// #endregion

// #region Card Templates
function createTypeBadges(types) {
    return types
        .map(
            (t) => `
        <span class="type">${getTypeIcon(t.type.name)} ${t.type.name}</span>
    `,
        )
        .join("");
}

function createCardTemplate(pokemon) {
    const type = pokemon.types[0].type.name;
    const bgColor = getTypeColor(type);
    return `
        <button data-id="card" data-pokemon-id="${pokemon.id}" style="background-color: ${bgColor}">
            <span>#${pokemon.id}</span>
            <h2>${pokemon.name.toUpperCase()}</h2>
            <img data-id="card-image" src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
            <div class="types">${createTypeBadges(pokemon.types)}</div>
        </button>
    `;
}
// #endregion

// #region Dialog Template
function createMainTabTemplate(pokemon) {
    const abilities = pokemon.abilities.map((a) => a.ability.name).join(", ");
    return `
        <div class="info-row">
            <span class="info-label">Height</span>
            <span class="info-value">${pokemon.height / 10} m</span>
        </div>
        <div class="info-row">
            <span class="info-label">Weight</span>
            <span class="info-value">${pokemon.weight / 10} kg</span>
        </div>
        <div class="info-row">
            <span class="info-label">Base Exp</span>
            <span class="info-value">${pokemon.base_experience}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Abilities</span>
            <span class="info-value">${abilities}</span>
        </div>
    `;
}

function createStatsTabTemplate(pokemon) {
    const stats = [
        { label: "HP", value: pokemon.stats[0].base_stat },
        { label: "Attack", value: pokemon.stats[1].base_stat },
        { label: "Defense", value: pokemon.stats[2].base_stat },
        { label: "Sp. Atk", value: pokemon.stats[3].base_stat },
        { label: "Sp. Def", value: pokemon.stats[4].base_stat },
        { label: "Speed", value: pokemon.stats[5].base_stat },
    ];
    return stats
        .map(
            (stat) => `
        <div class="stat-row">
            <span class="stat-label">${stat.label}</span>
            <span class="stat-value">${stat.value}</span>
            <div class="stat-bar-bg">
                <div class="stat-bar" style="width: ${Math.min((stat.value / 255) * 100, 100)}%"></div>
            </div>
        </div>
    `,
        )
        .join("");
}

function createEvoChainTemplate(evoDetails) {
    return `
        <div class="evo-chain">
            ${evoDetails
                .map(
                    (pokemon, index) => `
                ${index > 0 ? '<span class="evo-arrow">→</span>' : ""}
                <div class="evo-item">
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
                    <span>${pokemon.name.toUpperCase()}</span>
                </div>
            `,
                )
                .join("")}
        </div>
    `;
}

function createDialogTopTemplate(pokemon) {
    const bgColor = getTypeColor(pokemon.types[0].type.name);
    return `
        <div class="dialog-top" style="background-color: ${bgColor}">
            <button data-id="close-dialog-button" onclick="closeDialog()">✕</button>
            <span class="dialog-id">#${pokemon.id}</span>
            <h2>${pokemon.name.toUpperCase()}</h2>
            <img data-id="dialog-image" src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
            <div class="types">${createTypeBadges(pokemon.types)}</div>
        </div>
    `;
}

function createDialogTemplate(pokemon) {
    return `
        <div class="dialog-inner">
            ${createDialogTopTemplate(pokemon)}
            <div class="dialog-bottom" data-id="overlay-pokemon-name">
                <div class="tabs">
                    <button class="tab-btn active" onclick="switchTab(event, 'tab-main')">main</button>
                    <button class="tab-btn" onclick="switchTab(event, 'tab-stats')">stats</button>
                    <button class="tab-btn" onclick="switchTab(event, 'tab-evo')">evo chain</button>
                </div>
                <div id="tab-main" class="tab-content active">${createMainTabTemplate(pokemon)}</div>
                <div id="tab-stats" class="tab-content">${createStatsTabTemplate(pokemon)}</div>
                <div id="tab-evo" class="tab-content"><p>Loading...</p></div>
                <div class="dialog-nav">
                    <button data-id="prev-button" onclick="navigateDialog(-1)">←</button>
                    <button data-id="next-button" onclick="navigateDialog(1)">→</button>
                </div>
            </div>
        </div>
    `;
}
// #endregion