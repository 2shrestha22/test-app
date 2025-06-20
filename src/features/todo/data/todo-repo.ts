import { Todo } from "@/features/todo/data/type";

export class TodoRepo {
  static todos: Todo[] = [
    {
      id: Date.now().toString(),
      title: "Todo 1",
      completed: false,
    },
  ];

  static async getTodos(): Promise<Todo[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.todos;
  }

  static async updateTodo(todo: Todo): Promise<Todo> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.todos = this.todos.map((t) => (t.id === todo.id ? todo : t));
    return todo;
  }

  static async createTodo(title: string): Promise<Todo> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.todos.push({
      id: Date.now().toString(),
      title,
      completed: false,
    });
    return this.todos[this.todos.length - 1];
  }

  static async deleteTodo(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
