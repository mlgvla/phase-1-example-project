let listItems = document.getElementById("list-items");
let pokeImg = document.getElementById("pokemon-image");
let pokeLikes = document.getElementById("like-count");
let pokeComments = document.getElementById("comments-list");
let pokeName = document.getElementById("pokemon-name");
let likeBtn = document.getElementById("like-button");

function renderPokemonMenuItem(poke) {
  let img = document.createElement("img");
  let span = document.createElement("span");
  let card = document.createElement("div");

  let capName = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);

  img = poke.sprites.main_artwork;
  span.textContent = capName;
  console.log(img);
  card.setAttribute("class", "col mb-3");
  card.innerHTML = `<div class="card pt-3">
                <img
                  src="${img}"
                  alt=""
                  class="card-img-top"
                />
                <div class="card-body">
                  <p class="card-title small text-center">${capName}</p>
                </div>
              </div>
            </div>`;
  card.addEventListener("click", () => showPokemonDetail(poke));

  listItems.append(card);
}
function showPokemonDetail(poke) {
  let capName = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);

  pokeImg.src = poke.sprites.main_artwork;
  pokeName.textContent = capName;
  pokeLikes.textContent = `${poke.likes} likes`;
  likeBtn.addEventListener("click", addLike);
  //render comments
}

function addLike() {
  let likes = parseInt(pokeLikes.textContent);
  likes++;
  pokeLikes.textContent = `${likes} likes`;
}

function fetchPokemon() {
  fetch("http://localhost:3000/pokemon")
    .then((response) => response.json())
    .then((pokemon) => {
      pokemon.sort((a, b) => a.order - b.order);
      pokemon.forEach((poke) => renderPokemonMenuItem(poke));
      showPokemonDetail(pokemon[0])
    });
}

function app() {
  fetchPokemon();
}

app();
