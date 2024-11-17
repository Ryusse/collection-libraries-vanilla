import { LitElement, html, css, unsafeCSS } from "lit";

import customStyles from "./styles.scss?inline";

export class HomePage extends LitElement {
  static styles = [
    css`
      ${unsafeCSS(customStyles)}
    `,
  ];
  // static styles = unsafeCSS(styles);

  render() {
    return html`
      <div class="test">
        <h1>Home Pagea</h1>
        <div class="skeleton-block"></div>
        <button class="button is-primary">Buttonsasdad</button>
        <skeleton-loader count="4"></skeleton-loader>
      </div>
    `;
  }
}
customElements.define("home-page", HomePage);
