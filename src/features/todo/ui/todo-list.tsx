import TodoItem from "@/features/todo/ui/components/todo-item";
import { useDeleteTodo, useTodos, useUpdateTodo } from "@/features/todo/ui/hooks/use-todo";
import { ActivityIndicator, FlatList, SafeAreaView, Text } from "react-native";

export default function TodoList() {
  const { isLoading, isError, error, isSuccess, data } = useTodos();
  const { deleteTodo } = useDeleteTodo();
  const { updateTodo } = useUpdateTodo();

  return (
    <SafeAreaView className="flex-1">
      {isLoading && <ActivityIndicator className="flex-1" />}
      {isError && (
        <Text className="text-red-500 p-4 text-center">{error?.message}</Text>
      )}
      {!isLoading && isSuccess && data && (
        <FlatList
          className="p-4 pt-0"
          data={data}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              onTap={() => {
                updateTodo({ ...item, completed: !item.completed });
              }}
              onDelete={() => {
                deleteTodo(item.id);
              }}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
