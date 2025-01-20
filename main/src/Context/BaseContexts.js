import { createContext, useContext, useState } from "react";

export const BaseContexts = createContext(undefined);

export function useBaseContexts() {
  const baseVals = useContext(BaseContexts);

  if (baseVals === undefined) {
    throw new Error(
      "useBaseContexts must be used in conjunction with Base Contexts. If you are getting this error, you probably forgot to wrap your App.js file with a BaseContexts.provider. So go fix that now :)"
    );
  }

  return baseVals;
}
