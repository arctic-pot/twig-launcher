import './index.css';
import './material-symbols.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './ui/App';
import i18next from 'i18next';
import * as lang from 'assets/lang';
import { initReactI18next } from 'react-i18next';

console.log(lang);

i18next
  .use(initReactI18next)
  .init({
    lng: (localStorage.lang ?? 'SYSTEM') !== 'SYSTEM' ? localStorage.lang : navigator.language,
    fallbackLng: 'en-US',
    resources: {
      'en-US': { translation: lang.en_US },
      'zh-CN': { translation: lang.zh_CN },
    },
  })
  .then(() => {
    const rootElement = document.getElementById('root');
    const root = createRoot(rootElement);
    root.render(React.createElement(App));
  });
