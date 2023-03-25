//Constante que receberá a url da API
const url = 'https://pokeapi.co/api/v2/pokemon/'

//Função para diminuir a escrita de pegar os elementos HTML
function getElement(element) {
    return document.querySelector(element)
}

//Capturando os elementos HTML 
const searchInput = getElement('.search-input'),
    searchButton = getElement('.search-button'),
    container = getElement('.pokemon'),
    erroMessage = getElement('.error');

//Criando as váriaveis globais que serão usadas
var pokeName, //Nome ou número passado na caixa de buscar
    pokemon, //Responsável por guardar os dados recebidos da API
    card; //Responsável por receber o HTML


// fetch(url)
//     .then(res => res.json())//Recebe a resposta da requisição por meio de uma função transformamos essa repsota em um JSON
//     .then(data => console.log(data))//Recebe essa reposta e imprime no console
//     .catch(err => console.log(err))//Caso ocorra erro imprime mensagem de erro no console

//Função responsável por fazer requisição para a API e inserir as respostas na variável pokemon
function requestPokeInfo(url, name) {
    fetch(url + name)
        .then(res => res.json())
        .then(data => {
            pokemon = data
        })
        .catch(err => console.log(err))
}

//Função responsável por montar o HTML exibido na página ((((NÃO ENTENDI MUITO BEM ESSA PARTE, ESTUDAR MAIS))))
function createCard() {
    card = `
    <div class="pokemon-picture">
      <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
    </div>
    <div class="pokemon-info">
        <h1 class="name">Name: ${pokemon.name}</h1>
        <h2 class="number">Nº ${pokemon.id}</h2>
        <h3 class="type">Type: ${pokemon.types.map(item => item.type.name).toString()}</h3>
        <h3 class="skill">Skills: ${pokemon.moves.map(item => ' ' + item.move.name).toString()}</h3>
        <h3 class="weight">Weight: ${pokemon.weight  / 10}kg</h3>
        <h3 class="height">Height: ${pokemon.height  / 10}m</h3>
    </div>`;
  return card;
}

//Função que faz a chamada das principais funções e inicia o APP, ela será utilizada no evento click do botão searchButton
function startApp(pokeName) {
    requestPokeInfo(url, pokeName)
    setTimeout(() => {
        container.innerHTML = createCard()
    }, 2000)
}

//Adicionando evento que quando clica no botão start passa tudo para minusculo o que está digitado
//e faz a busca do número ou nome na função startApp
searchButton.addEventListener('click', event => {
    event.preventDefault()
    pokeName = searchInput.value.toLowerCase()
    startApp(pokeName)
})