import React, { createContext, useContext, type ReactNode } from "react";
import RootStore, { type IRootStore } from "./rootSotore.ts";

const rootStore = new RootStore();
const StoreContext = createContext<IRootStore>(rootStore);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useStore = () => {
  const store = useContext(StoreContext);
  return store;
};
