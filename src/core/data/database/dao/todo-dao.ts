import { Todo } from "@/core/data/database/entity/todo";
import { TodoParams } from "@/features/todo/data/types";
import { Realm } from "@realm/react";
import { BSON } from "realm";
import { database } from "../database";

export class TodoDao {
  static getAll(): Realm.Results<Todo> {
    return database.objects(Todo);
  }

  static add(todo: TodoParams): Todo {
    return database.write(() => {
      return database.create(Todo, {
        id: new BSON.ObjectId(),
        title: todo.title,
        completed: todo.completed,
      });
    });
  }

  static addAll(todos: TodoParams[]): void {
    database.write(() => {
      todos.forEach((todo) => {
        database.create(Todo, {
          id: new BSON.ObjectId(),
          title: todo.title,
          completed: todo.completed,
        });
      });
    });
  }

  static update(
    id: string,
    updates: Partial<Pick<TodoParams, "title" | "completed">>
  ): Todo | null {
    return database.write(() => {
      const objectId = BSON.ObjectId.createFromHexString(id);
      const existingTodo = database.objectForPrimaryKey(Todo, objectId);

      if (!existingTodo) {
        return null;
      }

      if (updates.title !== undefined) {
        existingTodo.title = updates.title;
      }
      if (updates.completed !== undefined) {
        existingTodo.completed = updates.completed;
      }

      return existingTodo;
    });
  }

  static softDelete(id: string): void {
    database.write(() => {
      const objectId = BSON.ObjectId.createFromHexString(id);
      const existingTodo = database.objectForPrimaryKey(Todo, objectId);
      if (!existingTodo) {
        return;
      }
      existingTodo.deleted = true;
    });
  }

  static delete(id: string): void {
    database.write(() => {
      const objectId = BSON.ObjectId.createFromHexString(id);
      const existingTodo = database.objectForPrimaryKey(Todo, objectId);
      database.delete(existingTodo);
    });
  }
}
