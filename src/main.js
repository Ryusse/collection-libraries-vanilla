import { hideLoader, showLoader } from "./components/loader";
import { getCharacters } from "./services/characterService";

export function renderCharacters(characters) {
  const charactersContainer = document.getElementById("characters");
  charactersContainer.innerHTML = characters
    .map((character) => createCharacterCard(character))
    .join("");
}

function createCharacterCard(character) {
  return `
    <article class="card cell">
      <div class="card-image">
        <figure class="image is-4by3">
           <img src="${character.image}" alt="${character.name}" loading="lazy">
        </figure>
      </div>
      <div class="card-content">
        <h2>${character.name}</h2>
        <p class="status">
          <span class="status-icon ${character.status.toLowerCase()}"></span>
          ${character.status} - ${character.species}
        </p>
        <div class="location">
          <p>
            <span>Last known location:</span>
            ${character.location.name}
          </p>
        </div>
      </div>
    </article>
  `;
}

export async function initHomePage() {
  try {
    showLoader();
    const characters = await getCharacters();
    renderCharacters(characters);
  } catch (error) {
    console.error("Error loading characters:", error);
    document.getElementById("characters").innerHTML =
      '<p class="error">Error loading characters. Please try again later.</p>';
  } finally {
    hideLoader();
  }
}

initHomePage();
