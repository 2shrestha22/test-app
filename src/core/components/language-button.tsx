import i18n from "@/i18n/i18n";
import { useI18nStore } from "@/store/i18n-store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

export const LanguageToggleButton = () => (
  <TouchableOpacity
    className="ml-4"
    onPress={() => {
      i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
      useI18nStore.getState().setLocale(i18n.language);
    }}
    testID="language-toggle-button"
  >
    <Ionicons size={24} name="language" color="#007AFF" />
  </TouchableOpacity>
);
