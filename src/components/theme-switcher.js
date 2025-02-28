import { LitElement, html, css } from 'lit';

class ThemeSwitcher extends LitElement {
  static properties = {
    theme: { type: String },
  };

  static styles = css`
    select {
      padding: 8px;
      border-radius: var(--radius-2);
      border: 1px solid #ccc;
      font-size: 16px;
    }
  `;

  constructor() {
    super();
    this.theme = this.getPreferredTheme();
  }

  render() {
    return html`
      <select @change="${this.handleThemeChange}">
        <option value="auto" ?selected="${this.theme === 'auto'}">Auto</option>
        <option value="light" ?selected="${this.theme === 'light'}">Light</option>
        <option value="dark" ?selected="${this.theme === 'dark'}">Dark</option>
      </select>
    `;
  }

  handleThemeChange(e) {
    const target = e.target;
    this.theme = target.value;
    this.setTheme(this.theme);
  }

  setTheme(theme) {
    const doc = document.firstElementChild;
    if (doc) {
      doc.setAttribute('color-scheme', theme);
    }
    localStorage.setItem('theme', theme); // Guarda el tema en localStorage
  }

  connectedCallback() {
    super.connectedCallback();
    this.setTheme(this.theme);
  }

  getPreferredTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'auto' || !storedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return storedTheme;
  }
}

customElements.define('theme-switcher', ThemeSwitcher);
