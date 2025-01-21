import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from 'react-native-localize';


import en from './locales/en.json';
import ru from './locales/ru.json';


const getDeviceLanguage = () => {
  const locales = Localization.getLocales();
  return locales.length > 0 ? locales[0].languageTag : 'en'; 
};

i18n
  .use(initReactI18next)
  .init({
    lng: getDeviceLanguage(), 
    resources: {
      en, 
      ru, 
    },
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
