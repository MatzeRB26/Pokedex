// #region Card Template
function createTypeBadgeTemplate(typeName){
    return`
        <span class="type ${typeName}">${typeName}</span>
    `;
}

function createCardTemplate(pokemon, bgColor, typeBadgesHtml) {
    return `
        <button data-id="card" data-pokemon-id="${pokemon.id}" style="background-color: ${bgColor}">
            <span>#${pokemon.id}</span>
            <h2>${pokemon.name.toUpperCase()}</h2>
            <img data-id="card-image" src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
            <div class="types">${typeBadgesHtml}</div>
        </button>
    `;
}
// #endregion

// #region Dialog Template
function createMainTabTemplate(height, weight, baseExp, abilities) {
    return `
        <div class="info-row">
            <span class="info-label">Height</span>
            <span class="info-value">${height} m</span>
        </div>
        <div class="info-row">
            <span class="info-label">Weight</span>
            <span class="info-value">${weight} kg</span>
        </div>
        <div class="info-row">
            <span class="info-label">Base Exp</span>
            <span class="info-value">${baseExp}</span>
        </div>
        <div class="info-row">
            <span class="info-label">Abilities</span>
            <span class="info-value">${abilities}</span>
        </div>
    `;
}

function createStatsTabTemplate(label, value, width) { 
    return `
        <div class="stat-row">
            <span class="stat-label">${label}</span>
            <span class="stat-value">${value}</span>
            <div class="stat-bar-bg">
                <div class="stat-bar" style="width: ${width}%"></div>
            </div>
        </div>
    `;
}

function createEvoItemTemplate(sprite, name) {
    return`
        <div class="evo-item">
            <img src="${sprite}" alt="${name}" />
            <span>${name}</span>
        </div>
    `;
}

function createEvoChainTemplate(evoChainHtml) { 
    return `
        <div class="evo-chain">${evoChainHtml}</div>
    `;
}

function createDialogTopTemplate(pokemon, bgColor, typeBadgesHtml) {
    return `
        <div class="dialog-top" style="background-color: ${bgColor}">
            <button data-id="close-dialog-button" onclick="closeDialog()">❌</button>
            <span class="dialog-id">#${pokemon.id}</span>
            <h2>${pokemon.name.toUpperCase()}</h2>
            <img data-id="dialog-image" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" />
            <div class="types">${typeBadgesHtml}</div>
        </div>
    `;
}

function createDialogTemplate(pokemon,bgColor,typeBadgesHtml, mainTabHtml, statsTabHtml,) {
    return`
        <div class="dialog-inner">
            ${createDialogTopTemplate(pokemon, bgColor, typeBadgesHtml)}
            <div class="dialog-bottom" data-id="overlay-pokemon-name">
                ${createTabsTemplate()}
                <div id="tab-main" class="tab-content active">${mainTabHtml}</div>
                <div id="tab-stats" class="tab-content">${statsTabHtml}</div>
                <div id="tab-evo" class="tab-content"><p>Loading...</p></div>
                ${createDialogNavTemplate()}
            </div>
        </div>
    `;
}

function createTabsTemplate() {
    return`
        <div class="tabs">
            <button class="tab-btn active" onclick="switchTab(event, 'tab-main')">main</button>
            <button class="tab-btn" onclick="switchTab(event, 'tab-stats')">stats</button>
            <button class="tab-btn" onclick="switchTab(event, 'tab-evo')">evo chain</button>
        </div>
    `;
}

function createDialogNavTemplate() {
    return`
        <div class="dialog-nav">
            <button data-id="prev-button" onclick="navigateDialog(-1)">←</button>
            <button data-id="next-button" onclick="navigateDialog(1)">→</button>
        </div>
    `;
}
// #endregion
