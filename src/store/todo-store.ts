import { TodoRepo } from "@/features/todo/data/todo-repo";
import { Todo } from "@/features/todo/data/type";
import { create } from "zustand";

interface TodoStore {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  getTodos: () => void;
  updateTodo: (todo: Todo) => void;
  addTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: false,
  error: null,
  getTodos: async () => {
    set({ loading: true });
    const todos = await TodoRepo.getTodos();
    set({ todos, loading: false });
  },
  updateTodo: async (todo: Todo) => {
    // Store current state before optimistic update
    const previousTodos = get().todos;

    // Optimistic update
    set((state) => ({
      todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
      error: null, // Clear any previous errors
    }));

    try {
      await TodoRepo.updateTodo(todo);
    } catch (error) {
      // Revert to previous state on failure
      set({
        todos: previousTodos,
        error: "Failed to update todo. Please try again.",
      });
    }
  },
  addTodo: async (title: string) => {
    try {
      const todo = await TodoRepo.createTodo(title);
      set((state) => ({
        todos: [...state.todos, todo],
        error: null,
      }));
    } catch (error) {
      set((state) => ({
        error: "Failed to add todo. Please try again.",
      }));
    }
  },
  deleteTodo: async (id: string) => {
    const previousTodos = get().todos;

    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
      error: null,
    }));

    try {
      await TodoRepo.deleteTodo(id);
    } catch (error) {
      set((state) => ({
        todos: previousTodos,
        error: null,
      }));
    }
  },
}));
