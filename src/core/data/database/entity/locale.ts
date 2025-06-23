import { Realm } from "@realm/react";

export class Locale extends Realm.Object<Locale> {
  locale!: string;

  static schema: Realm.ObjectSchema = {
    name: "Locale",
    properties: {
      locale: "string",
    },
  };
}
