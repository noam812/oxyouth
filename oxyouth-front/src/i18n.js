import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import navbarAr from "./locales/ar/navbar.json";
import navbarHe from "./locales/he/navbar.json";
import aboutHe from "./locales/he/about.json";
import aboutAr from "./locales/ar/about.json";
import sProductHe from "./locales/he/singleproduct.json";
import sProductAr from "./locales/ar/singleproduct.json";
import contactHe from "./locales/he/contact.json";
import contactAr from "./locales/ar/contact.json";
import productSectionHe from "./locales/he/productssection.json";
import productSectionAr from "./locales/ar/productssection.json";
import articlesHe from "./locales/he/articles.json";
import articlesAr from "./locales/ar/articles.json";
import footerHe from "./locales/he/footer.json";
import footerAr from "./locales/ar/footer.json";

/**
 * @imports Are the translation files from locales folder.
 * @const resources - Object for 18n initialization. containes all translation files with keyname. 
 * 
 */

const resources = {
  he: {
    translation: navbarHe,
    about: aboutHe,
    singleProduct: sProductHe,
    contact: contactHe,
    productsection: productSectionHe,
    articles: articlesHe,
    footer: footerHe,
  },
  ar: {
    translation: navbarAr,
    about: aboutAr,
    singleProduct: sProductAr,
    contact: contactAr,
    productsection: productSectionAr,
    articles: articlesAr,
    footer: footerAr,
  },
};

// 18n initialization - additional plugins can be added.  

i18n.use(initReactI18next).init({
  resources,
  lng: "he",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
