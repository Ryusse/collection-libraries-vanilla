import { apiService } from "@/services";
import { html } from "lit-html";

const characterTemplate = (character) => html`
  <article class="card cell">
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="${character.image}" alt="${character.name}" loading="lazy" />
      </figure>
    </div>
    <div class="card-content">
      <h2 class="title is-4">${character.name}</h2>
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
export const characterGridTemplate = (characters) => html`
  <div class="grid is-col-min-8 is-gap-4">
    ${characters.map((character) => characterTemplate(character))}
  </div>
`;
