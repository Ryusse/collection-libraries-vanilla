import { LitElement, html, css } from "lit";
import { typography } from "@/assets/css/base/typography.js";
import "@/components/library-card.js";
import client from "@root/tina/__generated__/client";

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
          grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
          justify-content: center;
          align-items: center;
        }

        .skeleton-card {
          min-height: 250px;
          background-color: var(--border);
          border-radius: var(--radius-3);
          width: 100%;
          animation: skeleton-loading 1.5s infinite alternate;
        }

        @keyframes skeleton-loading {
          from {
            opacity: 0.6;
          }
          to {
            opacity: 1;
          }
        }
      }
    `,
  ];

  static properties = {
    libraries: { type: Array },
    loading: { type: Boolean },
  };

  constructor() {
    super();
    this.libraries = [];
    this.errorMessage = "";
    this.loading = true; // Inicializa loading como true
  }

  async firstUpdated() {
    await this.fetchData();
  }

  async fetchData() {
    try {
      const librariesResponse = await client.queries.librariesConnection();
      this.libraries = librariesResponse.data.librariesConnection.edges.map(
        (library) => {
          return {
            id: library.node.id,
            slug: library.node._sys.filename,
            title: library.node.title,
            siteUrl: library.node.siteUrl,
            shortDescription: library.node.shortDescription,
            authorName: library.node.authorName,
            authorUrl: library.node.authorUrl,
          };
        },
      );

      console.log("libraries: ", this.libraries);
      this.loading = false; // Cambia loading a false cuando los datos se cargan
    } catch (error) {
      console.error("Error fetching data:", error);
      this.errorMessage =
        "Error al cargar las bibliotecas. Por favor, inténtalo de nuevo más tarde.";
      this.loading = false; // Cambia loading a false en caso de error
    }
  }

  render() {
    return html`
      ${this.errorMessage
        ? html`<div class="error-message">${this.errorMessage}</div>`
        : html`
            <section>
              ${this.loading
                ? html`
                    ${Array(6)
                      .fill(null)
                      .map(() => html`<div class="skeleton-card"></div>`)}
                  `
                : this.libraries.map(
                    (library) => html`
                      <library-card-component
                        id="${library.id}"
                        slug="${library.slug}"
                        title="${library.title}"
                        siteUrl="${library.siteUrl}"
                        shortDescription="${library.shortDescription}"
                        authorName="${library.authorName}"
                        authorUrl="${library.authorUrl}"
                      ></library-card-component>
                    `,
                  )}
            </section>
          `}
    `;
  }
}

customElements.define("library-list-component", LibraryListComponent);
