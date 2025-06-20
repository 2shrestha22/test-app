import { Realm } from "@realm/react";
import { BSON } from "realm";

export class Todo extends Realm.Object<Todo> {
  id!: BSON.ObjectId;
  title!: string;
  completed!: boolean;

  static schema: Realm.ObjectSchema = {
    name: "Todo",
    primaryKey: "id",
    properties: {
      id: "objectId",
      title: "string",
      completed: "bool",
    },
  };
}
