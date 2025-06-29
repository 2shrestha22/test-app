import { TodoDao } from "@/core/data/database/dao/todo-dao";
import { Todo } from "@/core/data/database/entity/todo";
import { TodoParams } from "@/features/todo/data/types";

export class TodoRepo {
  static async getTodos(): Promise<TodoParams[]> {
    return TodoDao.getAll().map((todo) => ({
      id: todo.id.toString(),
      title: todo.title,
      completed: todo.completed,
      deleted: todo.deleted,
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

  static async createTodo(title: string): Promise<TodoParams> {
    await fakeRandomApiDelay();
    const newTodo: Todo = TodoDao.add({
      title: title,
      completed: false,
      deleted: false,
    });

    return {
      id: newTodo.id.toString(),
      title: newTodo.title,
      completed: newTodo.completed,
      deleted: newTodo.deleted,
    };
  }

  static async softDelete(id: string): Promise<void> {
    await fakeRandomApiDelay();
    TodoDao.softDelete(id);
  }

  static async delete(id: string): Promise<void> {
    await fakeRandomApiDelay();
    TodoDao.delete(id);
  }
}

// fake random API delay
function fakeRandomApiDelay() {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 500));
}
