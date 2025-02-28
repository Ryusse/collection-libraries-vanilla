import { LitElement, html, css } from "lit";
import { typography } from "@/assets/css/base/typography.js";
import { libraryItems } from "@/data/libraries.js";
import "@/components/library-card.js"

class LibraryListComponent extends LitElement {
  static styles = [
    typography,
    css`
      :host { 
        width: 100%;
        
        section {
          margin-top: 4rem;
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
          justify-content: center;
          align-items: center;
        }
      }`
  ];

  render() {
    return html`
      <section>
        ${libraryItems.map(
          (item) => html`
            <library-card-component
              href="${item.href}"
              title="${item.title}"
              description="${item.description}"
              .createdBy="${item.createdBy}"
              imageUrl="${item.imageUrl}"
            ></library-card-component>
          `
        )}
      </section>
    `;
  }
}

customElements.define("library-list-component", LibraryListComponent);
