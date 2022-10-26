import { createApp } from 'vue';
import 'element-plus/dist/index.css';

import App from './view/App.vue';

export default async function run(doc: Document) {
  const app = document.createElement('div');
  doc.body.appendChild(app);
  setTimeout(() => {
    createApp(App).mount(app);
  });
}
