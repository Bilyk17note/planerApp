import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en.json';
import ua from './ua.json';

const resources: any = {
  en,
  ua,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: ['en', 'ua'],
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
