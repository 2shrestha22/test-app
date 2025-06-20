import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

import { TodoParams } from "@/features/todo/data/type";
import { Text, TouchableOpacity, View } from "react-native";

export default function TodoItem({
  item,
  onTap,
  onDelete,
}: {
  item: TodoParams;
  onTap?: () => void;
  onDelete?: () => void;
}) {
  return (
    <View className="flex-row items-center justify-between mt-4 bg-white p-4 rounded-lg shadow-sm">
      <TouchableOpacity
        className="flex-1 flex-row items-center"
        onPress={onTap}
      >
        <Ionicons
          name={item.completed ? "checkbox" : "square-outline"}
          size={24}
          className="text-green-500 mr-3"
        />
        <Text
          className={`text-base font-bold flex-1 ${
            item.completed ? "text-gray-500 line-through" : "text-black"
          }`}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} className="ml-2">
        <Ionicons name="trash" size={24} className="text-red-500" />
      </TouchableOpacity>
    </View>
  );
}
