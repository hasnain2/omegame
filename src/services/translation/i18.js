import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: require('../../../assets/langs/en.json'),
    it: require('../../../assets/langs/it.json'),
  },
});
export default i18n;
