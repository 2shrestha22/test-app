import Realm from "realm";
import { Todo } from "./entity/todo";

// We are exporting an object so that a reference is exported
// @ts-ignore
export let database: Realm = {};

export function initDatabase() {
  const schema = [Todo];
  database = new Realm({
    schema,
    schemaVersion: 1,
    deleteRealmIfMigrationNeeded: true,
  });
}
