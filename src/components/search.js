import { LitElement, html, css } from 'lit';

import { debounce } from '@/utils';

import '@/components/cards/character-card.js';
import '@/components/no-results.js';

export class SearchComponent extends LitElement {
  static properties = {
    characters: { state: true },
    loading: { state: true },
    searchTerm: { state: true },
    error: { state: true },
    hasSearched: { state: true },
  };

  constructor() {
    super();
    this.characters = [];
    this.loading = false;
    this.searchTerm = '';
    this.error = null;
    this.hasSearched = false;
    this.debouncedSearch = debounce(this.searchCharacters.bind(this), 2500);
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      max-width: var(--size-content-3);
      margin: 0 auto;

      .search-container {
        display: flex;

        input {
          display: block;
          width: 100%;
          font-family: var(--body-font-family);
          padding: var(--size-5) var(--size-7);
          border: 1px solid var(--border);
          border-radius: var(--radius-round);
          font-size: var(--font-size-3);
          background: var(--input);
          color: var(--input-content);
          transition: background-color 0.2s var(--ease-3);

          &::placeholder {
            color: var(--input-content);
            font-size: var(--font-size-3);
          }

          &:focus,
          &:active {
            outline: 2px solid var(--focus);
            background-color: var(--hover);
          }

          &:hover {
            background-color: var(--hover);
          }
        }
      }
    }

    .characters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--size-3);
    }

    .initial-state {
      text-align: center;
      padding: var(--size-7);
    }
  `;

  async searchCharacters() {
    if (!this.searchTerm.trim()) {
      this.characters = [];
      this.error = null;
      this.hasSearched = false;
      this.loading = false;
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_AI}/character/?name=${encodeURIComponent(
          this.searchTerm.trim(),
        )}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch characters');
      }

      this.characters = data.results || [];
      this.error = null;
    } catch (error) {
      console.error('Error fetching characters:', error);
      this.error = error.message;
      this.characters = [];
    } finally {
      this.loading = false;
    }
  }

  handleInput(e) {
    this.searchTerm = e.target.value;
    if (!this.searchTerm.trim()) {
      this.characters = [];
      this.error = null;
      this.hasSearched = false;
      this.loading = false;
      return;
    }

    // Show loading state immediately
    this.loading = true;
    this.hasSearched = true;
    this.error = null;

    // Debounce the actual search
    this.debouncedSearch();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.debouncedSearch.cancel();
  }

  renderContent() {
    if (this.loading) {
      return html`
        <div class="characters-grid">
          ${Array(6)
            .fill(0)
            .map(
              () => html`<character-card .loading=${true}></character-card>`,
            )}
        </div>
      `;
    }

    if (this.error) {
      // return html`<error-message message=${this.error}></error-message>`;
      return html`<no-results></no-results>`;
    }

    if (!this.hasSearched) {
      return html`
        <div class="initial-state">
          <p>Start typing to search for Rick and Morty characters</p>
        </div>
      `;
    }

    if (this.characters.length === 0) {
      return html`<no-results></no-results>`;
    }

    return html`
      <div class="characters-grid">
        ${this.characters.map(
          (character) => html`
            <character-card .character=${character}></character-card>
          `,
        )}
      </div>
    `;
  }

  render() {
    return html`
      <div class="search-container">
        <input
          type="text"
          placeholder="Buscar..."
          .value=${this.searchTerm}
          @input=${this.handleInput}
        />
      </div>

      ${this.renderContent()}
    `;
  }
}

customElements.define('search-component', SearchComponent);
