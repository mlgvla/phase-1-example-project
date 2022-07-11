// THIS FILE CREATES POKEMON OBJECTS FROM POKEMON API AND POSTS TO PROJECT'S DATABASE (DB.JSON)

// LINK TO INDEX.HTML TO RUN IT

// YOU CAN THEN COPY THE DATA TO THE SEED FILE


function getPokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=25")
      .then((r) => r.json())
      .then((pokemon) => {
        pokemon.results.forEach((poke) => {
          getPokemonData(poke);
        });
      });
  }
  
  function getPokemonData(poke) {
    fetch(poke.url)
      .then((r) => r.json())
      .then((pokeData) => makePokemonObjects(pokeData));
  }
  
  function makePokemonObjects(poke) {
    pokeObj = {
      name: poke.name,
      order: poke.order,
      sprites: {
        front: poke.sprites.front_default,
        main_artwork: poke.sprites.other["official-artwork"].front_default,
      },
      likes: 0,
      comments: [],
    };
  
    fetch("http://localhost:3000/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokeObj),
    })
      .then((r) => r.json())
      .then((pokeRes) => console.log(pokeRes));
  }
  
  getPokemon();
  