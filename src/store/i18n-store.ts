import { database } from "@/core/data/database/database";
import { create } from "zustand";

interface I18nStore {
  locale: string;
  getLocale: () => string;
  setLocale: (locale: string) => void;
  initializeLocale: () => void;
}

export const useI18nStore = create<I18nStore>((set, get) => ({
  locale: "en",
  getLocale: () => {
    return get().locale;
  },

  setLocale: (locale: string) => {
    database.write(() => {
      const localeObjects = database.objects("Locale");
      if (localeObjects.length > 0) {
        localeObjects[0].locale = locale;
      } else {
        database.create("Locale", { locale });
      }
    });
    set({ locale });
  },

  initializeLocale: () => {
    const storedLocale = database.objects("Locale")[0] as unknown as
      | { locale: string }
      | undefined;
    if (storedLocale) {
      set({ locale: storedLocale.locale });
    }
  },
}));
