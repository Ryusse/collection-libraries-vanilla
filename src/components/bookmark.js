import { LitElement, html, css } from "lit";
import { button } from "@/assets/css/base/button.js";

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
    const savedBookmarks = localStorage.getItem("bookmarks");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  }

  saveBookmarks(bookmarks) {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
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
