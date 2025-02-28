import { LitElement, html, css } from "lit";
import { typography } from "@/assets/css/base/typography.js";

class BannerComponent extends LitElement {
  static styles = [
    typography,
    css`
      :host { 
        width: 100%;
        
        section {
          display: grid;
          gap: 0.6rem;
          justify-content: center;
          align-items: center;
          
          > * {
            text-align: center;
            margin: 0;
          }
          
          h1 {
            margin: 0;
          }
          
          p {
            font-size: var(--font-size-2);
          }
          
          .created-by {
            a {
              color: inherit;
              text-decoration: underline;
            }
          }
          
        }
      }`
  ];

  render() {
    return html`
      <section>
        <h1 class="heading-01">Awesome Javascript UI</h1>
        <p>A curated list of awesome things related to javascript vanilla</p>
        <p class="created-by">Created by: 
          <a href="https://joelocano.stellarway.net/" target="_blank" aria-label="Joel Ocaño" rel="noopener noreferrer">
            Joel Ocaño
          </a>
        </p>
      </section>
    `;
  }
}

customElements.define("banner-component", BannerComponent);
