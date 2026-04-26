import { use } from "react";
import { HomeContext } from ".";

export function useHomeContext() {
  const value = use(HomeContext);

  if (!value) {
    throw new Error('"useHomeContext" must be used inside "HomeProvider"');
  }

  return value;
}
