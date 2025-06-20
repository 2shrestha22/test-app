import { createUseObject } from "@realm/react/src/useObject";
import { createUseQuery } from "@realm/react/src/useQuery";
import { createUseRealm } from "@realm/react/src/useRealm";
import type { FC } from "react";
import React, { createContext } from "react";
import type Realm from "realm";

import { database } from "@/core/data/database/database";

const RealmContext = createContext<Realm | null>(null);

const RealmWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RealmContext.Provider value={database}>{children}</RealmContext.Provider>
  );
};

const createRealmContext = () => {
  const useRealm = createUseRealm(RealmContext);
  const useQuery = createUseQuery(useRealm);
  const useObject = createUseObject(useRealm);

  return {
    RealmProvider: RealmWrapper,
    useRealm,
    useQuery,
    useObject,
  };
};

const defaultContext = createRealmContext();

export const RealmAppProvider = defaultContext.RealmProvider;

export const useAppRealm = defaultContext.useRealm;

export const useRealmQuery = defaultContext.useQuery;

export const useRealmObject = defaultContext.useObject;
