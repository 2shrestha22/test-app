import { TodoDao } from "@/core/data/database/dao/todo-dao";
import { Todo } from "@/core/data/database/entity/todo";
import { TodoParams } from "@/features/todo/data/type";

export class TodoRepo {
  static async getTodos(): Promise<TodoParams[]> {
    return TodoDao.getAll().map((todo) => ({
      id: todo.id.toString(),
      title: todo.title,
      completed: todo.completed,
    }));
  }

  static async updateTodo(todo: TodoParams): Promise<TodoParams> {
    await fakeRandomApiDelay();
    const updatedTodo = TodoDao.update(todo.id!, {
      title: todo.title,
      completed: todo.completed,
    });

    if (!updatedTodo) {
      throw new Error("Todo not found in database");
    }

    return todo;
  }

  static async createTodo(title: string): Promise<Todo> {
    await fakeRandomApiDelay();
    const newTodo: Todo = TodoDao.add({
      title: title,
      completed: false,
    });

    return newTodo;
  }

  static async deleteTodo(id: string): Promise<void> {
    await fakeRandomApiDelay();
    TodoDao.delete(id);
  }
}

// fake random API delay
function fakeRandomApiDelay() {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
}
