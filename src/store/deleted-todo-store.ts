import { TodoRepo } from "@/features/todo/data/todo-repo";
import { TodoParams } from "@/features/todo/data/types";
import { create } from "zustand";

interface DeletedTodoStore {
  todos: TodoParams[];
  isLoading: boolean;
  error: string | null;
  getTodos: () => void;
  deleteTodo: (id: string) => void;
}
// make it reactive to the database

export const useDeletedTodoStore = create<DeletedTodoStore>((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,
  getTodos: async () => {
    set({ isLoading: true });
    const todos = await TodoRepo.getTodos();
    set({ todos, isLoading: false });
  },

  deleteTodo: async (id: string) => {
    const previousTodos = get().todos;

    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
      error: null,
    }));

    try {
      await TodoRepo.delete(id);
    } catch (error) {
      set((state) => ({
        todos: previousTodos,
        error: null,
      }));
      console.log(error);
    }
  },
}));
