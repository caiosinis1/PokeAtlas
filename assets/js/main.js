let offset = 0;
let limit = 20;
let allPokemons = [];

const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');

function convertPokemonToHtml(pokemon) {
    return `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span> 
                <span class="name">${pokemon.name}</span> 
                <div class="detail">
                    <ol class="types">
                       ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div> 
             </li>`;
}

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        allPokemons = [...allPokemons, ...pokemons];
        renderPokemonList(allPokemons);
    });
}

function renderPokemonList(pokemons) {
    const filteredPokemons = applyFilters(pokemons);
    pokemonList.innerHTML = filteredPokemons.map(convertPokemonToHtml).join('');
}

function applyFilters(pokemons) {
    const searchQuery = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;

    return pokemons.filter(pokemon => {
        const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery);
        const matchesType = selectedType === '' || pokemon.types.includes(selectedType);

        return matchesSearch && matchesType;
    });
}

searchInput.addEventListener('input', () => {
    renderPokemonList(allPokemons);
});

typeFilter.addEventListener('change', () => {
    renderPokemonList(allPokemons);
});

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    loadPokemonItems(offset, limit);
});

loadPokemonItems(offset, limit);