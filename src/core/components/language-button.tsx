import i18n from "@/i18n/i18n";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";

export const LanguageToggleButton = () => (
  <TouchableOpacity
    className="ml-4"
    onPress={() => {
      i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
    }}
  >
    <Ionicons size={24} name="language" color="#007AFF" />
  </TouchableOpacity>
);
