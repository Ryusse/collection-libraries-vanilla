import "./assets/scss/main.css";

import { LitElement, html, css } from "lit";
import "@/components/search";

class App extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      padding: 2rem;

      .title {
        text-align: center;
        font-size: var(--font-size-fluid-2);
        color: var(--primary-color, #11b0c8);
      }
    }
  `;

  render() {
    return html`
      <h1 class="title">Rick and Morty Character Search</h1>
      <search-component></search-component>
    `;
  }
}

customElements.define("app-root", App);
document.querySelector("#app").innerHTML = "<app-root></app-root>";
