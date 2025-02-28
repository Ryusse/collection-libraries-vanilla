import { LitElement, html, css } from "lit";

export class HeaderComponent extends LitElement {
  static styles = css`
    :host {
     header {
       display: flex;
       align-items: center;
       padding-inline: 1rem;
       padding-block: 0.5rem;
       height: 2.5rem;
     }
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <slot name="theme-switcher"></slot>
      </header>
    `;
  }
}

customElements.define("header-component", HeaderComponent);
