import { LitElement, html, css } from "lit";
import { typography } from "@/assets/css/base/typography.js";
import { button } from "@/assets/css/base/button.js";
import "./bookmark.js";

class LibraryCardComponent extends LitElement {
  static properties = {
    id: { type: String },
    slug: { type: String },
    title: { type: String },
    siteUrl: { type: String },
    shortDescription: { type: String },
    authorName: { type: String },
    authorUrl: { type: String },
  };

  static styles = [
    typography,
    button,
    css`
      :host {
        width: 100%;
        max-width: 100%;
        height: 100%;
        display: flex;

        .library-card {
          max-width: 100%;
          width: 100%;
          min-height: 250px;
          backdrop-filter: blur(32px);
          padding: 2rem;
          background-color: hsla(var(--card), 0.8);
          border-radius: var(--radius-3);
          border: 1px solid var(--border);
          display: flex;
          gap: 1rem;
          flex-direction: column;

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
            width: 100%;
            display: block;
            margin: 0;
            font-size: var(--font-size-2);
          }

          .bottom {
            margin-top: auto;
            width: 100%;
            display: flex;
            gap: 1rem;

            a {
              width: 100%;
            }
          }
        }
      }
    `,
  ];

  constructor() {
    super();
    this.id = "";
    this.slug = "";
    this.title = "";
    this.siteUrl = "";
    this.shortDescription = "";
    this.authorName = "";
    this.authorUrl = "";
    this.imageUrl = null;
  }

  handleBookmarkChange(event) {
    this.bookmarked = event.detail.active;
    const bookmarks = this.loadBookmarks();
    if (this.bookmarked) {
      this.saveBookmarks([...bookmarks, this.id]);
    } else {
      this.saveBookmarks(bookmarks.filter((bm) => bm !== this.id));
    }
  }

  loadBookmarks() {
    const savedBookmarks = localStorage.getItem("bookmarks");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  }

  saveBookmarks(bookmarks) {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  connectedCallback() {
    super.connectedCallback();
    this.bookmarked = this.loadBookmarks().includes(this.id);
  }

  render() {
    return html`
      <div class="library-card">
        ${this.title && html` <h2>${this.title}</h2>`}
        ${this.imageUrl
          ? html`
              <figure>
                <img src="${this.imageUrl}" alt="${this.title} logo" />
              </figure>
            `
          : html``}
        ${this.shortDescription && html`<p>${this.shortDescription}</p>`}
        ${this.authorName &&
        html` <p class="created-by">
          Created by:
          <a href="${this.authorUrl}" target="_blank">${this.authorName}</a>
        </p>`}
        <div class="bottom">
          <!--Save action-->
          <bookmark-component
            id="${this.id}"
            active="${this.bookmarked}"
            @active-changed="${this.handleBookmarkChange}"
          ></bookmark-component>

          ${this.siteUrl &&
          html` <a
            class="button button--outline"
            href="${this.siteUrl}"
            target="_blank"
            >View library
          </a>`}
        </div>
      </div>
    `;
  }
}

customElements.define("library-card-component", LibraryCardComponent);
