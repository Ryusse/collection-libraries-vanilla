import { css } from "lit";

export const button = css`
  .button {
    padding: 0.5rem 1rem;
    border-radius: var(--radius-3);
    text-decoration: none;
    text-align: center;
    display: grid;
    align-items: center;
    justify-content: center;
  }

  .button--outline {
    border: 1px solid var(--border);
    color: var(--heading-content);
    background-color: transparent;

    &:where(:hover, :focus-within) {
      background-color: hsl(var(--hover));
    }
  }
`;
