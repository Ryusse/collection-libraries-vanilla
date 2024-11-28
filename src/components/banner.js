import { LitElement, html, css } from "lit";

class BannerComponent extends LitElement {
  static styles = css`
    .banner {
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        text-align: center;
        font-size: var(--font-size-fluid-2);
        color: var(--primary-color, #11b0c8);
      }
    }
  `;

  render() {
    return html`
      <section class="banner">
        <h1 class="title">Rick and Morty Character Search</h1>
        <slot></slot>
      </section>
    `;
  }
}

customElements.define("banner-component", BannerComponent);
