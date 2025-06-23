/* eslint-disable import/no-named-as-default-member */
import en from "@/translations/en.json";
import fr from "@/translations/fr.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

export async function initI18n() {
  await i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
