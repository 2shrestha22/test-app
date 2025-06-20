import TodoItem from "@/features/todo/ui/components/todo-item";
import {
  useDeleteTodo,
  useTodos,
  useUpdateTodo,
} from "@/features/todo/ui/hooks/use-todo";
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
      {!isLoading && isSuccess && data && data.length === 0 && (
        <Text className="text-center text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          No todos found
        </Text>
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
                deleteTodo(item.id!);
              }}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
