// API pública Rick and Morty: https://rickandmortyapi.com/api/character
const API_URL = "https://rickandmortyapi.com/api/character";

const cardsContainer = document.getElementById("cards");
const message = document.getElementById("message");
const counter = document.getElementById("counter");
const searchInput = document.getElementById("search");
const statusSelect = document.getElementById("status");
const clearButton = document.getElementById("clear");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const pageLabel = document.getElementById("page");

let characters = [];
let nextUrl = null;
let prevUrl = null;
let pageNumber = 1;

function translateStatus(status) {
  return { Alive: "Vivo", Dead: "Morto", unknown: "Desconhecido" }[status] || status;
}

// Cria cada card dinamicamente usando os dados recebidos da API.
function createCharacterCard(character) {
  const card = document.createElement("article");
  card.classList.add("card");

  const image = document.createElement("img");
  image.src = character.image;
  image.alt = "Imagem de " + character.name;
  image.loading = "lazy";

  const body = document.createElement("div");
  body.classList.add("card-body");

  const name = document.createElement("h3");
  name.textContent = character.name;

  const status = document.createElement("span");
  status.classList.add("status", character.status.toLowerCase());
  status.textContent = translateStatus(character.status);

  const meta = document.createElement("div");
  meta.classList.add("meta");
  meta.textContent = "Espécie: " + character.species + " • Origem: " + character.origin.name;

  body.appendChild(name);
  body.appendChild(status);
  body.appendChild(meta);
  card.appendChild(image);
  card.appendChild(body);
  return card;
}

// Filtra os resultados da página atual e insere os cards no DOM.
function renderCharacters() {
  cardsContainer.innerHTML = "";
  const term = searchInput.value.trim().toLowerCase();
  const selectedStatus = statusSelect.value;

  const filtered = characters.filter(character => {
    const nameMatches = character.name.toLowerCase().includes(term);
    const statusMatches = selectedStatus === "all" ||
      character.status.toLowerCase() === selectedStatus;
    return nameMatches && statusMatches;
  });

  filtered.forEach(character => {
    const card = createCharacterCard(character);
    cardsContainer.appendChild(card); // Adiciona o card criado ao HTML.
  });

  counter.textContent = filtered.length + " personagem(ns) nesta página";
  message.textContent = filtered.length ? "" : "Nenhum personagem encontrado com esses filtros.";
}

// Busca os personagens na API com fetch e converte a resposta para JSON.
async function loadCharacters(url = API_URL) {
  message.textContent = "Carregando personagens...";
  cardsContainer.innerHTML = "";
  nextButton.disabled = true;
  prevButton.disabled = true;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro HTTP: " + response.status);

    const data = await response.json();
    characters = data.results;
    nextUrl = data.info.next;
    prevUrl = data.info.prev;

    renderCharacters();
    pageLabel.textContent = "Página " + pageNumber;
    nextButton.disabled = !nextUrl;
    prevButton.disabled = !prevUrl;
  } catch (error) {
    console.error("Erro ao consumir a API:", error);
    message.textContent = "Não foi possível carregar os dados. Confira a internet e tente novamente.";
    counter.textContent = "API indisponível";
  }
}

searchInput.addEventListener("input", renderCharacters);
statusSelect.addEventListener("change", renderCharacters);
clearButton.addEventListener("click", () => {
  searchInput.value = "";
  statusSelect.value = "all";
  renderCharacters();
});
nextButton.addEventListener("click", () => {
  if (nextUrl) { pageNumber++; loadCharacters(nextUrl); }
});
prevButton.addEventListener("click", () => {
  if (prevUrl) { pageNumber--; loadCharacters(prevUrl); }
});

// Carrega a primeira página assim que o JavaScript é executado.
loadCharacters();
