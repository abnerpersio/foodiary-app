import { useReducer } from "react";

export const useForceRender = () => {
  return useReducer((a) => a + 1, 0)[1];
};
