import { LitElement, html, css } from "lit";

import { links } from "./data";

export class HeaderComponent extends LitElement {
  static properties = {
    count: { type: Number },
    columns: { type: Number },
  };

  constructor() {
    super();
    this.count = 8;
    this.columns = 4;
  }

  render() {
    return html`
      <div class="grid is-col-min-8 is-gap-4">
        ${links.map(
          (link) => html` <a class="button is-primary">${link.title}</a> `
        )}
      </div>
    `;
  }
}

customElements.define("header-component", HeaderComponent);
