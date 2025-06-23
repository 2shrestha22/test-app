import { useTranslation } from "react-i18next";
import { Text } from "react-native";

export default function DeletedTodos() {
  const { t } = useTranslation();
  return <Text>{t("todo.deletedTodos")}</Text>;
}
