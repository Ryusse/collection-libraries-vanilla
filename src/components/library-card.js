import { LitElement, html, css } from "lit";
import { typography } from "@/assets/css/base/typography.js";
import { button } from "@/assets/css/base/button.js";

class LibraryCardComponent extends LitElement {
  static properties = {
    href: { type: String },
    title: { type: String },
    description: { type: String },
    createdBy: { type: Object },
    imageUrl: { type: String },
  };

  static styles = [
    typography,
    button,
    css`
      :host {
        width: 100%;
        height: 100%;
        display: flex;
        
        .library-card {
          max-width: 100%;
          backdrop-filter: blur(32px);
          padding: 2rem;
          background-color: hsla(var(--card), 0.5);
          border-radius: var(--radius-3);
          border: 1px solid var(--border);
          display: flex;
          gap: 1rem;
          flex-direction: column;
          width: 100%;
          
          figure {
            margin: 0;
            width: 4rem;
            height: 4rem;
            
            img {
              margin: 0;
              width: 100%;
              height: 100%;
            }
          }

          h2 {
            margin: 0;
            color: var(--card-foground);
          }

          p {
            margin: 0;
            font-size: var(--font-size-2);
          }
        }
      }

    `,
  ];

  constructor() {
    super();
    this.href = "";
    this.title = "";
    this.description = "";
    this.createdBy = {};
    this.imageUrl = "";
  }

  render() {
    return html`
      <div class="library-card">
        <h2>${this.title}</h2>
        ${this.imageUrl
          ? html`
              <figure>
                <img src="${this.imageUrl}" alt="${this.title} logo" />
              </figure>
            `
          : html``}
        <p>${this.description}</p>
        <p class="created-by">
          Created by: <a href="${this.createdBy.url}" target="_blank">${this.createdBy.name}</a>
        </p>
        <a class="button button--outline" href="${this.href}" target="_blank">View library</a>
      </div>
    `;
  }
}

customElements.define("library-card-component", LibraryCardComponent);
