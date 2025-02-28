import { css } from "lit";

export const button = css`
  .button {
    padding: 0.5rem 1rem;
    border-radius: var(--radius-3);
    text-decoration: none;
    text-align: center;
    display: flex;
    justify-content: center;
  }
  
  .button--outline {
    border: 1px solid var(--border);  
    color: var(--heading-content);
    background-color: transparent;
    transition: all 0.2s var(--ease-elastic-in-1);  
    
    &:where(:hover, :focus) {
      background-color: hsl(var(--hover));
    }
  }
`;
