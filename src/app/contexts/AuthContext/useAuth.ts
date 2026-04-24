import { use } from "react";
import { AuthContext } from ".";

export const useAuth = () => {
  return use(AuthContext);
};
