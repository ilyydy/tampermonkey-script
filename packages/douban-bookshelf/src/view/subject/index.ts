import { createApp } from 'vue';

import App from './App.vue';

export async function init(doc: Document) {
  const app = document.createElement('div');
  doc.body.appendChild(app);
  setTimeout(() => {
    createApp(App).mount(app);
  });
}
