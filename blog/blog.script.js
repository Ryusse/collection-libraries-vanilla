import './blog.styles.css';

import dummy from './content.md';

document.querySelector('[data-content]').innerHTML = dummy;

if (import.meta.hot) {
  import.meta.hot.on('markdown-update', (data) => {
    document.querySelector('[data-content]').innerHTML = data;
  });
}
