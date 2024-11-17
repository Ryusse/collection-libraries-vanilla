import { LitElement, html, css } from "lit";

export class SkeletonLoader extends LitElement {
  static properties = {
    count: { type: Number },
    columns: { type: Number },
  };

  static styles = css`
    .skeleton {
      display: flex;
      flex-direction: column;
    }
  `;

  constructor() {
    super();
    this.count = 8;
    this.columns = 4;
  }

  render() {
    return html`
      <div class="grid is-col-min-8 is-gap-4">
        ${Array(this.count)
          .fill(null)
          .map(
            () => html`
              <div class="skeleton">
                <figure class="image is-skeleton">
                  <img
                    alt="Placeholder"
                    src="https://placehold.co/128x128"
                    style="visibility: hidden;"
                  />
                </figure>
                <div class="skeleton-lines">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            `
          )}
      </div>
    `;
  }
}

customElements.define("skeleton-loader", SkeletonLoader);
