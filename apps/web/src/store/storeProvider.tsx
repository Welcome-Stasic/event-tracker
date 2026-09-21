import React, { createContext, useContext, type ReactNode } from "react";
import RootStore, { type IRootStore } from "./rootStore";

const rootStore = new RootStore();
const StoreContext = createContext<IRootStore>(rootStore);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};
export const useStore = () => {
  const store = useContext(StoreContext);
  return store;
};
