import { LitElement, html, css } from "lit";
import { button } from "@/assets/css/base/button.js";

/*
Este componente guarda en el local storage las bibliotecas al darle click. Se implementó una feature para manejar dos idiomas desde
TinaCMS. Al guardarse cada biblioteca en el local storage se guarda el "id" de TinaCMS que es: "src/content/libraries/es/Micromodaljs.md", notar
que este "id" es una ruta y da problemas ya que se estan creando dos archivos de una biblioteca por cada idioma y ocasiona que el usuario necesite guardarlo
dos veces al cambiar de idioma. Se recomienda crear un nuevo campo en el schema "Libarary" que contenga un id único compartido para ambos documentos generados.
*/

class BookmarkComponent extends LitElement {
  static properties = {
    id: { type: String },
    active: { type: Boolean },
  };

  static styles = [
    button,
    css`
      :host {
        .button.active {
          border-color: var(--warning);
        }

        button.active svg {
          stroke: var(--warning);
        }
      }
    `,
  ];

  constructor() {
    super();
    this.id = "";
    this.active = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.active = this.isBookmarked();
  }

  isBookmarked() {
    if (!this.id) {
      return false;
    }
    const bookmarks = this.loadBookmarks();
    return bookmarks.includes(this.id);
  }

  loadBookmarks() {
    const savedBookmarks = localStorage.getItem(
      "awesome-javascript-ui-bookmarks",
    );
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  }

  saveBookmarks(bookmarks) {
    localStorage.setItem(
      "awesome-javascript-ui-bookmarks",
      JSON.stringify(bookmarks),
    );
  }

  handleClick() {
    if (!this.id) {
      return;
    }
    const bookmarks = this.loadBookmarks();

    if (bookmarks.includes(this.id)) {
      this.active = false;
      this.saveBookmarks(bookmarks.filter((bm) => bm !== this.id));
    } else {
      this.active = true;
      this.saveBookmarks([...bookmarks, this.id]);
    }
    this.requestUpdate();
  }

  render() {
    return html`
      <abbr title="Save library">
        <button
          aria-label="Save library"
          class="button button--outline ${this.active ? "active" : ""}"
          @click="${this.handleClick}"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
        </button>
      </abbr>
    `;
  }
}

customElements.define("bookmark-component", BookmarkComponent);
