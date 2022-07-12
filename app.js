document.querySelector("#procurar").addEventListener("click", getPokemon);

const typeColors = {
  electric: '#FFEA70',
  normal: '#B09398',
  fire: '#FF675C',
  water: '#0596C7',
  ice: '#AFEAFD',
  rock: '#999799',
  flying: '#7AE7C7',
  grass: '#4A9681',
  psychic: '#FFC6D9',
  ghost: '#561D25',
  bug: '#A2FAA3',
  poison: '#795663',
  ground: '#D2B074',
  dragon: '#DA627D',
  steel: '#1D8A99',
  fighting: '#2F2F2F',
  default: '#2A1A1F',
};

let tipo1 = document.querySelector('.tipoPokemon1') 
let tipo2 = document.querySelector('.tipoPokemon2') 
let pokemonImg = document.querySelector('#pokemon')
let conteudo = document.querySelector('.status')
let nomePokemon = document.querySelector('.nomePokemon')


function getPokemon(e) {
  const nome = document.querySelector("#nomePokemon").value;
  const pokemonName = lowerCaseName(nome);

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      pokemonImg.innerHTML=`
        <img src="${data.sprites.front_default}">  
      `
      tipoPokemon(data,tipo1,tipo2)
      nomePokemons(data,nomePokemon)
      statusPokemon(data,conteudo)


    })
    .catch((err) => {
      console.log("Pokemon não encontrado", err);
    });

  e.preventDefault();
}
function statusPokemon(data,campo){
  campo.innerHTML=`
    
    <h3>Hp:${data.stats[0].base_stat}</h3>
    <h3>Ataque:${data.stats[1].base_stat}</h3>
    <h3>Defesa:${data.stats[2].base_stat}</h3>
    <h3>Sp At:${data.stats[3].base_stat}</h3>
    <h3>Sp Def:${data.stats[4].base_stat}</h3>
    <h3>Velocidade:${data.stats[5].base_stat}</h3>
  `
}

function nomePokemons(data,campo){
  let nome = data.name
  nome = primeiraMaiucula(nome)
  campo.innerHTML=`
  <p>${nome}</p>
  `
}

function tipoPokemon(data,tipo1,tipo2){
  let cor1,cor2=''
  if(data.types.length>1){
    tipo1.innerHTML=`<p>${data.types[0].type.name}</p>`
    tipo2.innerHTML =`<p>${data.types[1].type.name}<p/>`
    cor1=data.types[0].type.name
    cor2=data.types[1].type.name

  }else{
    tipo1.innerHTML=`<p>${data.types[0].type.name}</p>`
    tipo1.style.color = typeColors[tipo1]
    tipo2.innerHTML=''
    cor1=data.types[0].type.name
  }
  tipo1.style.color = typeColors[cor1]
  tipo2.style.color = typeColors[cor2]
}

function primeiraMaiucula(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
  return string.toLowerCase();
}