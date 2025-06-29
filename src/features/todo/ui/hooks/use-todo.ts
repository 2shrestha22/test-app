import { TodoRepo } from "@/features/todo/data/todo-repo";
import { TodoParams } from "@/features/todo/data/types";
import {
  TodoFormType,
  useCreateTodoSchema,
} from "@/features/todo/ui/schemas/todo-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

export function useCreateTodo() {
  const schema = useCreateTodoSchema();
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm<TodoFormType>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (title: string) => TodoRepo.createTodo(title),
    onSuccess() {
      reset();
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      router.back();
    },
  });

  const _onCreateTodo = async (data: TodoFormType) => {
    await mutation.mutateAsync(data.title);
  };

  const onCreateTodo = async () => {
    await handleSubmit(_onCreateTodo)();
  };

  return {
    onCreateTodo,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    control,
  };
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (todo: TodoParams) => TodoRepo.updateTodo(todo),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    updateTodo: mutation.mutate,
  };
}

export function useSoftDeleteTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => TodoRepo.softDelete(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    softDeleteTodo: mutation.mutate,
  };
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => TodoRepo.delete(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    deleteTodo: mutation.mutate,
  };
}

export function useTodos() {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: () => TodoRepo.getTodos(),
  });

  return {
    isLoading: query.isLoading,
    data: query.data,
    isSuccess: query.isSuccess,
    isError: query.isError,
    error: query.error,
  };
}
