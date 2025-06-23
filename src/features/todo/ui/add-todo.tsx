import TextField from "@/core/components/text-field";
import { router } from "expo-router";
import React from "react";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCreateTodo } from "./hooks/use-todo";

export default function AddTodoScreen() {
  const { t } = useTranslation();
  const { control, onCreateTodo, isLoading } = useCreateTodo();
  const { field, fieldState } = useController({
    control,
    name: "title",
  });

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-4 border-b border-gray-300">
        <TouchableOpacity onPress={handleCancel}>
          <Text className="text-base text-blue-500">{t("todo.cancel")}</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold">{t("todo.addTodo")}</Text>

        <TouchableOpacity
          onPress={onCreateTodo}
          className={`px-4 py-2 rounded-lg ${
            isLoading ? "bg-gray-400" : "bg-blue-500"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white text-base font-semibold">
              {t("todo.save")}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View className="p-4">
        <Text className="text-base font-medium mb-2 text-gray-800">
          {t("todo.todoTitle")}
        </Text>
        <TextField
          className="border border-gray-300 rounded-lg p-3 text-base min-h-[100px]"
          placeholder={t("todo.enterTodoTitle")}
          autoFocus
          multiline
          error={fieldState.error?.message}
          onChangeText={field.onChange}
          style={{ textAlignVertical: "top" }}
          {...field}
        />
      </View>
    </SafeAreaView>
  );
}
