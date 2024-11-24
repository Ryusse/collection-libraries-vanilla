import { LitElement, html, css } from "lit";

export class CharacterCard extends LitElement {
  static properties = {
    character: { type: Object },
    loading: { type: Boolean },
  };

  constructor() {
    super();
    this.character = null;
    this.loading = false;
  }

  static styles = css`
    :host {
      display: block;
    }
    .card {
      background-color: var(--card-background, #2d2d2d);
      border-radius: 8px;
      padding: 1rem;
      margin: 1rem;
      display: flex;
      gap: 1rem;
      transition: transform 0.3s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .card img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
    }
    .info {
      flex: 1;
    }
    .skeleton {
      background: linear-gradient(90deg, #2d2d2d 25%, #3d3d3d 50%, #2d2d2d 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite linear;
    }
    .skeleton-img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .skeleton-text {
      height: 20px;
      margin: 8px 0;
      border-radius: 4px;
    }
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
  `;

  render() {
    if (this.loading) {
      return html`
        <div class="card">
          <div class="skeleton skeleton-img"></div>
          <div class="info">
            <div class="skeleton skeleton-text" style="width: 60%"></div>
            <div class="skeleton skeleton-text" style="width: 40%"></div>
            <div class="skeleton skeleton-text" style="width: 80%"></div>
          </div>
        </div>
      `;
    }

    return html`
      <div class="card">
        <img src="${this.character.image}" alt="${this.character.name}" />
        <div class="info">
          <h3>${this.character.name}</h3>
          <p>Status: ${this.character.status}</p>
          <p>Species: ${this.character.species}</p>
        </div>
      </div>
    `;
  }
}

customElements.define("character-card", CharacterCard);
