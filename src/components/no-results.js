import { LitElement, html, css } from "lit";

export class NoResults extends LitElement {
  static styles = css`
    :host {
      display: block;
      text-align: center;
      padding: 2rem;
    }
    .container {
      background-color: var(--card-background, #2d2d2d);
      border-radius: 8px;
      padding: 2rem;
    }
    .icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    h2 {
      margin: 0;
      color: var(--primary-color, #11b0c8);
    }
    p {
      margin: 1rem 0 0;
      color: #888;
    }
  `;

  render() {
    return html`
      <div class="container">
        <div class="icon">🔍</div>
        <h2>No Results Found</h2>
        <p>
          No characters match your search criteria. Try a different search term.
        </p>
      </div>
    `;
  }
}

customElements.define("no-results", NoResults);
