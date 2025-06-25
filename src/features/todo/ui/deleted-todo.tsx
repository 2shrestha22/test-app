import TodoItem from "@/features/todo/ui/components/todo-item";
import { useDeleteTodo, useTodos } from "@/features/todo/ui/hooks/use-todo";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DeletedTodo() {
  const { t } = useTranslation();
  const { isLoading, isError, error, isSuccess, data: allTodos } = useTodos();
  const data = allTodos?.filter((todo) => todo.deleted);

  const { deleteTodo } = useDeleteTodo();

  return (
    <SafeAreaView className="flex-1">
      {isLoading && <ActivityIndicator className="flex-1" />}
      {isError && (
        <Text className="text-red-500 p-4 text-center">{error?.message}</Text>
      )}
      {!isLoading && isSuccess && data && data.length === 0 && (
        <Text className="text-center text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {t("todo.noTodosFound")}
        </Text>
      )}
      {!isLoading && isSuccess && data && (
        <FlatList
          className="p-4 pt-0"
          data={data}
          renderItem={({ item }) => (
            <TodoItem
              icon="close-circle"
              item={item}
              onDelete={() => {
                deleteTodo(item.id!);
              }}
              disabled={true}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
