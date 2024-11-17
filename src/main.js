// import { hideLoader, showLoader } from "./components/loader";
// import { getCharacters } from "./services/characterService";

// export function renderCharacters(characters) {
//   const charactersContainer = document.getElementById("characters");
//   charactersContainer.innerHTML = characters
//     .map((character) => createCharacterCard(character))
//     .join("");
// }

// function createCharacterCard(character) {
//   return `
//     <article class="card cell">
//       <div class="card-image">
//         <figure class="image is-4by3">
//            <img src="${character.image}" alt="${character.name}" loading="lazy">
//         </figure>
//       </div>
//       <div class="card-content">
//         <h2>${character.name}</h2>
//         <p class="status">
//           <span class="status-icon ${character.status.toLowerCase()}"></span>
//           ${character.status} - ${character.species}
//         </p>
//         <div class="location">
//           <p>
//             <span>Last known location:</span>
//             ${character.location.name}
//           </p>
//         </div>
//       </div>
//     </article>
//   `;
// }

// export async function initHomePage() {
//   try {
//     showLoader();
//     const characters = await getCharacters();
//     renderCharacters(characters);
//   } catch (error) {
//     console.error("Error loading characters:", error);
//     document.getElementById("characters").innerHTML =
//       '<p class="error">Error loading characters. Please try again later.</p>';
//   } finally {
//     hideLoader();
//   }
// }

// initHomePage();

// import { LitElement, html, css, unsafeCSS } from "lit";

// import rootStyles from "./assets/scss/styles.scss?inline";

// export class DefaultRoot extends LitElement {
//   static styles = [
//     css`
//       ${unsafeCSS(rootStyles)}
//     `,
//   ];

//   render() {
//     return html` <div class="root">
//       <button class="button is-primary">Button</button>
//       <button class="button is-primary">Button</button>
//     </div>`;
//   }
// }
// customElements.define("default-root", DefaultRoot);

import { render } from "lit-html";

import "./assets/scss/styles.scss";

import { characterGridTemplate } from "./components/character";

const characterList = document.querySelector("[data-character-list]");

render(characterGridTemplate, characterList);
